const bookForm = document.getElementById("bookForm");
const bookTable = document.getElementById("bookTable");

let myLibrary = [];

class Book {
  constructor({ title, author, read }) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.id = Date.now().toString();
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
  deleteButton.addEventListener("click", () => deleteBook(book.id));
  deleteCell.appendChild(deleteButton);

  row.dataset.id = book.id;
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
  renderLibrary(myLibrary);
};

const renderLibrary = (myLibrary) => {
  cleanLibrary();
  myLibrary.map((book) => {
    insertRow(book);
  });
};

const cleanLibrary = () => {
  while (bookTable.firstChild) {
    bookTable.removeChild(bookTable.lastChild);
  }
};

const deleteBook = (id) => {
  console.log(myLibrary);
  myLibrary = myLibrary.filter((book) => book.id !== id);
  console.log(myLibrary);
  renderLibrary(myLibrary);
};

bookForm.addEventListener("submit", handleBookSubmit);
