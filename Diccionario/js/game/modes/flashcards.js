// Mode: Flashcards (Study)
window.Modes.Flashcards = {
  init: function (container, dataPool, onComplete) {
    this.container = container;
    this.onComplete = onComplete;
    this.item = this.getRandomItem(dataPool);
    this.render();
  },

  render: function () {
    this.container.innerHTML = `
            <div class="flashcard-scene">
                <div class="flashcard">
                    <div class="card-face front">
                        ${this.item.term}
                    </div>
                    <div class="card-face back">
                        ${this.item.def}
                    </div>
                </div>
            </div>
            <div class="question-text" style="font-size: 1rem; margin-top: 1rem; color: #aaa;">Haz clic para girar</div>
            <div class="flash-controls">
                <button class="option-btn" style="background:rgba(239, 68, 68, 0.2); border-color:#ef4444" id="failBtn">Repasar</button>
                <button class="option-btn" style="background:rgba(34, 197, 94, 0.2); border-color:#22c55e" id="okBtn">Lo sabía</button>
            </div>
        `;

    const card = this.container.querySelector(".flashcard");
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });

    this.container.querySelector("#failBtn").addEventListener("click", (e) => {
      e.stopPropagation(); // prevent flip if clicking button
      this.onComplete(0); // No points but continue
    });

    this.container.querySelector("#okBtn").addEventListener("click", (e) => {
      e.stopPropagation();
      this.onComplete(50); // Points for studying
    });
  },

  getRandomItem: function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
};
