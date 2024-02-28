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
  newBook.id = Date.now();
  addBookToLibrary(newBook, myLibrary);
  formAddBook.reset();
  createCards();
  modal.close();
});

btnModalCancel.addEventListener("click", () => {
  modal.close();
});

libraryContainer.addEventListener("click", (e) => {
  if (e.target.className === "delete-btn") {
    console.log(e.target.getAttribute("data-id"));
    myLibrary.splice(
      myLibrary.findIndex(
        (book) => book.id == e.target.getAttribute("data-id")
      ),
      1
    );
  }
  createCards();
});

function Book(bookData) {
  this.title = bookData.bookName;
  this.author = bookData.author;
  this.numPages = bookData.numPages;
  this.read = bookData.hasOwnProperty("read");
  this.id = Date.now();
}

const addBookToLibrary = (book, library) => {
  library.push(book);
  console.log(library);
};

const createCards = () => {
  libraryContainer.replaceChildren();
  if (myLibrary.length === 0) {
    const container = document.createElement("div");
    const p = document.createElement("p");
    const img = document.createElement("img");
    p.textContent = "Your Library is empty";
    img.src = "images/clip-reading-books.png";
    container.appendChild(p);
    container.appendChild(img);
    container.classList.add("empty-library");
    libraryContainer.appendChild(container);
  } else {
    myLibrary.forEach((book) => {
      const card = document.createElement("div");
      const title = document.createElement("p");
      const author = document.createElement("p");
      const numPages = document.createElement("p");
      const infoDiv = document.createElement("div");
      const read = document.createElement("button");
      const deleteBtn = document.createElement("button");
      const deleteDiv = document.createElement("div");

      deleteBtn.classList.add("delete-btn");
      deleteBtn.setAttribute("data-id", book.id);
      read.classList.add("read-btn");
      card.classList.add("card");

      title.textContent = `Title: ${book.title}`;
      author.textContent = `Author: ${book.author}`;
      numPages.textContent = `Number of pages: ${book.numPages}`;
      read.textContent = book.read ? "read" : "not read";
      deleteBtn.textContent = "×";

      read.classList.add(book.read ? "read-color" : "no-read-color");

      infoDiv.classList.add("info-div");
      deleteDiv.appendChild(deleteBtn);
      card.appendChild(deleteDiv);
      infoDiv.appendChild(title);
      infoDiv.appendChild(author);
      infoDiv.appendChild(numPages);
      card.appendChild(infoDiv);
      card.appendChild(read);
      libraryContainer.appendChild(card);
    });
  }
};

createCards();
