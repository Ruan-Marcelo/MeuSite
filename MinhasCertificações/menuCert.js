const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu-mobile");
const overlay = document.getElementById("overley-menu");
const btnFechar = document.querySelector(".menu-mobile .btn-fechar");
const container = document.getElementById("certifications-container");
const filtroInstituicao = document.getElementById("filtro-instituicao");
const totalCertificacoes = document.getElementById("total-certificacoes");
const totalInstituicoes = document.getElementById("total-instituicoes");

let certificacoes = [];

function fecharMenu() {
  menu?.classList.remove("abrir-menu");
  if (overlay) overlay.style.display = "none";
}

btnMenu?.addEventListener("click", () => {
  menu?.classList.add("abrir-menu");
  if (overlay) overlay.style.display = "block";
});

btnFechar?.addEventListener("click", fecharMenu);
overlay?.addEventListener("click", fecharMenu);

document.querySelectorAll(".menu-mobile nav ul li a").forEach((link) => {
  link.addEventListener("click", fecharMenu);
});

function preencherResumo(data) {
  const instituicoes = new Set(data.map((cert) => cert.instituicao));

  if (totalCertificacoes) totalCertificacoes.textContent = data.length;
  if (totalInstituicoes) totalInstituicoes.textContent = instituicoes.size;
}

function preencherFiltro(data) {
  if (!filtroInstituicao) return;

  const instituicoes = [...new Set(data.map((cert) => cert.instituicao))].sort();

  instituicoes.forEach((instituicao) => {
    const option = document.createElement("option");
    option.value = instituicao;
    option.textContent = instituicao;
    filtroInstituicao.appendChild(option);
  });
}

function renderizarCertificacoes(data) {
  if (!container) return;

  container.innerHTML = "";

  if (!data.length) {
    container.innerHTML =
      '<p class="empty-state">Nenhuma certificação encontrada para esse filtro.</p>';
    return;
  }

  data.forEach((cert) => {
    const card = document.createElement("article");
    card.className = "cert-card";

    card.innerHTML = `
      <div class="cert-top">
        <div class="cert-logo">
          <img src="../imagens/${cert.imagem}" alt="${cert.instituicao}" loading="lazy">
        </div>
        <div class="cert-icon">
          <img src="../imagens/${cert.icone}" alt="" loading="lazy">
        </div>
      </div>

      <h3>${cert.titulo}</h3>

      <div class="cert-meta">
        <span>${cert.instituicao}</span>
        <span>${cert.data}</span>
      </div>

      <p>${cert.descricao}</p>
    `;

    container.appendChild(card);
  });
}

filtroInstituicao?.addEventListener("change", () => {
  const instituicao = filtroInstituicao.value;
  const filtradas =
    instituicao === "all"
      ? certificacoes
      : certificacoes.filter((cert) => cert.instituicao === instituicao);

  renderizarCertificacoes(filtradas);
});

fetch("certifications.json")
  .then((response) => {
    if (!response.ok) throw new Error("Erro ao carregar certificações");
    return response.json();
  })
  .then((data) => {
    certificacoes = data;
    preencherResumo(certificacoes);
    preencherFiltro(certificacoes);
    renderizarCertificacoes(certificacoes);
  })
  .catch(() => {
    if (container) {
      container.innerHTML =
        '<p class="empty-state">Não foi possível carregar as certificações.</p>';
    }
  });
