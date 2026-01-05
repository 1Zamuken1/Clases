// Mode: Memory (Pairs)
window.Modes.Memory = {
  init: function (container, dataPool, onComplete) {
    this.container = container;
    this.onComplete = onComplete;
    this.flipped = [];
    this.solved = 0;
    this.totalPairs = 6;

    // Pick 6 items
    const selected = this.getPairs(this.totalPairs, dataPool);

    // Create cards (Term + Def for each)
    let cards = [];
    selected.forEach((item) => {
      cards.push({ id: item.term, type: "term", content: item.term });
      cards.push({ id: item.term, type: "def", content: item.def }); // Short def?
    });

    this.cards = this.shuffle(cards);
    this.render();
  },

  render: function () {
    this.container.innerHTML = `
            <div class="memory-grid">
                ${this.cards
                  .map(
                    (c, i) => `
                    <div class="memory-card" data-idx="${i}" data-id="${c.id}">
                        <div class="mem-face mem-front">?</div>
                        <div class="mem-face mem-back" style="font-size: ${
                          c.type === "def" ? "1.1rem" : "1.8rem"
                        }">
                            ${
                              c.type === "def"
                                ? c.content.substring(0, 50) + "..."
                                : c.content
                            }
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;

    this.container.querySelectorAll(".memory-card").forEach((card) => {
      card.addEventListener("click", (e) => this.handleFlip(e.currentTarget));
    });
  },

  handleFlip: function (card) {
    if (card.classList.contains("flipped") || card.classList.contains("solved"))
      return;
    if (this.flipped.length >= 2) return;

    card.classList.add("flipped");
    this.flipped.push(card);

    if (this.flipped.length === 2) {
      this.checkMatch();
    }
  },

  checkMatch: function () {
    const [c1, c2] = this.flipped;
    const match = c1.dataset.id === c2.dataset.id;

    if (match) {
      c1.classList.add("solved");
      c2.classList.add("solved");
      this.solved++;
      this.flipped = [];
      if (this.solved === this.totalPairs) {
        setTimeout(() => this.onComplete(300), 1000);
      }
    } else {
      setTimeout(() => {
        c1.classList.remove("flipped");
        c2.classList.remove("flipped");
        this.flipped = [];
      }, 1000);
    }
  },

  getPairs: function (count, pool) {
    // Safe splice copy
    const copy = [...pool];
    const res = [];
    for (let i = 0; i < count; i++) {
      if (!copy.length) break;
      const idx = Math.floor(Math.random() * copy.length);
      res.push(copy[idx]);
      copy.splice(idx, 1);
    }
    return res;
  },

  shuffle: function (array) {
    return array.sort(() => Math.random() - 0.5);
  },
};
