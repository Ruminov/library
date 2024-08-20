const myLibrary = [];

function Book() {}

function addBookToLibrary() {}

function displayBook() {}

// Auto update footer copyright year
document.getElementById("copy-year").textContent = new Date().getFullYear();

const modal = document.getElementById("modal");

document.addEventListener("keypress", (e) => {
  if (e.key === "i") modal.showModal();

  if (e.key === "o") modal.close();
});
