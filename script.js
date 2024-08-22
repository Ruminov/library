// Store book data
const myLibrary = [
  {
    title:
      "Meditations - Marcus Aurelius: The New English Translation for Modern Readers",
    author: "By Marcus Aurelius",
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
const form = document.querySelector("dialog#book-data form");
const catalog = document.querySelector(".book-catalog");
const addBookCard = document.querySelector(".add-book-card");
const btnRemove = document.getElementById("btn-remove");
const book_data_modal = document.querySelector("#book-data.modal");
const remove_book_modal = document.querySelector("#remove-book.modal");
const title = document.getElementById("title");
const author = document.getElementById("author");
const cover = document.getElementById("cover");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const unread = document.getElementById("unread");
let tempCardIndex;

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
    myLibrary.splice(tempCardIndex, 1, bookData);
    console.log("Edit one");
  }

  // Add book data in catalog
  if (book_data_modal.id === "add-book") {
    displayBook(bookData);
    myLibrary.push(bookData);
    console.log(bookData);
    console.log("Add one");
  }
  console.log(myLibrary);
  book_data_modal.close();
  form.reset();
}

form.addEventListener("submit", addBookToLibrary);

// Add existing card to library
myLibrary.forEach((card) => displayBook(card));

// Create card element
function displayBook(bookData) {
  const obj = bookData;
  const newCard = document.createElement("div");
  const cardCount = document.querySelectorAll("div.book-card");
  newCard.classList.add("book-card");
  newCard.setAttribute("data-index", `${cardCount.length}`);
  console.log(myLibrary);
  newCard.innerHTML = `<div class="book-image">
  <div class="book-status">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="status-book-button"
      title="Change status">
      <path
        d="M0.41,13.41L6,19L7.41,17.58L1.83,12M22.24,5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z" />
    </svg>
  </div>
  <div class="book-options">
    <button class="edit-book-button" title="Edit book">✎</button>
    <button class="remove-book-button" title="Remove book">✖</button>
  </div>
  <div class="page-count">
    ${obj.pages} <img src="img/file-outline.svg" alt="" />
  </div>
</div>
<div class="book-info">
  <p class="book-info-title">
    ${obj.title}
  </p>
  <p class="book-info-author">${obj.author}</p>
</div>`;

  if (obj.cover) {
    newCard.firstElementChild.style.cssText = `background-image: url(${obj.cover}); background-size: cover`;
  }
  if (obj.status === "read") {
    newCard.firstElementChild.firstElementChild.classList.add("read");
  }
  catalog.insertBefore(newCard, addBookCard);
}

// Set up card buttons with event delegation
catalog.addEventListener("click", (e) => {
  // Edit button
  if (e.target.matches("button.edit-book-button")) {
    console.log(myLibrary);
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
      console.log("Primero");
    } else {
      read.removeAttribute("checked");
      unread.setAttribute("checked", "");
      console.log("Segundo");
    }

    book_data_modal.showModal();
  }

  // Remove button
  if (e.target.matches("button.remove-book-button")) {
    remove_book_modal.showModal();
    const card = e.target.closest("div.book-card");
    console.log(card);
    // Remove button confirmation for card deletion
    btnRemove.addEventListener("click", (e) => {
      myLibrary.splice(card.dataset.index, 1);
      card.remove();
      remove_book_modal.close();

      // Update the data-index of all cards
      let count = 0;
      document.querySelectorAll("div.book-card").forEach((card) => {
        card.dataset.index = count;
        count++;
        console.log("done");
      });
    });
  }
  // Status button
  if (e.target.matches("svg.status-book-button")) {
    let cardIndex = e.target.closest("div.book-card").dataset.index;
    let statusContainer = e.target.closest("div.book-status");
    console.log(statusContainer);

    statusContainer.classList.toggle("read");
    myLibrary[cardIndex].status =
      myLibrary[cardIndex].status === "read" ? "unread" : "read";
    console.log(myLibrary);
  }
});

// Add button
document
  .querySelectorAll("button#control-add, .add-book-card svg")
  .forEach((i) =>
    i.addEventListener("click", () => {
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

// Clear input when using Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && book_data_modal.hasAttribute("open")) form.reset();
});

// Auto update footer copyright year
document.getElementById("copy-year").textContent = new Date().getFullYear();
