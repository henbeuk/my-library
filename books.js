/**************************************************
 * CONFIG
 **************************************************/
let allowMediaRefresh = false;


/**************************************************
 * BOOK DATA
 **************************************************/
const books = [
  { title: "The Dragonbone Chair", author: "Tad Williams", series: "Memory, Sorrow and Thorn", bookNumber: 1 },
  { title: "Stone of Farewell", author: "Tad Williams", series: "Memory, Sorrow and Thorn", bookNumber: 2 },
  { title: "To Green Angel Tower: Siege", author: "Tad Williams", series: "Memory, Sorrow and Thorn", bookNumber: 3 },
  { title: "To Green Angel Tower: Storm", author: "Tad Williams", series: "Memory, Sorrow and Thorn", bookNumber: 4 },
  { title: "Shadowmarch", author: "Tad Williams", series: "Shadowmarch", bookNumber: 1 },

  { title: "The Warded Man", author: "Peter V. Brett", series: "The Demon Cycle", bookNumber: 1 },
  { title: "The Desert Spear", author: "Peter V. Brett", series: "The Demon Cycle", bookNumber: 2 },
  { title: "The Daylight War", author: "Peter V. Brett", series: "The Demon Cycle", bookNumber: 3 },

  { title: "The Hobbit", author: "J. R. R. Tolkien", series: "Middle-earth", bookNumber: 1 },
  { title: "The Lord of the Rings", author: "J. R. R. Tolkien", series: "Middle-earth", bookNumber: 2 },

  { title: "Whistler", author: "Roger Taylor", series: null, bookNumber: null },
  { title: "Ibryen", author: "Roger Taylor", series: null, bookNumber: null },

  { title: "Magician", author: "Raymond E. Feist", series: "Riftwar Cycle", bookNumber: 1 },
  { title: "Silverthorn", author: "Raymond E. Feist", series: "Riftwar Cycle", bookNumber: 2 },
  { title: "A Darkness at Sethanon", author: "Raymond E. Feist", series: "Riftwar Cycle", bookNumber: 3 },
  { title: "Prince of the Blood", author: "Raymond E. Feist", series: "Riftwar Cycle", bookNumber: null },
  { title: "The King's Buccaneer", author: "Raymond E. Feist", series: "Riftwar Cycle", bookNumber: null },

  { title: "The Final Empire", author: "Brandon Sanderson", series: "Mistborn", bookNumber: 1 },
  { title: "The Well of Ascension", author: "Brandon Sanderson", series: "Mistborn", bookNumber: 2 },
  { title: "The Hero of Ages", author: "Brandon Sanderson", series: "Mistborn", bookNumber: 3 },

  { title: "Pawn of Prophecy", author: "David Eddings", series: "The Belgariad", bookNumber: 1 },
  { title: "Queen of Sorcery", author: "David Eddings", series: "The Belgariad", bookNumber: 2 },
  { title: "Magician's Gambit", author: "David Eddings", series: "The Belgariad", bookNumber: 3 },
  { title: "Castle of Wizardry", author: "David Eddings", series: "The Belgariad", bookNumber: 4 },

  { title: "Wizard's First Rule", author: "Terry Goodkind", series: "Sword of Truth", bookNumber: 1 },
  { title: "Stone of Tears", author: "Terry Goodkind", series: "Sword of Truth", bookNumber: 2 },
  { title: "Blood of the Fold", author: "Terry Goodkind", series: "Sword of Truth", bookNumber: 3 },

  { title: "The Magicians' Guild", author: "Trudi Canavan", series: "Black Magician Trilogy", bookNumber: 1 },
  { title: "The Novice", author: "Trudi Canavan", series: "Black Magician Trilogy", bookNumber: 2 },
  { title: "The High Lord", author: "Trudi Canavan", series: "Black Magician Trilogy", bookNumber: 3 }
];


/**************************************************
 * GROUP BY AUTHOR → SERIES
 **************************************************/
const root = document.getElementById("bookshelf");
const library = {};

books.forEach(book => {
  if (!library[book.author]) library[book.author] = {};
  const series = book.series || "Standalone";
  if (!library[book.author][series]) library[book.author][series] = [];
  library[book.author][series].push(book);
});


/**************************************************
 * OPEN LIBRARY FETCH (MANUAL ONLY)
 **************************************************/
async function fetchOpenLibraryData(book) {
  const cacheKey = `ol::${book.author}::${book.title}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) return JSON.parse(cached);
  if (!allowMediaRefresh) return null;

  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}`;
  const res = await fetch(url);
  const data = await res.json();

  const doc = data.docs?.[0] || null;
  localStorage.setItem(cacheKey, JSON.stringify(doc));
  return doc;
}


/**************************************************
 * STATS
 **************************************************/
function updateStats() {
  const total = books.length;
  let read = 0;

  books.forEach(b => {
    if (localStorage.getItem(`${b.author}::${b.title}`) === "read") read++;
  });

  const pct = Math.round((read / total) * 100) || 0;
  document.getElementById("stats").textContent =
    `📚 ${total} books · ✔ ${read} read (${pct}%)`;
}


/**************************************************
 * REFRESH MEDIA BUTTON
 **************************************************/
document.getElementById("refreshMediaBtn").addEventListener("click", () => {
  allowMediaRefresh = true;

  Object.keys(localStorage)
    .filter(k => k.startsWith("ol::"))
    .forEach(k => localStorage.removeItem(k));

  renderLibrary();
});


/**************************************************
 * RENDER
 **************************************************/
async function renderLibrary() {
  root.innerHTML = "";
  updateStats();

  for (const author of Object.keys(library).sort()) {
    const section = document.createElement("div");

    const header = document.createElement("div");
    header.className = "author-name author-header";
    header.innerHTML = `<span>${author}</span><span>▸</span>`;

    const container = document.createElement("div");
    container.style.display = "none";

    header.onclick = () => {
      const open = container.style.display === "block";
      container.style.display = open ? "none" : "block";
      header.lastChild.textContent = open ? "▸" : "▾";
    };

    section.appendChild(header);
    section.appendChild(container);
    root.appendChild(section);

    for (const series of Object.keys(library[author])) {
      const shelf = document.createElement("div");
      shelf.className = "bookshelf";

      container.appendChild(
        Object.assign(document.createElement("div"), { textContent: series, className: "series-name" })
      );
      container.appendChild(shelf);

      for (const book of library[author][series]) {
        const div = document.createElement("div");
        div.className = "book";
        shelf.appendChild(div);

        const ol = await fetchOpenLibraryData(book);

        const cover = ol?.cover_i
          ? `https://covers.openlibrary.org/b/id/${ol.cover_i}-L.jpg`
          : "./placeholder-cover.png";

        const year = ol?.first_publish_year || "Unknown";

        const rating = ol?.ratings_average
          ? `<div class="rating">★ ${ol.ratings_average.toFixed(1)}</div>`
          : `<div class="no-rating">No rating</div>`;

        const id = `${book.author}::${book.title}`;
        const isRead = localStorage.getItem(id) === "read";

        div.innerHTML = `
          <img src="${cover}">
          <div class="title">${book.title} (${year})</div>
          <div class="meta">#${book.bookNumber ?? "-"}</div>
          ${rating}
          <div class="meta read-toggle ${isRead ? "read" : "unread"}">${isRead ? "✔ Read" : "○ Unread"}</div>
        `;

        div.querySelector(".read-toggle").onclick = () => {
          localStorage.setItem(id, isRead ? "unread" : "read");
          renderLibrary();
        };
      }
    }
  }
}


/**************************************************
 * START
 **************************************************/
renderLibrary();
