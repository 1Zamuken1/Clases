// Mode: Scramble (Unscramble the word)
window.Modes.Scramble = {
  init: function (container, dataPool, onComplete) {
    this.container = container;
    this.onComplete = onComplete;

    this.item = this.getRandomItem(dataPool);
    this.shuffledName = this.shuffleString(this.item.term);

    this.render();
  },

  render: function () {
    this.container.innerHTML = `
            <div class="question-text">"${this.item.def}"</div>
            <div class="scramble-letters">
                <!-- Visual tiles -->
                ${this.shuffledName
                  .split("")
                  .map((char) => `<div class="letter-tile">${char}</div>`)
                  .join("")}
            </div>
            
            <div class="options-grid">
               ${this.getOptions(this.item.term)
                 .map((opt) => `<button class="option-btn">${opt}</button>`)
                 .join("")}
            </div>
        `;

    // It's actually a multiple choice but visually presented as scramble
    // Or should it be typing? Let's keep it multiple choice for 'which unscrambles to' logic or just matching.
    // Wait, Scramble is usually reordering. Let's simplify: Show scrambled, ask "What is this?" with multiple choice.

    this.container.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const text = e.target.textContent;
        if (text === this.item.term) {
          e.target.classList.add("correct");
          setTimeout(() => this.onComplete(100), 500);
        } else {
          e.target.classList.add("wrong");
          setTimeout(() => this.onComplete(-10), 500);
        }
      });
    });
  },

  getOptions: function (correct) {
    // Create 3 distractors
    // ... Logic to get distractors ...
    // Since I don't have access to full pool inside this specific render func easily without passing it,
    // I will just use a simpler check: Is this "Quiz" with a visual twist? Yes.
    // Actually, let's just create fake text distractors or random other terms.

    const distractors = [
      "Random 1",
      "Random 2",
      "Random 3", // Placeholder logic, improved below
    ];

    return [correct, ...distractors].sort(() => Math.random() - 0.5);
  },

  shuffleString: function (str) {
    return str
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  },

  getRandomItem: function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  // Override render to fix distractor logic properly using dataPool if passed or context
  // Ideally I'd use the same logic as Quiz but different visual.
  // Let's re-implement with proper pool access.
};

// Re-defining with correct logic
window.Modes.Scramble = {
  init: function (container, dataPool, onComplete) {
    this.container = container;
    this.dataPool = dataPool;
    this.onComplete = onComplete;

    this.item = this.getRandomItem(dataPool);
    this.shuffledName = this.shuffleString(this.item.term);

    this.render();
  },

  render: function () {
    const distractors = this.getDistractors(this.item, 3);
    const options = this.shuffleArray([this.item, ...distractors]);

    this.container.innerHTML = `
            <div class="question-text">Ordena las letras:</div>
            <div class="scramble-letters">
                ${this.shuffledName
                  .split("")
                  .map(
                    (char) =>
                      `<div class="letter-tile">${char.toUpperCase()}</div>`
                  )
                  .join("")}
            </div>
            <div style="margin-bottom: 1rem; color: #888;">Pista: ${this.item.def.substring(
              0,
              50
            )}...</div>
            
            <div class="options-grid">
               ${options
                 .map(
                   (opt) =>
                     `<button class="option-btn" data-answer="${opt.term}">${opt.term}</button>`
                 )
                 .join("")}
            </div>
        `;

    this.container.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const text = e.target.dataset.answer;
        if (text === this.item.term) {
          e.target.classList.add("correct");
          setTimeout(() => this.onComplete(100), 500);
        } else {
          e.target.classList.add("wrong");
          setTimeout(() => this.onComplete(-10), 500);
        }
      });
    });
  },

  getDistractors: function (correctItem, count) {
    const pool = this.dataPool.filter((i) => i.term !== correctItem.term);
    return pool.sort(() => Math.random() - 0.5).slice(0, count);
  },

  shuffleString: function (str) {
    if (str.length <= 1) return str;
    // Keep spaces
    return str
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  },

  shuffleArray: function (arr) {
    return arr.sort(() => Math.random() - 0.5);
  },

  getRandomItem: function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
};
