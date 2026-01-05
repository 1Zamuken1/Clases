// UI Renderer: Handles DOM updates (Global Namespace)

window.UI = {
  grid: null,
  resultsCount: null,
  noResults: null,

  init: function () {
    this.grid = document.getElementById("conceptsGrid");
    this.resultsCount = document.getElementById("resultsCount");
    this.noResults = document.getElementById("noResults");
  },

  renderGrid: function (data) {
    if (!this.grid) this.init(); // safe check

    this.grid.innerHTML = "";

    if (data.length === 0) {
      this.grid.classList.add("hidden");
      this.noResults.classList.remove("hidden");
      this.resultsCount.textContent = "0 conceptos encontrados";
      return;
    }

    this.grid.classList.remove("hidden");
    this.noResults.classList.add("hidden");
    this.resultsCount.textContent = `Mostrando ${data.length} conceptos`;

    data.forEach((concept, index) => {
      const card = this.createCard(concept);
      this.grid.appendChild(card);

      // Staggered animation
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, index * 20);
    });
  },

  createCard: function (concept) {
    const card = document.createElement("article");
    card.className = "concept-card";
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    const letter = concept.term.charAt(0).toUpperCase();

    // Category badge (optional)
    let catClass = "cat-badge";
    if (concept.category) catClass += ` cat-${concept.category}`;

    card.innerHTML = `
            <div class="card-header">
                <h3 class="term">${concept.term}</h3>
                <div class="letter-badge">${letter}</div>
            </div>
            <p class="definition">${concept.def}</p>
            <span class="category-tag">${this.formatCategory(
              concept.category
            )}</span>
        `;

    return card;
  },

  formatCategory: function (cat) {
    if (!cat) return "General";
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  },
};
