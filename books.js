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

// Group books by author
const booksByAuthor = {};
books.forEach(book => {
  if (!booksByAuthor[book.author]) {
    booksByAuthor[book.author] = [];
  }
  booksByAuthor[book.author].push(book);
});

// Fetch Open Library data
async function fetchOpenLibraryData(book) {
  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(
    book.title
  )}&author=${encodeURIComponent(book.author)}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.docs || data.docs.length === 0) {
    return null;
  }

  return data.docs[0];
}

// Render
Object.keys(booksByAuthor).forEach(async author => {
  const section = document.createElement("div");
  section.className = "author-section";

  const header = document.createElement("div");
  header.className = "author-name";
  header.textContent = author;

  const shelf = document.createElement("div");
  shelf.className = "bookshelf";

  section.appendChild(header);
  section.appendChild(shelf);
  root.appendChild(section);

  for (const book of booksByAuthor[author]) {
    const bookDiv = document.createElement("div");
    bookDiv.className = "book";
    bookDiv.innerHTML = `<div class="meta">Loading…</div>`;
    shelf.appendChild(bookDiv);

    const olData = await fetchOpenLibraryData(book);

    let coverUrl = "https://via.placeholder.com/200x300?text=No+Cover";
    let year = "Unknown";
    let rating = "";
    let ratingCount = "";

    if (olData) {
      if (olData.cover_i) {
        coverUrl = `https://covers.openlibrary.org/b/id/${olData.cover_i}-L.jpg`;
      }
      if (olData.first_publish_year) {
        year = olData.first_publish_year;
      }
      if (olData.ratings_average) {
        rating = `⭐ ${olData.ratings_average.toFixed(1)}`;
        if (olData.ratings_count) {
          rating += ` (${olData.ratings_count})`;
        }
      }
    }

    const goodreadsUrl =
      `https://www.goodreads.com/search?q=${encodeURIComponent(
        book.title + " " + book.author
      )}`;

    bookDiv.innerHTML = `
      <img src="${coverUrl}" alt="Book cover">

      <div class="title">${book.title} (${year})</div>
      <div class="meta">${book.series} #${book.bookNumber}</div>
      ${rating ? `<div class="meta">${rating}</div>` : ""}

      <div class="meta" style="margin-top:6px;">
        <a href="${goodreadsUrl}" target="_blank">
          🔗 View on Goodreads
        </a>
      </div>
    `;
  }
});
