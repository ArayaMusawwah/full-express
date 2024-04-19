const button = document.querySelector(".menu-button");
const hamburgerMenu = document.querySelector("#hamburger-menu");

button.addEventListener("click", () => {
  const aside = document.querySelector(".aside");
  aside.classList.toggle("ml-0");
  button.classList.toggle("ml-72");
  const main = document.querySelector(".main");
  main.classList.toggle("ml-72");

  if (hamburgerMenu.classList.contains("fa-bars")) {
    hamburgerMenu.classList.remove("fa-bars");
    hamburgerMenu.classList.add("fa-x");
  } else {
    hamburgerMenu.classList.remove("fa-x");
    hamburgerMenu.classList.add("fa-bars");
  }
});

/* searchButton.addEventListener('click', () => {
  if (searchInput.value) {
    window.location.href = `/products?search=${searchInput.value}`;
  }
}) */

function deleteConfirmation(button) {
  const form = button.parentNode.parentNode;
  if (confirm("Yakin mau dihapus deck ? ? ? ☝️ 😅")) form.submit();
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("addSizeBtn")) {
    const inputDiv = e.target.parentNode.parentNode;
    const cloneInputDiv = inputDiv.cloneNode(true);

    console.log("cloneInputDiv", cloneInputDiv);

    inputDiv.insertAdjacentHTML("afterend", cloneInputDiv.outerHTML);
  }

  if (e.target.classList.contains("removeSizeBtn")) {
    const buttons = Array.from(document.querySelectorAll(".removeSizeBtn"));
    if (buttons.length > 1) {
      const div = e.target.parentNode.parentNode;
      div.parentNode.removeChild(div);
    }
  }
});

const imageInput = document.getElementById("image");

imageInput?.addEventListener("change", (e) => {
  const file = e.target.files[0].name;
  const fileName = document.getElementById("fileName");
  if (file) fileName.textContent = file;
});

// buat search-search-an
const searchButton = document.querySelector("#search-button");
const searchBox = document.querySelector("#search-box");
const searchIcon = document.querySelector("#search-box button");
const searchInput = document.querySelector("#search-box input");

searchButton?.addEventListener("click", () => {
  searchBox.classList.toggle("opacity-100");
  searchBox.classList.toggle("scale-x-100");
  searchInput.focus();
});

searchInput?.addEventListener("keyup", (e) => {
  if (e.key === "Enter") search();
});
function search() {
  if (String(window.location.href).includes("/garments") && searchInput.value) {
    window.location.href = `/garments?search=${searchInput.value}`;
  }

  if (String(window.location.href).includes("/products") && searchInput.value) {
    window.location.href = `/products?search=${searchInput.value}`;
  }
}

function triggerPanel() {
  const signin = document.querySelector("#signin");
  const register = document.querySelector("#register");
  const foreground = document.querySelector("#foreground");
  const toggleForeground = document.querySelector("#toggle-foreground");
  const signinPanel = document.querySelector("#signin-panel");
  const registerPanel = document.querySelector("#register-panel");

  signinPanel.classList.toggle("translate-x-full");
  signinPanel.classList.toggle("opacity-0");
  registerPanel.classList.toggle("translate-x-full");
  registerPanel.classList.toggle("opacity-100");

  foreground.classList.toggle("-translate-x-full");
  foreground.classList.toggle("rounded-[0_125px_100px_0]");
  foreground.classList.toggle("rounded-[125px_0_0_100px]");
  toggleForeground.classList.toggle("-translate-x-1/2");

  register.classList.toggle("opacity-100");
  register.classList.toggle("translate-x-full");
  !register.classList.contains("z-10")
    ? setTimeout(() => register.classList.add("z-10"), 500)
    : register.classList.remove("z-10");

  signin.classList.toggle("translate-x-full");
  signin.classList.toggle("opacity-0");
}

const btnTrigger = document.querySelectorAll(".btn-trigger");
btnTrigger.forEach((btn) => {
  btn.addEventListener("click", triggerPanel);
});

const flashCard = document.querySelector("#flash-card");
setTimeout(() => {
  flashCard.classList.add("hidden");
  flashCard.classList.remove("inline-block");
}, 3000);
