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
  console.log(formObject);
  modal.close();
});

btnModalCancel.addEventListener("click", () => {
  modal.close();
});

function Book(title, author, numPages, read) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = read;

  this.info = () => {
    return `The ${title} by ${author}, ${numPages}, ${
      read ? "already read" : "not read yet"
    }`;
  };
}
const zelda = new Book("zelda", "nintendo", 12, true);
console.log(zelda.info());
