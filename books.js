const books = [
  {
    title: "The Dragonbone Chair",
    author: "Tad Williams",
    series: "Memory, Sorrow and Thorn",
    bookNumber: 1
  },
  {
    title: "Wizard’s First Rule",
    author: "Terry Goodkind",
    series: "Sword of Truth",
    bookNumber: 1
  }
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

async function fetchOpenLibraryData(book) {
  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(
    book.title
  )}&author=${encodeURIComponent(book.author)}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.docs && data.docs.length ? data.docs[0] : null;
}

// Render
Object.keys(library).forEach(async author => {
  const authorSection = document.createElement("div");
  authorSection.className = "author-section";

  const authorHeader = document.createElement("div");
  authorHeader.className = "author-name";
  authorHeader.textContent = author;

  authorSection.appendChild(authorHeader);
  root.appendChild(authorSection);

  const seriesMap = library[author];

  for (const series of Object.keys(seriesMap)) {
    const seriesHeader = document.createElement("div");
    seriesHeader.className = "series-name";
    seriesHeader.textContent = series;

    const shelf = document.createElement("div");
    shelf.className = "bookshelf";

    authorSection.appendChild(seriesHeader);
    authorSection.appendChild(shelf);

    for (const book of seriesMap[series]) {
      const bookDiv = document.createElement("div");
      bookDiv.className = "book";
      bookDiv.innerHTML = `<div class="meta">Loading…</div>`;
      shelf.appendChild(bookDiv);

      const olData = await fetchOpenLibraryData(book);

      let coverUrl = "https://via.placeholder.com/200x300?text=No+Cover";
      let year = "Unknown";
      let rating = "";

      if (olData) {
        if (olData.cover_i) {
          coverUrl = `https://covers.openlibrary.org/b/id/${olData.cover_i}-L.jpg`;
        }
        if (olData.first_publish_year) {
          year = olData.first_publish_year;
        }
        if (olData.ratings_average) {
          rating = `⭐ ${olData.ratings_average.toFixed(1)}`;
        }
      }

      const goodreadsUrl =
        `https://www.goodreads.com/search?q=${encodeURIComponent(
          book.title + " " + book.author
        )}`;

      const bookId = `${book.author}::${book.title}`;
const isRead = localStorage.getItem(bookId) === "read";

bookDiv.innerHTML = `
  <img src="${coverUrl}" alt="Book cover">

  <div class="title">${book.title} (${year})</div>
  <div class="meta">#${book.bookNumber}</div>
  ${rating ? `<div class="meta">${rating}</div>` : ""}

  <div class="meta read-toggle ${isRead ? "read" : "unread"}"
       data-id="${bookId}">
    ${isRead ? "✔ Read" : "○ Unread"}
  </div>

  <div class="meta" style="margin-top:6px;">
    <a href="${goodreadsUrl}" target="_blank">
      🔗 View on Goodreads
    </a>
  </div>
`;

      const toggle = bookDiv.querySelector(".read-toggle");

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
});
