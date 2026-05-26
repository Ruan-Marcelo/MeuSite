const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu-mobile");
const overlay = document.getElementById("overley-menu");

function fecharMenu() {
  menu?.classList.remove("abrir-menu");
  if (overlay) overlay.style.display = "none";
}

btnMenu?.addEventListener("click", () => {
  menu?.classList.add("abrir-menu");
  if (overlay) overlay.style.display = "block";
});

menu?.addEventListener("click", fecharMenu);
overlay?.addEventListener("click", fecharMenu);

// barra no topo
const textos = [
  "Desenvolvedor Full-Stack",
  "Desenvolvedor Back-end",
  "Especialista em .NET",
  "APIs | Angular | SQL Server",
];

let index = 0;
let charIndex = 0;
let escrevendo = true;

const elemento = document.querySelector(".dinamico");

function digitar() {
  if (!elemento) return;

  if (escrevendo) {
    if (charIndex < textos[index].length) {
      elemento.textContent += textos[index].charAt(charIndex);
      charIndex++;
      setTimeout(digitar, 80);
    } else {
      escrevendo = false;
      setTimeout(digitar, 1500);
    }
  } else if (charIndex > 0) {
    elemento.textContent = textos[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(digitar, 40);
  } else {
    escrevendo = true;
    index = (index + 1) % textos.length;
    setTimeout(digitar, 300);
  }
}

digitar();

if (window.emailjs) {
  emailjs.init("N9ziwX_xtVhMMNSX7");
}

const form = document.getElementById("form-contato");
const toast = document.getElementById("toast");

function showToast() {
  toast?.classList.add("show");
  setTimeout(() => {
    toast?.classList.remove("show");
  }, 3000);
}

form?.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const celular = document.getElementById("celular").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();
  const btn = form.querySelector('input[type="submit"]');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const celularRegex = /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;

  if (!emailRegex.test(email)) {
    alert("Digite um email válido!");
    return;
  }

  if (celular !== "" && !celularRegex.test(celular)) {
    alert("Digite um celular válido! Ex: (16) 99999-9999");
    return;
  }

  if (!window.emailjs) {
    alert("O serviço de envio não carregou. Tente novamente em instantes.");
    return;
  }

  btn.value = "Enviando...";
  btn.disabled = true;

  emailjs
    .send("service_jl668yi", "template_hmddxum", {
      nome,
      email,
      celular,
      mensagem,
    })
    .then(() => {
      showToast();
      form.reset();
    })
    .catch(() => {
      alert("Erro ao enviar. Tente novamente.");
    })
    .finally(() => {
      btn.value = "ENVIAR";
      btn.disabled = false;
    });
});

let projetos = [];

const container = document.getElementById("projects-container");
const filtroTech = document.getElementById("filtro-tech");
const ordenacao = document.getElementById("ordenacao");

fetch("projetos.json")
  .then((res) => {
    if (!res.ok) throw new Error("Erro ao carregar projetos");
    return res.json();
  })
  .then((data) => {
    projetos = data;
    renderizar(projetos);
  })
  .catch(() => {
    renderizar([]);
  });

filtroTech?.addEventListener("change", aplicarFiltros);
ordenacao?.addEventListener("change", aplicarFiltros);

function aplicarFiltros() {
  let filtrados = [...projetos];

  const tech = filtroTech?.value || "all";
  const ordem = ordenacao?.value || "default";

  if (tech !== "all") {
    filtrados = filtrados.filter((p) => p.tecnologias.includes(tech));
  }

  if (["frontend", "backend", "fullstack"].includes(ordem)) {
    filtrados = filtrados.filter((p) => p.tipo === ordem);
  }

  if (ordem === "destaque") {
    filtrados.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
  }

  renderizar(filtrados);
}

function renderizar(lista) {
  if (!container) return;

  container.innerHTML = "";

  if (!lista.length) {
    const vazio = document.createElement("p");
    vazio.className = "sem-resultados";
    vazio.textContent = "Nenhum projeto encontrado.";
    container.appendChild(vazio);
    return;
  }

  lista.forEach((proj) => {
    const card = document.createElement("div");
    card.classList.add("projeto-card");

    if (proj.destaque) {
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = "Destaque";
      card.appendChild(badge);
    }

    const tipo = document.createElement("span");
    tipo.className = `projeto-tipo tipo-${proj.tipo}`;
    tipo.textContent =
      {
        frontend: "Front-end",
        backend: "Back-end",
        fullstack: "Full Stack",
      }[proj.tipo] || "Projeto";

    const titulo = document.createElement("h3");
    titulo.textContent = proj.titulo;

    const descricao = document.createElement("p");
    descricao.textContent = proj.descricao;

    const tech = document.createElement("div");
    tech.className = "tech";

    proj.tecnologias.forEach((item) => {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = item;
      tech.appendChild(tag);
    });

    const actions = document.createElement("div");
    actions.className = "actions";

    const link = document.createElement("a");
    link.href = proj.link;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.innerHTML = proj.link.includes("github.com")
      ? '<i class="bi bi-github"></i> GitHub'
      : '<i class="bi bi-box-arrow-up-right"></i> Ver projeto';
    actions.appendChild(link);

    card.append(tipo, titulo, descricao, tech, actions);
    container.appendChild(card);
  });
}

renderizar(projetos);
