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


// emails
(function () {
  emailjs.init("N9ziwX_xtVhMMNSX7");
})();

const form = document.getElementById("form-contato");
const toast = document.getElementById("toast");

function showToast() {
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000); // some depois de 3 segundos
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const btn = form.querySelector('input[type="submit"]');
  btn.value = "Enviando...";

  emailjs.send("service_jl668yi", "template_hmddxum", {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    celular: document.getElementById("celular").value,
    mensagem: document.getElementById("mensagem").value,
  })
  .then(() => {
    showToast();      //notifica
    form.reset();     //reset form
    btn.value = "ENVIAR";
  })
  .catch((error) => {
    btn.value = "ENVIAR";
    alert("Erro ao enviar 😢");
    console.log(error);
  });
});
