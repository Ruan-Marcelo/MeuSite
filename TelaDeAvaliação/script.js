const stars = document.querySelectorAll(".star");
const emojiEl = document.querySelector(".emoji");
const statusEl = document.querySelector(".status");
const defaultRatingIndex = 0;
let currentRatingIndex = 0;

const ratings = [
  { emoji: "😎", name: "Classifique o desempenho do site" },
  { emoji: "😔", name: "Muito ruim" },
  { emoji: "🙁", name: "Ruim" },
  { emoji: "🙂", name: "Bom" },
  { emoji: "🤩", name: "Muito bom" },
  { emoji: "🥰", name: "Excelente" },
];

const checkSelectedStar = (star) => {
  return parseInt(star.getAttribute("data-rate"), 10) === currentRatingIndex;
};

const setRating = (index) => {
  stars.forEach((star) => star.classList.remove("selected"));
  if (index > 0 && index <= stars.length) {
    document
      .querySelector(`[data-rate="${index}"]`)
      ?.classList.add("selected");
  }
  emojiEl.textContent = ratings[index].emoji;
  statusEl.textContent = ratings[index].name;
};

const resetRating = () => {
  currentRatingIndex = defaultRatingIndex;
  setRating(defaultRatingIndex);
};

stars.forEach((star) => {
  const index = parseInt(star.getAttribute("data-rate"), 10);
  star.setAttribute("role", "button");
  star.setAttribute("tabindex", "0");
  star.setAttribute("aria-label", `Avaliar com ${index} estrela${index > 1 ? "s" : ""}`);

  star.addEventListener("click", function () {
    if (checkSelectedStar(star)) {
      resetRating();
      return;
    }
    currentRatingIndex = index;
    setRating(index);
  });

  star.addEventListener("mouseover", function () {
    setRating(index);
  });

  star.addEventListener("mouseout", function () {
    setRating(currentRatingIndex);
  });

  star.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      currentRatingIndex = index;
      setRating(index);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  setRating(defaultRatingIndex);
});
