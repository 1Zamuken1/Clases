// Mode: Hangman (Syntax Error)
window.Modes.Hangman = {
  init: function (container, dataPool, onComplete) {
    this.container = container;
    this.dataPool = dataPool;
    this.onComplete = onComplete;
    this.lives = 6;
    this.guessed = new Set();

    // Pick a term that is just letters (no complex symbols if possible)
    let item = this.getRandomItem(this.dataPool);

    // Sanitize: uppercase, keep simple
    this.targetTerm = item.term.toUpperCase();
    this.cleanTerm = this.targetTerm.replace(/[^A-Z]/g, ""); // For checking win
    this.definition = item.def;

    this.render();
  },

  render: function () {
    this.container.innerHTML = `
            <div class="hangman-container">
                <div class="hangman-lives">${"❤️".repeat(this.lives)}</div>
                <div class="question-text">"${this.definition}"</div>
                <div class="hangman-display" id="wordDisplay">${this.getDisplayWord()}</div>
                <div class="hangman-keyboard">
                    ${this.getKeyboard()}
                </div>
            </div>
        `;

    const buttons = this.container.querySelectorAll(".key-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleGuess(e.target));
    });
  },

  getDisplayWord: function () {
    return this.targetTerm
      .split("")
      .map((char) => {
        if (/[^A-Z]/.test(char)) return char; // Show spaces/symbols
        return this.guessed.has(char) ? char : "_";
      })
      .join(" ");
  },

  getKeyboard: function () {
    const alphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    return alphabet
      .split("")
      .map(
        (char) => `
            <button class="key-btn" data-char="${char}">${char}</button>
        `
      )
      .join("");
  },

  handleGuess: function (btn) {
    if (btn.disabled) return;
    const char = btn.dataset.char;
    btn.disabled = true;
    this.guessed.add(char);

    if (this.targetTerm.includes(char)) {
      btn.classList.add("correct");
      // Check Win
      const current = this.targetTerm
        .replace(/[^A-Z]/g, "")
        .split("")
        .every((c) => this.guessed.has(c));
      if (current) {
        this.updateDisplay();
        setTimeout(() => this.onComplete(150), 1000);
      } else {
        this.updateDisplay();
      }
    } else {
      btn.classList.add("wrong");
      this.lives--;
      this.renderLives();
      if (this.lives <= 0) {
        // Show word then fail
        this.guessed = new Set(this.cleanTerm.split("")); // Reveal all
        this.updateDisplay();
        setTimeout(() => this.onComplete(-10), 1500);
      }
    }
  },

  updateDisplay: function () {
    document.getElementById("wordDisplay").textContent = this.getDisplayWord();
  },

  renderLives: function () {
    this.container.querySelector(".hangman-lives").textContent =
      "❤️".repeat(this.lives) + "💀".repeat(6 - this.lives);
  },

  getRandomItem: function (arr) {
    // Filter for terms that aren't too long or weird
    const pool = arr.filter(
      (i) => i.term.length < 15 && /^[a-zA-ZñÑ\s]+$/.test(i.term)
    );
    return pool[Math.floor(Math.random() * pool.length)] || arr[0];
  },
};
