let heroes = [];
let dataLoaded = false;

fetch('./heroes.json')
  .then(res => res.json())
  .then(data => {
    heroes = data;
    dataLoaded = true;
    console.log("Heroes loaded:", heroes);
  })
  .catch(err => console.error("Failed to load JSON:", err));

const input = document.getElementById("search");
const results = document.getElementById("results");

input.addEventListener("input", () => {
  const query = input.value.toLowerCase().trim();

  results.innerHTML = "";

  // 🧠 WAIT until data loads
  if (!dataLoaded) {
    results.innerHTML = "<p>Loading heroes...</p>";
    return;
  }

  if (query === "") return;

  const filtered = heroes.filter(hero =>
    hero.name.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    results.innerHTML = "<p>No heroes found</p>";
    return;
  }

  filtered.forEach(displayHero);
});

function displayHero(hero) {
  const div = document.createElement("div");
  div.className = "hero-card";

  div.innerHTML = `
    <img src="${hero.image}" class="hero-img">
    <h2>${hero.name}</h2>
    <p>Role: ${hero.role}</p>
    <p>Winrate: ${hero.winrate}</p>
    <p>Difficulty: ${hero.difficulty}</p>

    <p><b>Counters:</b><br>${format(hero.counters)}</p>
    <p><b>Strong Against:</b><br>${format(hero.strongAgainst)}</p>
    <p><b>Compatible:</b><br>${format(hero.compatible)}</p>
  `;

  results.appendChild(div);
}

function format(list) {
  return list.map(x => `<span class="tag">${x}</span>`).join("");
}
