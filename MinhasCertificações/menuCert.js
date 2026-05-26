const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu-mobile");
const overlay = document.getElementById("overley-menu");
const btnFechar = document.querySelector(".menu-mobile .btn-fechar");

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

// carrega as certificações do JSON e renderiza na página
fetch("certifications.json")
  .then((response) => {
    if (!response.ok) throw new Error("Erro ao carregar certificações");
    return response.json();
  })
  .then((data) => {
    const container = document.getElementById("certifications-container");
    if (!container) return;

    data.forEach((cert) => {
      const card = document.createElement("article");
      card.classList.add("card");

      card.innerHTML = `
        <img src="../imagens/${cert.imagem}" alt="${cert.instituicao}" loading="lazy">

        <h3>
          <img src="../imagens/${cert.icone}" alt="${cert.titulo}" loading="lazy">
          ${cert.titulo}
        </h3>

        <ul style="color:white;">
          <li><strong style="color:blue;">Instituição:</strong> ${cert.instituicao}</li>
          <li><strong style="color:blue;">Conclusão:</strong> ${cert.data}</li>
        </ul>

        <p>${cert.descricao}</p>
      `;

      container.appendChild(card);
    });
  })
  .catch(() => {
    const container = document.getElementById("certifications-container");
    if (container) {
      container.innerHTML =
        '<p style="color:white;">Não foi possível carregar as certificações.</p>';
    }
  });
