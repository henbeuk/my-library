const books = [
  {
    title: "The Dragonbone Chair",
    author: "Tad Williams",
    series: "Memory, Sorrow and Thorn",
    bookNumber: 1
  },
    {
    title: "Stone of Farewell",
    author: "Tad Williams",
    series: "Memory, Sorrow and Thorn",
    bookNumber: 2
  },
    {
    title: "To Green Angel Tower: Siege",
    author: "Tad Williams",
    series: "Memory, Sorrow and Thorn",
    bookNumber: 3
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

// Search & filter controls
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

searchInput.addEventListener("input", renderLibrary);
statusFilter.addEventListener("change", renderLibrary);

// Render library
async function renderLibrary() {
  root.innerHTML = "";

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
      seriesHeader.className = "series-name";
      seriesHeader.textContent = series;

      const shelf = document.createElement("div");
      shelf.className = "bookshelf";

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

        let coverUrl = "https://via.placeholder.com/200x300?text=No+Cover";
        let year = "Unknown";
        let ratingHtml = "";

        if (olData) {
          if (olData.cover_i) {
            coverUrl = `https://covers.openlibrary.org/b/id/${olData.cover_i}-L.jpg`;
          }

          if (olData.first_publish_year) {
            year = olData.first_publish_year;
          }

          if (olData.ratings_average) {
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
          } else {
            ratingHtml = `<div class="no-rating">No rating</div>`;
          }
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
