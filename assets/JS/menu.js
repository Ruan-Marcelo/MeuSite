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

// barra no topo
const textos = [
  "Desenvolvedor Full-Stack",
  "Desenvolvedor Back-end",
  "Especialista em .NET",
  "APIs | Angular | SQL Server"
];

let index = 0;
let charIndex = 0;
let escrevendo = true;

const elemento = document.querySelector(".dinamico");

function digitar() {
  if (escrevendo) {
    if (charIndex < textos[index].length) {
      elemento.textContent += textos[index].charAt(charIndex);
      charIndex++;
      setTimeout(digitar, 80);
    } else {
      escrevendo = false;
      setTimeout(digitar, 1500);
    }
  } else {
    if (charIndex > 0) {
      elemento.textContent = textos[index].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(digitar, 40);
    } else {
      escrevendo = true;
      index = (index + 1) % textos.length;
      setTimeout(digitar, 300);
    }
  }
}

digitar();

// emails
 // INICIALIZA EMAILJS
  (function () {
    emailjs.init("N9ziwX_xtVhMMNSX7");
  })();

  const form = document.getElementById("form-contato");
  const toast = document.getElementById("toast");

  function showToast() {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const celular = document.getElementById("celular").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    const btn = form.querySelector('input[type="submit"]');

    // REGEX
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const celularRegex = /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;

    // VALIDAÇÕES
    if (!emailRegex.test(email)) {
      alert("Digite um email válido!");
      return;
    }

    if (celular !== "" && !celularRegex.test(celular)) {
      alert("Digite um celular válido! Ex: (16) 99999-9999");
      return;
    }

    btn.value = "Enviando...";

    // ENVIO
    emailjs.send("service_jl668yi", "template_hmddxum", {
      nome: nome,
      email: email,
      celular: celular,
      mensagem: mensagem,
    })
    .then(() => {
      showToast();
      form.reset();
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

  const tech = filtroTech.value;
  const ordem = ordenacao.value;

  if (tech !== "all") {
    filtrados = filtrados.filter(p =>
      p.tecnologias.includes(tech)
    );
  }
  if (["frontend", "backend", "fullstack"].includes(ordem)) {
    filtrados = filtrados.filter(p => p.tipo === ordem);
  }
  if (ordem === "destaque") {
    filtrados.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
  }

  renderizar(filtrados);
}

function renderizar(lista) {
  container.innerHTML = "";

  lista.forEach(proj => {
    const card = document.createElement("div");
    card.classList.add("projeto-card");

    const techs = proj.tecnologias
      .map(t => `<span class="tag">${t}</span>`)
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

renderizar(projetos);