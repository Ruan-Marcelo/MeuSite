let btnMenu = document.getElementById("btn-menu");
let menu = document.getElementById("menu-mobile");
let overley = document.getElementById("overley-menu");

btnMenu.addEventListener("click", () => {
  console.log("Menu Button Clicked");
  menu.classList.add("abrir-menu");
  overley.style.display = "block"; // Mostra o overlay
});

menu.addEventListener("click", () => {
  console.log("Menu Clicked");
  menu.classList.remove("abrir-menu");
  overley.style.display = "none"; // Oculta o overlay
});

overley.addEventListener("click", () => {
  console.log("Overlay Clicked");
  menu.classList.remove("abrir-menu");
  overley.style.display = "none"; // Oculta o overlay
});
