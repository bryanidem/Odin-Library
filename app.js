class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = () => {
      return `${this.title} by ${this.author} has ${this.pages} ${
        this.read ? "read" : "not read yet"
      }`;
    };
  }
}

const hobbit = new Book("zelda", "nintendo", 123, true);

console.log(hobbit.info());
