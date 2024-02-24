const btnOpenModal = document.querySelector(".btn-modal");
const modal = document.querySelector("dialog");
const btnModalCancel = document.querySelector(".cancel");
const formAddBook = document.querySelector("form");

const myLibrary = [];

btnOpenModal.addEventListener("click", () => {
  modal.showModal();
});

formAddBook.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formAddBook);
  const formObject = Object.fromEntries(formData);
  const newBook = new Book(formObject);
  addBookToLibrary(newBook, myLibrary);

  modal.close();
});

btnModalCancel.addEventListener("click", () => {
  modal.close();
});

function Book(bookData) {
  this.title = bookData.bookName;
  this.author = bookData.author;
  this.numPages = bookData.numPages;
  this.read = bookData.read;

  this.info = () => {
    return `The ${this.title} by ${this.author}, ${this.numPages}`;
  };
}

const addBookToLibrary = (book, library) => {
  library.push(book);
  console.log(library);
};

const zelda = new Book("zelda", "nintendo", 12, true);
console.log(zelda.info());
