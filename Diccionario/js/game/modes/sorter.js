// Mode: Category Sorter (Left/Right)
window.Modes.CategorySorter = {
  init: function (container, dataPool, onComplete) {
    this.container = container;
    this.onComplete = onComplete;
    this.dataPool = dataPool;

    // Pick 2 Distinct Categories
    const cats = {};
    dataPool.forEach((i) => {
      let c = i.category || "general";
      // Normalize
      if (c === "basic") c = "basicos";
      if (!cats[c]) cats[c] = [];
      cats[c].push(i);
    });

    const keys = Object.keys(cats).filter((k) => cats[k].length >= 3);

    if (keys.length < 2) {
      // Fallback: Use 'basicos' and 'No basicos' logic if categories are scant
      this.catLeft = "basicos";
      this.catRight = "general"; // or 'arquitectura' etc

      // If really not enough, auto skip
      if (keys.length === 0) {
        this.onComplete(10);
        return;
      }
    } else {
      this.catLeft = keys[0];
      this.catRight = keys[1];
    }

    this.items = [];
    this.items.push(...this.getRandomSubarray(cats[this.catLeft] || [], 5));
    this.items.push(...this.getRandomSubarray(cats[this.catRight] || [], 5));
    this.items = this.shuffle(this.items);

    this.currentItemIdx = 0;
    this.score = 0;

    this.render();
    this.spawnItem();
    this.bindKeys();
  },

  render: function () {
    this.container.innerHTML = `
            <div class="question-text">Clasifica el término (Flechas &#8592; / &#8594;)</div>
            <div class="sorter-scene">
                <div class="sorter-bucket left" id="bucketLeft">${this.formatCat(
                  this.catLeft
                )}</div>
                <div class="sorter-bucket right" id="bucketRight">${this.formatCat(
                  this.catRight
                )}</div>
                <div id="fallingArea"></div>
            </div>
            <div style="text-align:center; color:#888; margin-top: -1.5rem">Usa teclado o toca los cubos</div>
        `;

    // Touch/Click support
    this.container
      .querySelector("#bucketLeft")
      .addEventListener("click", () => this.handleInput("left"));
    this.container
      .querySelector("#bucketRight")
      .addEventListener("click", () => this.handleInput("right"));
  },

  spawnItem: function () {
    if (this.currentItemIdx >= this.items.length) {
      setTimeout(() => this.onComplete(this.score), 500);
      return;
    }

    const item = this.items[this.currentItemIdx];
    const area = document.getElementById("fallingArea");
    area.innerHTML = `<div class="falling-item" id="activeItem">${item.term}</div>`;

    // Animation CSS handled manually for position needed?
    // Or just static centered for now waiting for input?
    // Let's make it static waiting for input to be simpler/responsive
    // "Falling" implies sorting.
  },

  handleInput: function (dir) {
    if (this.currentItemIdx >= this.items.length) return;

    const item = this.items[this.currentItemIdx];
    // Determine category of item
    let itemCat = item.category || "general";
    if (itemCat === "basic") itemCat = "basicos";

    const correctDir =
      itemCat === this.catLeft
        ? "left"
        : itemCat === this.catRight
        ? "right"
        : null;

    // If item belongs to neither? (Shouldn't happen with our setup)
    // Actually, if we pull randoms from window, might have issues.
    // But we pulled specifically from cats[keys]. So it matches.

    const el = document.getElementById("activeItem");
    const bucket = document.getElementById(
      dir === "left" ? "bucketLeft" : "bucketRight"
    );

    bucket.classList.add("active");
    setTimeout(() => bucket.classList.remove("active"), 200);

    if (dir === correctDir) {
      el.style.backgroundColor = "rgba(34, 197, 94, 0.5)";
      el.style.transform = `translateX(${
        dir === "left" ? "-150px" : "150px"
      }) translateY(200px) scale(0)`;
      el.style.opacity = "0";
      this.score += 20;
    } else {
      el.style.backgroundColor = "rgba(239, 68, 68, 0.5)";
      el.style.transform = `translateX(${
        dir === "left" ? "-150px" : "150px"
      }) translateY(200px) rotate(45deg)`;
      el.style.opacity = "0";
      this.score -= 10;
    }

    // Next
    this.currentItemIdx++;
    setTimeout(() => this.spawnItem(), 300);
  },

  bindKeys: function () {
    this.keyHandler = (e) => {
      if (e.key === "ArrowLeft") this.handleInput("left");
      if (e.key === "ArrowRight") this.handleInput("right");
    };
    // Remove old if any to prevent dupes (though init creates new obj usually)
    document.removeEventListener("keydown", this.keyHandler); // Won't work without ref.
    // Just add, remove on exit logic is missing in engine.
    // For prototype, add once.
    // Ideally Engine cleans up.
    // We'll attach to container if possible or doc.
    document.addEventListener("keydown", this.keyHandler, { once: false });
  },

  getRandomSubarray: function (arr, size) {
    if (!arr) return [];
    return arr.sort(() => Math.random() - 0.5).slice(0, size);
  },

  shuffle: function (array) {
    return array.sort(() => Math.random() - 0.5);
  },

  formatCat: function (slug) {
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  },
};
