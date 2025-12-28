const books = [
  // =========================
  // Tad Williams – Memory, Sorrow and Thorn
  // =========================
  { title: "The Dragonbone Chair", author: "Tad Williams", series: "Memory, Sorrow and Thorn", bookNumber: 1 },
  { title: "Stone of Farewell", author: "Tad Williams", series: "Memory, Sorrow and Thorn", bookNumber: 2 },
  { title: "To Green Angel Tower: Siege", author: "Tad Williams", series: "Memory, Sorrow and Thorn", bookNumber: 3 },
  { title: "To Green Angel Tower: Storm", author: "Tad Williams", series: "Memory, Sorrow and Thorn", bookNumber: 4 },

  // =========================
  // Tad Williams – Shadowmarch
  // =========================
  { title: "Shadowmarch", author: "Tad Williams", series: "Shadowmarch", bookNumber: 1 },

  // =========================
  // Peter V. Brett – Demon Cycle
  // =========================
  { title: "The Warded Man", author: "Peter V. Brett", series: "The Demon Cycle", bookNumber: 1 },
  { title: "The Desert Spear", author: "Peter V. Brett", series: "The Demon Cycle", bookNumber: 2 },
  { title: "The Daylight War", author: "Peter V. Brett", series: "The Demon Cycle", bookNumber: 3 },

  // =========================
  // J. R. R. Tolkien – Middle-earth
  // =========================
  { title: "The Hobbit", author: "J. R. R. Tolkien", series: "Middle-earth", bookNumber: 1 },
  { title: "The Lord of the Rings", author: "J. R. R. Tolkien", series: "Middle-earth", bookNumber: 2 },

  // =========================
  // Roger Taylor
  // =========================
  { title: "Whistler", author: "Roger Taylor", series: null, bookNumber: null },
  { title: "Ibryen", author: "Roger Taylor", series: null, bookNumber: null },

  // =========================
  // Raymond E. Feist – Riftwar Cycle
  // =========================
  { title: "Magician", author: "Raymond E. Feist", series: "Riftwar Cycle", bookNumber: 1 },
  { title: "Silverthorn", author: "Raymond E. Feist", series: "Riftwar Cycle", bookNumber: 2 },
  { title: "A Darkness at Sethanon", author: "Raymond E. Feist", series: "Riftwar Cycle", bookNumber: 3 },

  // Riftwar related
  { title: "Prince of the Blood", author: "Raymond E. Feist", series: "Riftwar Cycle", bookNumber: null },
  { title: "The King's Buccaneer", author: "Raymond E. Feist", series: "Riftwar Cycle", bookNumber: null },

  // Riftwar Legends
  { title: "Murder in LaMut", author: "Raymond E. Feist & Joel Rosenberg", series: "Legends of the Riftwar", bookNumber: 1 },

  // Empire Trilogy
  { title: "Servant of the Empire", author: "Raymond E. Feist & Janny Wurts", series: "Empire Trilogy", bookNumber: 2 },

  // =========================
  // Brandon Sanderson – Mistborn
  // =========================
  { title: "The Final Empire", author: "Brandon Sanderson", series: "Mistborn", bookNumber: 1 },
  { title: "The Well of Ascension", author: "Brandon Sanderson", series: "Mistborn", bookNumber: 2 },
  { title: "The Hero of Ages", author: "Brandon Sanderson", series: "Mistborn", bookNumber: 3 },

  // =========================
  // Stephen Donaldson – Thomas Covenant
  // =========================
  { title: "Lord Foul's Bane", author: "Stephen Donaldson", series: "Thomas Covenant", bookNumber: 1 },
  { title: "The Illearth War", author: "Stephen Donaldson", series: "Thomas Covenant", bookNumber: 2 },
  { title: "The Power That Preserves", author: "Stephen Donaldson", series: "Thomas Covenant", bookNumber: 3 },
  { title: "The Wounded Land", author: "Stephen Donaldson", series: "Thomas Covenant", bookNumber: 4 },
  { title: "The One Tree", author: "Stephen Donaldson", series: "Thomas Covenant", bookNumber: 5 },

  // =========================
  // David Eddings – Belgariad
  // =========================
  { title: "Pawn of Prophecy", author: "David Eddings", series: "The Belgariad", bookNumber: 1 },
  { title: "Queen of Sorcery", author: "David Eddings", series: "The Belgariad", bookNumber: 2 },
  { title: "Magician's Gambit", author: "David Eddings", series: "The Belgariad", bookNumber: 3 },
  { title: "Castle of Wizardry", author: "David Eddings", series: "The Belgariad", bookNumber: 4 },

  // =========================
  // Terry Brooks – Shannara
  // =========================
  { title: "The Sword of Shannara", author: "Terry Brooks", series: "Shannara", bookNumber: 1 },
  { title: "The Elfstones of Shannara", author: "Terry Brooks", series: "Shannara", bookNumber: 2 },
  { title: "The Wishsong of Shannara", author: "Terry Brooks", series: "Shannara", bookNumber: 3 },
  { title: "The Scions of Shannara", author: "Terry Brooks", series: "Shannara", bookNumber: 4 },
  { title: "The Druid of Shannara", author: "Terry Brooks", series: "Shannara", bookNumber: 5 },
  { title: "The Elf Queen of Shannara", author: "Terry Brooks", series: "Shannara", bookNumber: 6 },
  { title: "The Talismans of Shannara", author: "Terry Brooks", series: "Shannara", bookNumber: 7 },
  { title: "The Darkling Child", author: "Terry Brooks", series: "Shannara", bookNumber: 8 },
  { title: "The High Druid's Blade", author: "Terry Brooks", series: "Shannara", bookNumber: 9 },

  // =========================
  // Terry Goodkind – Sword of Truth
  // =========================
  { title: "Wizard's First Rule", author: "Terry Goodkind", series: "Sword of Truth", bookNumber: 1 },
  { title: "Stone of Tears", author: "Terry Goodkind", series: "Sword of Truth", bookNumber: 2 },
  { title: "Blood of the Fold", author: "Terry Goodkind", series: "Sword of Truth", bookNumber: 3 },
  { title: "Temple of the Winds", author: "Terry Goodkind", series: "Sword of Truth", bookNumber: 4 },
  { title: "Soul of the Fire", author: "Terry Goodkind", series: "Sword of Truth", bookNumber: 5 },
  { title: "Faith of the Fallen", author: "Terry Goodkind", series: "Sword of Truth", bookNumber: 6 },
  { title: "The Pillars of Creation", author: "Terry Goodkind", series: "Sword of Truth", bookNumber: 7 },
  { title: "Naked Empire", author: "Terry Goodkind", series: "Sword of Truth", bookNumber: 8 },

  // =========================
  // Trudi Canavan
  // =========================
  { title: "The Priestess of the White", author: "Trudi Canavan", series: "Age of the Five", bookNumber: 1 },
  { title: "Last of the Wilds", author: "Trudi Canavan", series: "Age of the Five", bookNumber: 2 },
  { title: "Voice of the Gods", author: "Trudi Canavan", series: "Age of the Five", bookNumber: 3 },
  { title: "The Magicians' Guild", author: "Trudi Canavan", series: "Black Magician Trilogy", bookNumber: 1 },
  { title: "The Novice", author: "Trudi Canavan", series: "Black Magician Trilogy", bookNumber: 2 },
  { title: "The High Lord", author: "Trudi Canavan", series: "Black Magician Trilogy", bookNumber: 3 },

  // =========================
  // Robert Jordan – Wheel of Time
  // =========================
  { title: "The Dragon Reborn", author: "Robert Jordan", series: "The Wheel of Time", bookNumber: 3 },
  { title: "The Fires of Heaven", author: "Robert Jordan", series: "The Wheel of Time", bookNumber: 5 },
  { title: "The Path of Daggers", author: "Robert Jordan", series: "The Wheel of Time", bookNumber: 8 },
  { title: "The Gathering Storm", author: "Robert Jordan & Brandon Sanderson", series: "The Wheel of Time", bookNumber: 12 },

  // =========================
  // Brent Weeks
  // =========================
  { title: "The Blinding Knife", author: "Brent Weeks", series: "Lightbringer", bookNumber: 2 },

  // =========================
  // Christopher Paolini
  // =========================
  { title: "Murtagh", author: "Christopher Paolini", series: "Inheritance Cycle", bookNumber: 5 },

  // =========================
  // Glenda Larke
  // =========================
  { title: "The Lascar's Dagger", author: "Glenda Larke", series: "The Forsaken Lands", bookNumber: 1 },

  // =========================
  // David Farland
  // =========================
  { title: "The Sum of All Men", author: "David Farland", series: "The Runelords", bookNumber: 1 }
];


const root = document.getElementById("bookshelf");

// Group by author → series
const library = {};

books.forEach(book => {
  if (!library[book.author]) {
    library[book.author] = {};
  }

  const seriesName = book.series || "Standalone";

  if (!library[book.author][seriesName]) {
    library[book.author][seriesName] = [];
  }

  library[book.author][seriesName].push(book);
});

// Open Library fetch (ratings-safe)
async function fetchOpenLibraryData(book) {
  const searchUrl =
    `https://openlibrary.org/search.json?title=${encodeURIComponent(
      book.title
    )}&author=${encodeURIComponent(book.author)}`;

  const searchResponse = await fetch(searchUrl);
  const searchData = await searchResponse.json();

  if (!searchData.docs || !searchData.docs.length) {
    return null;
  }

  const doc = searchData.docs[0];

  // Rating already present
  if (doc.ratings_average) {
    return doc;
  }

  // Try Work API
  if (doc.key) {
    const workUrl = `https://openlibrary.org${doc.key}.json`;
    const workResponse = await fetch(workUrl);
    const workData = await workResponse.json();

    if (workData.ratings && workData.ratings.average) {
      return {
        ...doc,
        ratings_average: workData.ratings.average,
        ratings_count: workData.ratings.count
      };
    }
  }

  return doc; // truthful "No rating"
}

function updateStats() {
  const totalBooks = books.length;

  let readCount = 0;

  books.forEach(book => {
    const id = `${book.author}::${book.title}`;
    if (localStorage.getItem(id) === "read") {
      readCount++;
    }
  });

  const percent =
    totalBooks === 0 ? 0 : Math.round((readCount / totalBooks) * 100);

  const stats = document.getElementById("stats");
  if (!stats) return;

  stats.textContent =
    `📚 ${totalBooks} books · ✔ ${readCount} read (${percent}%)`;
}


// Search & filter controls
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

searchInput.addEventListener("input", renderLibrary);
statusFilter.addEventListener("change", renderLibrary);

// Render library
async function renderLibrary() {
  root.innerHTML = "";
  updateStats(); 

  const searchTerm = searchInput.value.toLowerCase();
  const statusValue = statusFilter.value;

  const authors = Object.keys(library).sort();

  for (const author of authors) {
    const authorSection = document.createElement("div");
    authorSection.className = "author-section";

    const totalBooks = Object.values(library[author])
      .reduce((sum, series) => sum + series.length, 0);

    const authorHeader = document.createElement("div");
    authorHeader.className = "author-name author-header";
    authorHeader.innerHTML = `
      <span>${author}</span>
      <span class="author-toggle">(${totalBooks}) ▸</span>
    `;

    const booksContainer = document.createElement("div");
    booksContainer.className = "author-books";
    booksContainer.style.display = "none"; // collapsed by default

    authorHeader.addEventListener("click", () => {
      const isOpen = booksContainer.style.display === "block";
      booksContainer.style.display = isOpen ? "none" : "block";
      authorHeader.querySelector(".author-toggle").textContent =
        `(${totalBooks}) ${isOpen ? "▸" : "▾"}`;
    });

    authorSection.appendChild(authorHeader);
    authorSection.appendChild(booksContainer);
    root.appendChild(authorSection);

    const seriesMap = library[author];

    for (const series of Object.keys(seriesMap)) {
const seriesHeader = document.createElement("div");
seriesHeader.className = "series-name series-header";
seriesHeader.innerHTML = `
  <span>${series}</span>
  <span class="series-toggle">▾</span>
`;
      const shelf = document.createElement("div");
      shelf.className = "bookshelf";
      shelf.style.display = "grid"; // expanded by default

      seriesHeader.addEventListener("click", () => {
  const isOpen = shelf.style.display !== "none";
  shelf.style.display = isOpen ? "none" : "grid";
  seriesHeader.querySelector(".series-toggle").textContent =
    isOpen ? "▸" : "▾";
});


      booksContainer.appendChild(seriesHeader);
      booksContainer.appendChild(shelf);

      for (const book of seriesMap[series]) {
        // 🔍 FILTERING (correct place)
        const matchesSearch =
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm) ||
          (book.series && book.series.toLowerCase().includes(searchTerm));

        const isRead = localStorage.getItem(`${book.author}::${book.title}`) === "read";

        const matchesStatus =
          statusValue === "all" ||
          (statusValue === "read" && isRead) ||
          (statusValue === "unread" && !isRead);

        if (!matchesSearch || !matchesStatus) {
          continue;
        }

        const bookDiv = document.createElement("div");
        bookDiv.className = "book";
        bookDiv.innerHTML = `<div class="meta">Loading…</div>`;
        shelf.appendChild(bookDiv);

        const olData = await fetchOpenLibraryData(book);

let coverUrl = "./placeholder-cover.png";
let year = "Unknown";

// COVER + YEAR should be handled independently
if (olData) {
  if (olData.cover_i) {
    coverUrl = `https://covers.openlibrary.org/b/id/${olData.cover_i}-L.jpg`;
  }

  if (olData.first_publish_year) {
    year = olData.first_publish_year;
  }
}

        
let ratingHtml = `<div class="no-rating">No rating</div>`;

if (olData && olData.ratings_average) {
  const avg = olData.ratings_average;
  const count = olData.ratings_count || 0;
  const fullStars = Math.round(avg);

  const stars =
    "★".repeat(fullStars) + "☆".repeat(5 - fullStars);

  ratingHtml = `
    <div class="rating">
      ${stars}
      <span class="count">
        (${avg.toFixed(1)}${count ? ` · ${count}` : ""})
      </span>
    </div>
  `;
}



        const goodreadsUrl =
          `https://www.goodreads.com/search?q=${encodeURIComponent(
            book.title + " " + book.author
          )}`;

        const bookId = `${book.author}::${book.title}`;
        const notesKey = `notes::${bookId}`;
        const savedNotes = localStorage.getItem(notesKey) || "";
        const hasNotes = savedNotes.trim().length > 0;

bookDiv.innerHTML = `
  <img src="${coverUrl}" alt="Book cover">

  <div class="title">${book.title} (${year})</div>
  <div class="meta">#${book.bookNumber}</div>
  ${ratingHtml}

  <div class="meta read-toggle ${isRead ? "read" : "unread"}"
       data-id="${bookId}">
    ${isRead ? "✔ Read" : "○ Unread"}
  </div>

  <div class="meta notes-toggle ${hasNotes ? "has-notes" : ""}">
    📝 Notes
  </div>

  <textarea class="notes-area"
            placeholder="Your notes…">${savedNotes}</textarea>

  <div class="meta" style="margin-top:6px;">
    <a href="${goodreadsUrl}" target="_blank">
      🔗 View on Goodreads
    </a>
  </div>
`;

const img = bookDiv.querySelector("img");

img.onerror = () => {
  img.onerror = null; 
  img.src = "./placeholder-cover.png";
};

        const toggle = bookDiv.querySelector(".read-toggle");
        const notesToggle = bookDiv.querySelector(".notes-toggle");
        const notesArea = bookDiv.querySelector(".notes-area");

        notesToggle.addEventListener("click", () => {
          notesArea.style.display =
            notesArea.style.display === "none" ? "block" : "none";
        });

        notesArea.addEventListener("input", () => {
          localStorage.setItem(notesKey, notesArea.value);
        });

        toggle.addEventListener("click", () => {
          const current = localStorage.getItem(bookId);

          if (current === "read") {
            localStorage.setItem(bookId, "unread");
            toggle.textContent = "○ Unread";
            toggle.classList.remove("read");
            toggle.classList.add("unread");
          } else {
            localStorage.setItem(bookId, "read");
            toggle.textContent = "✔ Read";
            toggle.classList.remove("unread");
            toggle.classList.add("read");
          }
        });
      }
    }
  }
}

// Initial render
renderLibrary();
