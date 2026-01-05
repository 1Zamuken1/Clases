// Mode: Binary (True or False)
// Namespace: window.Modes.Binary

window.Modes.Binary = {
  init: function (container, dataPool, onComplete) {
    this.container = container;
    this.dataPool = dataPool;
    this.onComplete = onComplete;

    this.render();
  },

  render: function () {
    // 50% chance of being correct
    const isTrue = Math.random() > 0.5;

    const mainItem = this.getRandomItem(this.dataPool);
    let definitionToShow = mainItem.def;

    if (!isTrue) {
      // Find a different definition
      const otherItem = this.getRandomItem(
        this.dataPool.filter((i) => i.term !== mainItem.term)
      );
      definitionToShow = otherItem.def;
    }

    this.container.innerHTML = `
            <div class="term-display">${mainItem.term}</div>
            <div class="question-text">
                "${definitionToShow}"
            </div>
            <div class="binary-actions">
                <button class="binary-btn btn-true" data-val="true">VERDADERO</button>
                <button class="binary-btn btn-false" data-val="false">FALSO</button>
            </div>
        `;

    // Bind events
    this.container
      .querySelector(".btn-true")
      .addEventListener("click", () => this.checkAnswer(true, isTrue));
    this.container
      .querySelector(".btn-false")
      .addEventListener("click", () => this.checkAnswer(false, isTrue));
  },

  checkAnswer: function (userChoice, actualTruth) {
    const isCorrect = userChoice === actualTruth;

    // Minimal visual feedback (maybe screen flash? keeping it simple for now)
    const feedbackColor = isCorrect
      ? "rgba(34, 197, 94, 0.3)"
      : "rgba(239, 68, 68, 0.3)";
    this.container.style.backgroundColor = feedbackColor;

    setTimeout(() => {
      this.container.style.backgroundColor = ""; // Reset
      this.onComplete(isCorrect ? 80 : -10);
    }, 400); // Faster transition for binary mode
  },

  getRandomItem: function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
};
