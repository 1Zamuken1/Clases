// Mode: Odd One Out (Encuentra al impostor)
window.Modes.OddOneOut = {
  init: function (container, dataPool, onComplete) {
    this.container = container;
    this.onComplete = onComplete;
    this.dataPool = dataPool;

    // Logic: Find 3 items of Category A and 1 of Category B
    // Need access to full pool potentially if current pool is homogeneous
    // We will try to find categories within the current pool first.

    this.setupRound();
  },

  setupRound: function () {
    // Group by category from the active pool
    const cats = {};
    this.dataPool.forEach((i) => {
      const c = i.category || "general";
      if (!cats[c]) cats[c] = [];
      cats[c].push(i);
    });

    const validCats = Object.keys(cats).filter((k) => cats[k].length >= 3);

    if (validCats.length === 0) {
      // Fallback if pool is too small or mono-category: Just pick randoms
      // This mode might not work well in filtered levels unless filters allow varied cats
      // For now, let's auto-win or fallback to Quiz
      console.warn("OddOneOut needs varied categories");
      this.onComplete(10); // Skip
      return;
    }

    // Major Category (3 items)
    const majorCat = validCats[Math.floor(Math.random() * validCats.length)];
    const majorItems = this.getRandomSubarray(cats[majorCat], 3);

    // Minor Category (1 item - The Impostor)
    // Pick a cat different from major
    const otherCats = Object.keys(cats).filter((k) => k !== majorCat);
    let minorItem;
    if (otherCats.length > 0) {
      const minorCat = otherCats[Math.floor(Math.random() * otherCats.length)];
      minorItem = cats[minorCat][0];
    } else {
      // Try to pull from global window if possible, or just fake it?
      // Let's assume there is at least 'general' and something else or similar.
      // If strictly one category, this mode is invalid.
      // Let's create a fake impostor manually? No, risky.
      // Fallback: Use definitions length? No.
      // Just duplicate logic: if no other category, pick any random item from pool that isn't in majorItems
      const remaining = this.dataPool.filter(
        (i) => !majorItems.includes(i) && i.category !== majorCat
      );
      if (remaining.length > 0) minorItem = remaining[0];
      else {
        this.onComplete(10); // Skip
        return;
      }
    }

    this.render(majorItems, minorItem);
  },

  render: function (group, impostor) {
    const options = this.shuffle([...group, impostor]);

    this.container.innerHTML = `
            <div class="question-text">¿Cuál NO encaja con el resto?</div>
            <div class="options-grid">
                ${options
                  .map(
                    (opt) => `
                    <button class="option-btn" data-id="${opt.term}">
                        ${opt.term} <br>
                        <small style="opacity:0.6; font-size:0.7em">${
                          opt.category?.toUpperCase() || "GENERAL"
                        }</small> <!-- Hint for now, maybe hide later -->
                    </button>
                `
                  )
                  .join("")}
            </div>
        `;

    // Note: Showing category makes it too easy?
    // Ideally player knows "Docker, K8s, Jenkins" are DevOps and "HTML" is Web.
    // Let's hide the hint or make it subtle. I'll remove the hint for difficulty.

    // Re-render without hint
    this.container.innerHTML = `
            <div class="question-text">¿Cuál NO encaja con el resto?</div>
            <div class="options-grid">
                ${options
                  .map(
                    (opt) => `
                    <button class="option-btn" data-id="${opt.term}">
                        ${opt.term}
                    </button>
                `
                  )
                  .join("")}
            </div>
        `;

    this.container.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (e.target.dataset.id === impostor.term) {
          e.target.classList.add("correct");
          setTimeout(() => this.onComplete(150), 600);
        } else {
          e.target.classList.add("wrong");
          setTimeout(() => this.onComplete(-20), 600);
        }
      });
    });
  },

  getRandomSubarray: function (arr, size) {
    return arr.sort(() => Math.random() - 0.5).slice(0, size);
  },

  shuffle: function (array) {
    return array.sort(() => Math.random() - 0.5);
  },
};
