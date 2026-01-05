// Mode: Match (Connect items)
window.Modes.Match = {
  init: function (container, dataPool, onComplete) {
    this.container = container;
    this.dataPool = dataPool;
    this.onComplete = onComplete;
    this.selectedTerm = null;
    this.matchesLeft = 4; // 4 pairs

    // Pick 4 pairs
    this.pairs = this.getPairs(4);
    this.terms = this.shuffle([...this.pairs]);
    this.defs = this.shuffle([...this.pairs]);

    this.render();
  },

  render: function () {
    this.container.innerHTML = `
            <div class="match-container">
                <div class="match-col" id="colTerms">
                    ${this.terms
                      .map(
                        (p) =>
                          `<div class="match-item term-card" data-id="${p.term}">${p.term}</div>`
                      )
                      .join("")}
                </div>
                <div class="match-col" id="colDefs">
                    ${this.defs
                      .map(
                        (p) =>
                          `<div class="match-item def-card" data-match="${p.term}">${p.def}</div>`
                      )
                      .join("")}
                </div>
            </div>
        `;

    // Bind Terms
    this.container.querySelectorAll(".term-card").forEach((el) => {
      el.addEventListener("click", (e) => {
        // Deselect previous
        this.container
          .querySelectorAll(".term-card")
          .forEach((c) => c.classList.remove("selected"));
        e.target.classList.add("selected");
        this.selectedTerm = e.target.dataset.id;
        this.checkMatch();
      });
    });

    // Bind Defs
    this.container.querySelectorAll(".def-card").forEach((el) => {
      el.addEventListener("click", (e) => {
        if (!this.selectedTerm) return;

        const matchId = e.target.dataset.match;
        if (matchId === this.selectedTerm) {
          // Match found!
          this.handleMatch(this.selectedTerm, e.target);
        } else {
          // Wrong
          e.target.classList.add("wrong");
          setTimeout(() => e.target.classList.remove("wrong"), 500);
        }
      });
    });
  },

  handleMatch: function (termId, defEl) {
    const termEl = Array.from(
      this.container.querySelectorAll(".term-card")
    ).find((el) => el.dataset.id === termId);

    termEl.classList.add("matched");
    defEl.classList.add("matched");

    this.selectedTerm = null;
    this.matchesLeft--;

    if (this.matchesLeft <= 0) {
      setTimeout(() => this.onComplete(200), 500);
    }
  },

  checkMatch: function () {
    // Logic handled in click events
  },

  getPairs: function (count) {
    const pool = [...this.dataPool];
    const result = [];
    for (let i = 0; i < count; i++) {
      if (pool.length === 0) break;
      const idx = Math.floor(Math.random() * pool.length);
      result.push(pool[idx]);
      pool.splice(idx, 1);
    }
    return result;
  },

  shuffle: function (array) {
    return array.sort(() => Math.random() - 0.5);
  },
};
