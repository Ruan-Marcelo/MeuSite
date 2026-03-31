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

        <ul>
          <li><strong>Instituição:</strong> ${cert.instituicao}</li>
          <li><strong>Conclusão:</strong> ${cert.data}</li>
        </ul>

        <p>${cert.descricao}</p>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => console.error("Erro ao carregar certificações:", error));