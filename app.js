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
  const readCellDiv = document.createElement("div");
  readCellDiv.className = "readButtonDiv";
  const readButton = document.createElement("button");
  readButton.className = "readButton";
  readButton.textContent = book.read;
  readButton.addEventListener("click", () => updateReadStatus(book.id));
  readCell.appendChild(readButton);

  const deleteCell = document.createElement("td");
  const deleteButtonDiv = document.createElement("div");
  deleteButtonDiv.className = "deleteButtonDiv";
  const deleteButton = document.createElement("button");
  deleteButton.className = "deleteButton";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteBook(book.id));
  deleteCell.appendChild(deleteButton);

  row.appendChild(titleCell);
  row.appendChild(authorCell);
  readCellDiv.appendChild(readButton);
  readCell.appendChild(readCellDiv);
  row.appendChild(readCell);
  deleteButtonDiv.appendChild(deleteButton);
  row.appendChild(deleteButtonDiv);

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
  renderLibrary();
};

const renderLibrary = () => {
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

const updateReadStatus = (id) => {
  const bookIndex = myLibrary.findIndex((book) => book.id === id);
  myLibrary[bookIndex].read =
    myLibrary[bookIndex].read === "Read" ? "Not read" : "Read";
  console.log(myLibrary);
  renderLibrary();
};

const deleteBook = (id) => {
  console.log(myLibrary);
  myLibrary = myLibrary.filter((book) => book.id !== id);
  console.log(myLibrary);
  renderLibrary();
};

bookForm.addEventListener("submit", handleBookSubmit);
