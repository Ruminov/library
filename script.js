// Store book data
const myLibrary = [
  {
    title:
      "Meditations - Marcus Aurelius: The New English Translation for Modern Readers",
    author: "Marcus Aurelius",
    cover: "https://m.media-amazon.com/images/I/41qeJMfXybL._SY445_SX342_.jpg",
    pages: "170",
    status: "read",
  },
  {
    title:
      "The Computer Science Book: A complete introduction to computer science in one book",
    author: "Thomas Johnson",
    cover: "https://m.media-amazon.com/images/I/714jjZEj8LL._SY425_.jpg",
    pages: "410",
    status: "unread",
  },
  {
    title: "The Demon-Haunted World: Science as a Candle in the Dark",
    author: "Carl Sagan",
    cover: "https://m.media-amazon.com/images/I/81EKphyfEnL._SY425_.jpg",
    pages: "482",
    status: "unread",
  },
  {
    title: "Mushoku Tensei: Jobless Reincarnation (Light Novel) Vol. 1",
    author: "Rifujin na Magonote",
    cover: "https://m.media-amazon.com/images/I/91B0bET59+L._SY425_.jpg",
    pages: "266",
    status: "read",
  },
  {
    title: "The Hard Way: Adapt, Survive and Win",
    author: "Mark Billingham",
    cover: "https://m.media-amazon.com/images/I/813kOmuBCyL._SY425_.jpg",
    pages: "400",
    status: "read",
  },
  {
    title:
      "Python Crash Course, 3rd Edition: A Hands-On, Project-Based Introduction to Programming",
    author: "Eric Matthes",
    cover: "https://m.media-amazon.com/images/I/81ZBWeKoZVL._SY425_.jpg",
    pages: "511",
    status: "read",
  },
  {
    title: "Spice and Wolf, Vol. 1 (light novel)",
    author: "Isuna hasekura",
    cover: "https://m.media-amazon.com/images/I/91NSp1vfDqL._SY425_.jpg",
    pages: "240",
    status: "unread",
  },
];

// Get references
const form = document.querySelector("dialog.modal.one form");
const catalog = document.querySelector(".book-catalog");
const addBookCard = document.querySelector(".add-book-card");
const btnRemove = document.getElementById("btn-remove");
const book_data_modal = document.querySelector(".modal.one");
const remove_book_modal = document.querySelector(".modal.two");
const title = document.getElementById("title");
const author = document.getElementById("author");
const cover = document.getElementById("cover");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const unread = document.getElementById("unread");
const filterCatalog = document.getElementById("control-filter");
const controlBotton = document.querySelector(".book-control-bottom");
let tempCardIndex;

// Search input to filter cards

const searchInput = document.getElementById("control-search");

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  console.log(value);

  myLibrary.forEach((obj, index) => {
    const isVisible = obj.title.toLowerCase().includes(value);
    console.log(isVisible);
    const a = document.querySelector(`.book-card[data-index="${index}"]`);
    console.log(a);

    a.classList.toggle("hide", !isVisible);
    console.log(index);
  });
});

// Add card to library
function addBookToLibrary(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const bookData = {};
  for (let keyValue of formData.entries()) {
    bookData[keyValue[0]] = keyValue[1];
  }

  // Update book data in catalog
  if (book_data_modal.id === "edit-book") {
    const card = document.querySelector(
      `.book-card[data-index="${tempCardIndex}"]`
    );
    myLibrary.splice(tempCardIndex, 1, bookData);
    updateCardDisplay(card, bookData);
  }

  // Add book data in catalog
  if (book_data_modal.id === "add-book") {
    displayBook(bookData);
    myLibrary.push(bookData);
  }

  book_data_modal.close();
  form.reset();
  updateStats();
}

form.addEventListener("submit", addBookToLibrary);

// Add existing card to library
myLibrary.forEach((card) => displayBook(card));

function generateHTMLSnippet(obj) {
  return `<div class="book-image">
  <div class="book-status">
    <div class="status-book-button">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24">
        <title>Edit status</title>
        <path
          d="M0.41,13.41L6,19L7.41,17.58L1.83,12M22.24,5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z" />
      </svg>
    </div>
  </div>
  <div class="book-options">
   <button class="edit-book-button" title="Edit book">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
      </svg>
    </button>
    <button class="remove-book-button" title="Remove book">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" />
      </svg>
    </button>
  </div>
  <div class="page-count">
    ${obj.pages} <img src="img/file-outline.svg" alt="" />
  </div>
</div>
<div class="book-info">
  <p class="book-info-title">
    ${obj.title}
  </p>
  <p class="book-info-author"> By ${obj.author}</p>
</div>`;
}

// Create card element
function displayBook(bookData) {
  const obj = bookData;
  const newCard = document.createElement("div");
  const cardCount = document.querySelectorAll("div.book-card");
  newCard.classList.add("book-card");
  newCard.setAttribute("data-index", `${cardCount.length}`);
  newCard.innerHTML = generateHTMLSnippet(obj);

  changeCardColor(newCard);

  if (obj.cover) {
    newCard.firstElementChild.style.cssText = `background-image: url(${obj.cover}); background-size: cover`;
  }
  if (obj.status === "read") {
    newCard.firstElementChild.firstElementChild.classList.add("read");
  }
  catalog.insertBefore(newCard, addBookCard);
}

function updateCardDisplay(card, obj) {
  card.innerHTML = generateHTMLSnippet(obj);
  if (obj.cover) {
    card.firstElementChild.style.cssText = `background-image: url(${obj.cover}); background-size: cover`;
  }
}

function updateStats() {
  const pages = myLibrary.reduce((acc, obj) => acc + +obj.pages, 0);
  const books = myLibrary.length;
  const read = myLibrary.filter((obj) => obj.status === "read").length;
  const unread = myLibrary.filter((obj) => obj.status === "unread").length;

  controlBotton.innerHTML = `
    <p><span id="n-pages">${pages}</span>Pages</p>
    <p><span id="n-books">${books}</span>Books</p>
    <p><span id="n-read">${read}</span>Read</p>
    <p><span id="n-unread">${unread}</span>Unread</p>
  `;
}

// Set up card buttons with event delegation
catalog.addEventListener("click", (e) => {
  // Edit button
  if (e.target.matches("button.edit-book-button")) {
    book_data_modal.firstElementChild.textContent = "Edit book";
    book_data_modal.id = "edit-book";
    tempCardIndex = e.target.closest("div.book-card").dataset.index;
    const bookData = myLibrary[tempCardIndex];

    title.value = bookData.title;
    author.value = bookData.author;
    cover.value = bookData.cover;
    pages.value = bookData.pages;
    title.value = bookData.title;
    if (bookData.status === "read") {
      unread.removeAttribute("checked");
      read.setAttribute("checked", "");
    } else {
      read.removeAttribute("checked");
      unread.setAttribute("checked", "");
    }

    book_data_modal.showModal();
  }

  // Remove button
  if (e.target.matches("button.remove-book-button")) {
    remove_book_modal.showModal();
    const card = e.target.closest("div.book-card");
    // Remove button confirmation for card deletion
    btnRemove.addEventListener("click", (e) => {
      myLibrary.splice(card.dataset.index, 1);
      card.remove();
      remove_book_modal.close();
      updateStats();

      // Update the data-index of all cards
      let count = 0;
      document.querySelectorAll("div.book-card").forEach((card) => {
        card.dataset.index = count;
        count++;
      });
    });
  }
  // Status button
  console.log(e.target);
  if (e.target.matches("div.status-book-button")) {
    let cardIndex = e.target.closest("div.book-card").dataset.index;
    let statusContainer = e.target.closest("div.book-status");

    statusContainer.classList.toggle("read");
    myLibrary[cardIndex].status =
      myLibrary[cardIndex].status === "read" ? "unread" : "read";
    updateStats();
  }
});

// Add button
document
  .querySelectorAll("button#control-add, .add-book-card svg")
  .forEach((i) =>
    i.addEventListener("click", (e) => {
      e.preventDefault();
      form.reset();
      book_data_modal.id = "add-book";
      book_data_modal.firstElementChild.textContent = "Add book";
      book_data_modal.showModal();
    })
  );

// Cancel button
document.querySelectorAll(".btn-cancel").forEach((i) => {
  i.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.closest("dialog").close();
    form.reset();
  });
});

// Filter catalog

filterCatalog.addEventListener("change", function () {
  catalog.dataset.filter = this.value;
});

// Clear input when using Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && book_data_modal.hasAttribute("open")) form.reset();
});
// Change card background color
function changeCardColor(card) {
  const randHSL = Math.floor(Math.random() * 361);
  card.style.backgroundColor = `hsl(${randHSL}, 20%, 71%)`;
}
const allCards = document.querySelectorAll("div.book-card");
allCards.forEach(changeCardColor);

// Auto update footer copyright year
document.getElementById("copy-year").textContent = new Date().getFullYear();

updateStats();
