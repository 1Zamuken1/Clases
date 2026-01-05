// Mode: Quiz (Multiple Choice)
// Namespace: window.Modes.Quiz

window.Modes.Quiz = {
  init: function (container, dataPool, onComplete) {
    this.container = container;
    this.dataPool = dataPool;
    this.onComplete = onComplete;

    this.render();
  },

  render: function () {
    // Pick 1 correct, 3 distractors
    const correct = this.getRandomItem(this.dataPool);
    const distractors = this.getDistractors(correct, 3);

    // Shuffle options
    const options = this.shuffle([correct, ...distractors]);

    this.container.innerHTML = `
            <div class="question-text">
                "${correct.def}"
            </div>
            <div class="options-grid">
                ${options
                  .map(
                    (opt) => `
                    <button class="option-btn" data-term="${opt.term}">
                        ${opt.term}
                    </button>
                `
                  )
                  .join("")}
            </div>
        `;

    // Bind events
    const buttons = this.container.querySelectorAll(".option-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) =>
        this.checkAnswer(e.target, correct.term)
      );
    });
  },

  checkAnswer: function (target, correctTerm) {
    const selected = target.dataset.term;
    const isCorrect = selected === correctTerm;

    // Visual Feedback
    if (isCorrect) {
      target.classList.add("correct");
    } else {
      target.classList.add("wrong");
      // Highlight correct one
      const correctBtn = Array.from(
        this.container.querySelectorAll(".option-btn")
      ).find((b) => b.dataset.term === correctTerm);
      if (correctBtn) correctBtn.classList.add("correct");
    }

    // Delay then Callback
    setTimeout(() => {
      this.onComplete(isCorrect ? 100 : -20);
    }, 800);
  },

  // Helpers
  getRandomItem: function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  getDistractors: function (correctItem, count) {
    // Filter out correct item to avoid duplicate
    const pool = this.dataPool.filter((i) => i.term !== correctItem.term);
    const distractors = [];

    for (let i = 0; i < count; i++) {
      if (pool.length === 0) break;
      const index = Math.floor(Math.random() * pool.length);
      distractors.push(pool[index]);
      // Remove to avoid duplicates in distractors
      pool.splice(index, 1);
    }
    return distractors;
  },

  shuffle: function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },
};
