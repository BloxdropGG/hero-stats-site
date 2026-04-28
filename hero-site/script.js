let heroes = [];

fetch('heroes.json')
.then(res => res.json())
.then(data => {
    heroes = data;
});

const input = document.getElementById("search");
const results = document.getElementById("results");

input.addEventListener("input", () => {
    const query = input.value.toLowerCase();

    results.innerHTML = "";

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

        <p><b>Counters:</b><br>${tags(hero.counters)}</p>
        <p><b>Strong Against:</b><br>${tags(hero.strongAgainst)}</p>
        <p><b>Compatibility:</b><br>${tags(hero.compatible)}</p>
    `;

    results.appendChild(div);
}

function tags(list) {
    return list.map(x => `<span class="tag">${x}</span>`).join("");
}