const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu-mobile");
const overlay = document.getElementById("overley-menu");
const btnFechar = document.querySelector(".menu-mobile .btn-fechar");
const container = document.getElementById("certifications-container");
const filtroInstituicao = document.getElementById("filtro-instituicao");
const totalCertificacoes = document.getElementById("total-certificacoes");
const totalInstituicoes = document.getElementById("total-instituicoes");
const spotifyTracks = document.getElementById("spotify-tracks");
const spotifyPopup = document.getElementById("spotify-popup");
const spotifyClose = document.getElementById("spotify-close");
const spotifyOpen = document.getElementById("spotify-open");

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

spotifyClose?.addEventListener("click", () => {
  spotifyPopup?.classList.add("is-hidden");
  spotifyOpen?.classList.remove("is-hidden");
});

spotifyOpen?.addEventListener("click", () => {
  spotifyPopup?.classList.remove("is-hidden");
  spotifyOpen?.classList.add("is-hidden");
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
    card.className = "cert-card card h-100";

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

      <div class="cert-meta d-flex flex-wrap">
        <span class="rounded-pill">${cert.instituicao}</span>
        <span class="rounded-pill">${cert.data}</span>
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

fetch("../data/certifications.json")
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

function spotifyFallback(container, message) {
  if (!container) return;
  container.innerHTML = `<p class="sem-resultados">${message}</p>`;
}

function criarItemSpotify(item, subtitle) {
  const link = document.createElement("a");
  link.className = "spotify-item";
  link.href = item.url || "https://open.spotify.com/";
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const image = document.createElement("img");
  image.src = item.image || "../imagens/9d34778f-29ef-4e44-8198-cb1f2e1043e6.png";
  image.alt = "";
  image.loading = "lazy";

  const content = document.createElement("div");

  const name = document.createElement("strong");
  name.textContent = item.name;

  const meta = document.createElement("span");
  meta.textContent = subtitle;

  content.append(name, meta);
  link.append(image, content);

  return link;
}

function renderizarSpotify(data) {
  const tracks = data.tracks || [];

  if (!spotifyTracks) return;

  spotifyTracks.innerHTML = "";
  tracks.slice(0, 5).forEach((track) => {
    spotifyTracks.appendChild(
      criarItemSpotify(track, (track.artists || []).join(", "))
    );
  });

  if (!tracks.length) {
    spotifyFallback(spotifyTracks, "Configure o Spotify no GitHub Actions.");
  }
}

fetch("../data/spotify.json")
  .then((res) => {
    if (!res.ok) throw new Error("Erro ao carregar Spotify");
    return res.json();
  })
  .then(renderizarSpotify)
  .catch(() => {
    spotifyFallback(spotifyTracks, "Nao foi possivel carregar o Spotify.");
  });
