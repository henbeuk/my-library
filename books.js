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

// Group books by author
const booksByAuthor = {};

books.forEach(book => {
  if (!booksByAuthor[book.author]) {
    booksByAuthor[book.author] = [];
  }
  booksByAuthor[book.author].push(book);
});

const root = document.getElementById("bookshelf");

// Render each author section
Object.keys(booksByAuthor).forEach(author => {
  const section = document.createElement("div");
  section.className = "author-section";

  const header = document.createElement("div");
  header.className = "author-name";
  header.textContent = author;

  const shelf = document.createElement("div");
  shelf.className = "bookshelf";

  booksByAuthor[author].forEach(book => {
    const bookDiv = document.createElement("div");
    bookDiv.className = "book";

    const coverSearchUrl =
      `https://openlibrary.org/search.json?title=${encodeURIComponent(
        book.title
      )}&author=${encodeURIComponent(book.author)}`;

    // Temporary placeholder until STEP 6
    const coverUrl =
      "https://via.placeholder.com/200x300?text=Cover+Loading";

    const goodreadsUrl =
      `https://www.goodreads.com/search?q=${encodeURIComponent(
        book.title + " " + book.author
      )}`;

    bookDiv.innerHTML = `
      <img src="${coverUrl}" alt="Book cover">

      <div class="title">${book.title}</div>
      <div class="meta">${book.series} #${book.bookNumber}</div>

      <div class="meta">
        <a href="${goodreadsUrl}" target="_blank">
          🔗 View on Goodreads
        </a>
      </div>
    `;

    shelf.appendChild(bookDiv);
  });

  section.appendChild(header);
  section.appendChild(shelf);
  root.appendChild(section);
});
