const books = [
  {
    title: "The Dragonbone Chair",
    author: "Tad Williams",
    series: "Memory, Sorrow and Thorn",
    bookNumber: 1,
    isbn: "9780756404079",
    read: false,
    notes: ""
  },
  {
    title: "Wizard’s First Rule",
    author: "Terry Goodkind",
    series: "Sword of Truth",
    bookNumber: 1,
    isbn: "9780812548051",
    read: true,
    notes: "Classic 90s fantasy"
  }
];

const bookshelf = document.getElementById("bookshelf");

books.forEach(book => {
  const bookDiv = document.createElement("div");
  bookDiv.className = "book";

  const coverUrl = book.isbn
    ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`
    : "https://via.placeholder.com/200x300?text=No+Cover";

  bookDiv.innerHTML = `
    <img src="${coverUrl}" alt="Book cover">

    <div class="title">${book.title}</div>
    <div class="meta">${book.author}</div>
    <div class="meta">${book.series} #${book.bookNumber}</div>
    <div class="meta">Status: ${book.read ? "Read" : "Unread"}</div>
  `;

  bookshelf.appendChild(bookDiv);
});
