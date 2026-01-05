// Mode: Typing (Speed Type)
window.Modes.Typing = {
  init: function (container, dataPool, onComplete) {
    this.container = container;
    this.onComplete = onComplete;

    this.item = this.getRandomItem(dataPool);

    this.render();
  },

  render: function () {
    this.container.innerHTML = `
            <div class="question-text">"${this.item.def}"</div>
            <div style="font-size: 0.9rem; color: #aaa; margin-bottom: 1rem;">Escribe el término exacto:</div>
            <input type="text" class="typing-input" placeholder="Escribe aquí..." autocomplete="off">
        `;

    const input = this.container.querySelector("input");
    input.focus();

    input.addEventListener("input", (e) => {
      if (e.target.value.toLowerCase() === this.item.term.toLowerCase()) {
        e.target.style.borderColor = "#22c55e";
        e.target.disabled = true;
        setTimeout(() => this.onComplete(120), 500);
      }
    });

    // Give up Enter
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (e.target.value.toLowerCase() !== this.item.term.toLowerCase()) {
          // Show answer
          e.target.value = this.item.term;
          e.target.style.borderColor = "#ef4444";
          setTimeout(() => this.onComplete(-10), 1500);
        }
      }
    });
  },

  getRandomItem: function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
};
