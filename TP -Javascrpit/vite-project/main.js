const characterList = document.getElementById("character-list");
const searchInput = document.getElementById("searchInput");

let characters = [];

async function fetchCharacters() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character/");
    const data = await response.json();
    characters = data.results;
    displayCharacters(characters);
  } catch (error) {
    characterList.innerHTML = "<p>Error al cargar los personajes.</p>";
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

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm)
  );
  displayCharacters(filteredCharacters);
});

fetchCharacters();