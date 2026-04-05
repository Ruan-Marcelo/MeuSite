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
    alert("Erro ao enviar");
    console.log(error);
  });
});

let projetos = [];

fetch("projetos.json")
  .then(res => res.json())
  .then(data => {
    projetos = data;
    renderizar(projetos);
  });

const container = document.getElementById("projects-container");
const filtroTech = document.getElementById("filtro-tech");
const ordenacao = document.getElementById("ordenacao");

filtroTech.addEventListener("change", aplicarFiltros);
ordenacao.addEventListener("change", aplicarFiltros);

function aplicarFiltros() {
  let filtrados = [...projetos];

  const techSelecionada = filtroTech.value;

  if (techSelecionada !== "all") {
    filtrados = filtrados.filter(proj =>
      proj.tecnologias.includes(techSelecionada)
    );
  }

  // ⭐ 
  if (ordenacao.value === "destaque") {
    filtrados.sort((a, b) => (b.destaque === true) - (a.destaque === true));
  }

  renderizar(filtrados);
}

function renderizar(lista) {
  container.innerHTML = "";

  lista.forEach(proj => {
    const card = document.createElement("div");
    card.classList.add("projeto-card");

    const techs = proj.tecnologias
      .map(t => `<span>${t}</span>`)
      .join("");

    card.innerHTML = `
    ${proj.destaque ? '<span class="badge">⭐</span>' : ''}
      <h3>${proj.titulo}</h3>
      <p>${proj.descricao}</p>

      <div class="tech">
        ${techs}
      </div>

      <div class="actions">
        <a href="${proj.link}" target="_blank">
          ${proj.tipo === "github" ? "GitHub" : "Ver Projeto"}
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}