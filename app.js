const btnOpenModal = document.querySelector(".btn-modal");
const modal = document.querySelector("dialog");
const btnModalCancel = document.querySelector(".cancel");
const formAddBook = document.querySelector("form");
const libraryContainer = document.querySelector(".library-container");

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
  createCards();
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
}

const addBookToLibrary = (book, library) => {
  library.push(book);
  console.log(library);
};

const createCards = () => {
  libraryContainer.replaceChildren();
  myLibrary.forEach((book) => {
    console.log(book);
    const card = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const numPages = document.createElement("p");

    card.classList.add("card");

    title.textContent = book.title;
    author.textContent = book.author;
    numPages.textContent = book.numPages;

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(numPages);
    libraryContainer.appendChild(card);
  });
};
