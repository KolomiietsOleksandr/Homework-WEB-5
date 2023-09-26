// Function 1: concatenateString
function concatenateString(text, maxLength) {
  if (text.length <= maxLength) {
    return text.toUpperCase();
  } else {
    return text.slice(0, 3).toUpperCase() + '...';
  }
}

// Function 2: createTableCells
function createTableCells(rowAmount, cellsAmount) {
  const table = document.createElement('table');
  for (let i = 0; i < rowAmount; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < cellsAmount; j++) {
      const cell = document.createElement('td');
      cell.innerText = `Row ${i + 1}, Cell ${j + 1}`;
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  document.body.appendChild(table);
}

// Class 1: Book
class Book {
  constructor(title, authors, numberOfPages, isRead = false, isFavorite = false) {
    this.title = title;
    this.authors = authors;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
    this.isFavorite = isFavorite;
  }

  markAsRead() {
    this.isRead = !this.isRead;
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}

// Class 2: Bookshelf
class Bookshelf {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(book) {
    const index = this.books.indexOf(book);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  getUnreadBooks() {
    return this.books.filter(book => !book.isRead);
  }

  getFavBooks() {
    return this.books.filter(book => book.isFavorite);
  }
}

document.addEventListener('DOMContentLoaded', function () {

  const alertUnreadButton = document.getElementById('alert1');
  const alertFavoritesButton = document.getElementById('alert2');

    alertUnreadButton.addEventListener('click', function () {
        const unreadBooks = shelf.getUnreadBooks().length;
        alert(`Number of unread books: ${unreadBooks}`);
    });

    alertFavoritesButton.addEventListener('click', function () {
        const favoriteBooks = shelf.getFavBooks().length;
        alert(`Number of favorite books: ${favoriteBooks}`);
    });

  const bookshelfContainer = document.getElementById('Bookshelf');

  function addBookToShelf(title, author, pages, isRead, isFavorite) {
    // Обмежуємо автора до 3 символів
    const limitedAuthor = concatenateString(author, 3);
  
    const book = new Book(title, limitedAuthor, pages, isRead, isFavorite);
    shelf.addBook(book);
  
    const bookElement = document.createElement('div');
    bookElement.className = "BooksDiv";
    bookElement.classList.add('book');
  
    const textDiv = document.createElement("div");
    textDiv.className = "text-b";
    textDiv.innerHTML = `
      <p>Title: ${book.title}</p>
      <p>Authors: ${limitedAuthor}</p>
      <p>Pages: ${book.numberOfPages}</p>
      <p class='red'>Read: ${book.isRead ? 'Yes' : 'No'}</p>
      <p class="fav">Favorite: ${book.isFavorite ? 'Yes' : 'No'}</p>`;
  
    const readButton = document.createElement('button');
    readButton.className = "b-red";
    readButton.textContent = 'Toggle Read';
    readButton.addEventListener('click', () => {
      book.markAsRead();
      updateBookInfo();
      textDiv.querySelector('.red').textContent = `Read: ${book.isRead ? 'Yes' : 'No'}`;
    });
  
    const favoriteButton = document.createElement('button');
    favoriteButton.className = "b-fav";
    favoriteButton.textContent = 'Toggle Favorite';
    favoriteButton.addEventListener('click', () => {
      book.toggleFavorite();
      updateBookInfo();
      textDiv.querySelector('.fav').textContent = `Favorite: ${book.isFavorite ? 'Yes' : 'No'}`;
    });
  
    const deleteButton = document.createElement('button');
    deleteButton.className = "b-del";
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      const index = shelf.books.indexOf(book);
      if (index !== -1) {
        shelf.removeBook(book);
        const bookElementToRemove = bookElement.parentElement.removeChild(bookElement);
        updateBookInfo();
      }
    });
  
    bookElement.appendChild(textDiv);
    bookElement.appendChild(readButton);
    bookElement.appendChild(favoriteButton);
    bookElement.appendChild(deleteButton);
  
    bookshelfContainer.appendChild(bookElement);
    updateBookInfo();
  }
  
  function updateBookInfo() {
    const totalBooksElement = document.getElementById('total-books');

    const bookElements = bookshelfContainer.getElementsByClassName('book');
    const totalBooks = bookElements.length;

    totalBooksElement.textContent = `Total amount of books: ${totalBooks}`;
}

  const bookForm = document.getElementById('bookForm');

  bookForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.querySelector('input[name="title-input"]').value;
    const author = document.querySelector('input[name="author-input"]').value;
    const pages = document.querySelector('input[name="pages-input"]').value;
    const isRead = false;
    const isFavorite = false;

    addBookToShelf(title, author, pages, isRead, isFavorite);

    bookForm.reset();
  });
});

const shelf = new Bookshelf();