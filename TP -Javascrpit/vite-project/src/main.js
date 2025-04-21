const characterList = document.getElementById("character-list");
const searchInput = document.getElementById("searchInput");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const pageNumber = document.getElementById("pageNumber");

let currentPage = 1;
let totalPages = 1;
let currentSearch = "";

async function fetchCharacters(page = 1, name = "") {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`);
    const data = await response.json();
    displayCharacters(data.results);
    totalPages = data.info.pages;
    updatePageInfo();
  } catch (error) {
    characterList.innerHTML = "<p>No se encontraron personajes.</p>";
    totalPages = 1;
    updatePageInfo();
    console.error("Error al obtener datos:", error);
  }
}

function displayCharacters(characters) {
  characterList.innerHTML = "";
  characters.forEach((character) => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}" />
      <h3>${character.name}</h3>
      <p>${character.species}</p>
    `;
    characterList.appendChild(card);
  });
}

function updatePageInfo() {
  pageNumber.textContent = `Página ${currentPage}`;
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

searchInput.addEventListener("input", () => {
  currentSearch = searchInput.value.toLowerCase();
  currentPage = 1;
  fetchCharacters(currentPage, currentSearch);
});

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage, currentSearch);
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchCharacters(currentPage, currentSearch);
  }
});

fetchCharacters(currentPage);
