const bookForm = document.getElementById("bookForm");
const bookTable = document.getElementById("bookTable");

let myLibrary = [];

class Book {
  constructor({ title, author, read }) {
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

const addBookToLibrary = (bookData) => {
  const book = new Book(bookData);
  myLibrary = [...myLibrary, book];
};

const insertRow = (book) => {
  const row = document.createElement("tr");

  const titleCell = document.createElement("td");
  titleCell.textContent = book.title;

  const authorCell = document.createElement("td");
  authorCell.textContent = book.author;

  const readCell = document.createElement("td");
  readCell.textContent = book.read;

  const deleteCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.className = "deleteButton";
  deleteButton.textContent = "Delete";
  deleteCell.appendChild(deleteButton);

  row.appendChild(titleCell);
  row.appendChild(authorCell);
  row.appendChild(readCell);
  row.appendChild(deleteButton);

  bookTable.appendChild(row);
};

const handleBookSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const bookData = Object.fromEntries(formData);

  if (!bookData.title || !bookData.author) {
    alert("Please fill all the required fields");
    return;
  }

  addBookToLibrary(bookData);
  bookForm.reset();
  console.log(myLibrary);
  renderBooks(myLibrary);
};

const renderBooks = (myLibrary) => {
  myLibrary.map((book) => {
    insertRow(book);
  });
};

bookForm.addEventListener("submit", handleBookSubmit);
