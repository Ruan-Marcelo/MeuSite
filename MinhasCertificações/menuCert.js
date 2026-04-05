let btnMenu = document.getElementById("btn-menu");
let menu = document.getElementById("menu-mobile");
let overlay = document.getElementById("overley-menu"); // se quiser, pode renomear para overlay-menu
let btnFechar = document.querySelector(".menu-mobile .btn-fechar");

// abre
btnMenu.addEventListener("click", () => {
  menu.classList.add("abrir-menu");
  overlay.style.display = "block";
});

// fecha no x
btnFechar.addEventListener("click", () => {
  menu.classList.remove("abrir-menu");
  overlay.style.display = "none";
});

// fecha se clicar fora
overlay.addEventListener("click", () => {
  menu.classList.remove("abrir-menu");
  overlay.style.display = "none";
});

document.querySelectorAll(".menu-mobile nav ul li a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("abrir-menu");
    overlay.style.display = "none";
  });
});

//carrega as certificações do JSON e renderiza na page bb
fetch("certifications.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("certifications-container");

    data.forEach(cert => {
      const card = document.createElement("article");
      card.classList.add("card");

      card.innerHTML = `
        <img src="../imagens/${cert.imagem}" alt="${cert.instituicao}" loading="lazy">

        <h3>
          <img src="../imagens/${cert.icone}" alt="${cert.titulo}">
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
  .catch(error => console.error("Erro ao carregar certificações:", error));