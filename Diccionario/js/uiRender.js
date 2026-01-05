// UI Renderer: Handles DOM updates

const grid = document.getElementById("conceptsGrid");
const resultsCount = document.getElementById("resultsCount");
const noResults = document.getElementById("noResults");

export function renderGrid(data) {
  grid.innerHTML = "";

  if (data.length === 0) {
    grid.classList.add("hidden");
    noResults.classList.remove("hidden");
    resultsCount.textContent = "0 conceptos encontrados";
    return;
  }

  grid.classList.remove("hidden");
  noResults.classList.add("hidden");
  resultsCount.textContent = `Mostrando ${data.length} conceptos`;

  data.forEach((concept, index) => {
    const card = createCard(concept);
    grid.appendChild(card);

    // Staggered animation
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 20); // Faster stagger for large lists
  });
}

function createCard(concept) {
  const card = document.createElement("article");
  card.className = "concept-card";
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";

  const letter = concept.term.charAt(0).toUpperCase();

  // Category badge (optional visual indicator)
  let catClass = "cat-badge";
  if (concept.category) catClass += ` cat-${concept.category}`;

  card.innerHTML = `
        <div class="card-header">
            <h3 class="term">${concept.term}</h3>
            <div class="letter-badge">${letter}</div>
        </div>
        <p class="definition">${concept.def}</p>
        <span class="category-tag">${formatCategory(concept.category)}</span>
    `;

  return card;
}

function formatCategory(cat) {
  if (!cat) return "General";
  return cat.charAt(0).toUpperCase() + cat.slice(1);
}
