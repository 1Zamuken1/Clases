// Mode: Word Search (Sopa de Letras)
window.Modes.WordSearch = {
  init: function (container, dataPool, onComplete) {
    this.container = container;
    this.onComplete = onComplete;

    // Config
    this.gridSize = 10;
    this.wordsToFind = 3;

    // Pick 3 short words (less than grid size)
    const candidates = dataPool.filter(
      (i) => i.term.length <= 8 && /^[a-zA-Z]+$/.test(i.term)
    );
    this.targets = this.shuffle(candidates)
      .slice(0, this.wordsToFind)
      .map((i) => i.term.toUpperCase());

    this.grid = this.generateGrid();
    this.found = new Set();
    this.selection = []; // Cells being dragged

    this.render();
  },

  generateGrid: function () {
    // Create Empty Grid
    let grid = Array(this.gridSize)
      .fill()
      .map(() => Array(this.gridSize).fill(""));

    // Place Words
    this.targets.forEach((word) => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 50) {
        const dir = Math.random() > 0.5 ? "H" : "V"; // Horizontal or Vertical
        const row = Math.floor(Math.random() * this.gridSize);
        const col = Math.floor(Math.random() * this.gridSize);

        if (this.canPlace(grid, word, row, col, dir)) {
          this.place(grid, word, row, col, dir);
          placed = true;
        }
        attempts++;
      }
    });

    // Fill empty
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let r = 0; r < this.gridSize; r++) {
      for (let c = 0; c < this.gridSize; c++) {
        if (grid[r][c] === "")
          grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
    return grid;
  },

  canPlace: function (grid, word, row, col, dir) {
    if (dir === "H" && col + word.length > this.gridSize) return false;
    if (dir === "V" && row + word.length > this.gridSize) return false;

    for (let i = 0; i < word.length; i++) {
      const r = dir === "V" ? row + i : row;
      const c = dir === "H" ? col + i : col;
      if (grid[r][c] !== "" && grid[r][c] !== word[i]) return false;
    }
    return true;
  },

  place: function (grid, word, row, col, dir) {
    for (let i = 0; i < word.length; i++) {
      const r = dir === "V" ? row + i : row;
      const c = dir === "H" ? col + i : col;
      grid[r][c] = word[i];
    }
  },

  render: function () {
    this.container.innerHTML = `
            <div class="question-text">Encuentra las palabras</div>
            <div class="ws-targets">
                ${this.targets
                  .map(
                    (t) =>
                      `<div class="ws-target-item" id="tgt-${t}">${t}</div>`
                  )
                  .join("")}
            </div>
            <div class="wordsearch-grid" 
                 style="grid-template-columns: repeat(${
                   this.gridSize
                 }, 30px); width: fit-content;">
                ${this.grid
                  .flatMap((row, r) =>
                    row.map(
                      (char, c) => `
                    <div class="ws-cell" data-r="${r}" data-c="${c}">${char}</div>
                `
                    )
                  )
                  .join("")}
            </div>
        `;

    this.bindEvents();
  },

  bindEvents: function () {
    const cells = this.container.querySelectorAll(".ws-cell");
    let isSelecting = false;
    let startCell = null;

    cells.forEach((cell) => {
      cell.addEventListener("mousedown", (e) => {
        isSelecting = true;
        startCell = {
          r: parseInt(e.target.dataset.r),
          c: parseInt(e.target.dataset.c),
        };
        this.updateSelection(startCell, startCell);
      });

      cell.addEventListener("mouseover", (e) => {
        if (isSelecting) {
          const current = {
            r: parseInt(e.target.dataset.r),
            c: parseInt(e.target.dataset.c),
          };
          this.updateSelection(startCell, current);
        }
      });

      cell.addEventListener("mouseup", () => {
        isSelecting = false;
        this.checkSelection();
        this.clearSelection();
      });
    });

    this.container.addEventListener("mouseleave", () => {
      isSelecting = false;
      this.clearSelection();
    });
  },

  updateSelection: function (start, end) {
    this.clearSelection();
    // Determine line logic selection (simple H or V)
    // ... (Simplified for brevity: only selecting if same row or col)

    let cellsToHighlight = [];
    if (start.r === end.r) {
      // Horizontal
      const min = Math.min(start.c, end.c);
      const max = Math.max(start.c, end.c);
      for (let c = min; c <= max; c++)
        cellsToHighlight.push({ r: start.r, c: c });
    } else if (start.c === end.c) {
      // Vertical
      const min = Math.min(start.r, end.r);
      const max = Math.max(start.r, end.r);
      for (let r = min; r <= max; r++)
        cellsToHighlight.push({ r: r, c: start.c });
    }

    this.currentWord = cellsToHighlight
      .map((pos) => this.grid[pos.r][pos.c])
      .join("");

    cellsToHighlight.forEach((pos) => {
      const cell = this.container.querySelector(
        `.ws-cell[data-r="${pos.r}"][data-c="${pos.c}"]`
      );
      if (cell) cell.classList.add("selected");
    });
  },

  checkSelection: function () {
    const word = this.currentWord;
    if (this.targets.includes(word) && !this.found.has(word)) {
      // Found!
      this.found.add(word);
      document.getElementById(`tgt-${word}`).classList.add("done");

      // Mark permanently on grid (requires logic update to keep class, simplified here)
      this.container
        .querySelectorAll(".selected")
        .forEach((c) => c.classList.add("found"));

      if (this.found.size === this.targets.length) {
        setTimeout(() => this.onComplete(200), 1000);
      }
    }
  },

  clearSelection: function () {
    this.container
      .querySelectorAll(".selected")
      .forEach((c) => c.classList.remove("selected"));
    this.currentWord = "";
  },

  shuffle: function (arr) {
    return arr.sort(() => Math.random() - 0.5);
  },
};
