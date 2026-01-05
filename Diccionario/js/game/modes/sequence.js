// Mode: Sequence Check (Memory Order)
window.Modes.Sequence = {
  init: function (container, dataPool, onComplete) {
    this.container = container;
    this.onComplete = onComplete;

    // Pick 5 random terms
    this.sequence = this.getRandomSubarray(dataPool, 5);
    this.userSequence = [];

    this.renderPhase1();
  },

  renderPhase1: function () {
    this.container.innerHTML = `
            <div class="question-text">Memoriza el orden (5 segundos)</div>
            <div class="seq-display" id="seqDisplay">
                ${this.sequence
                  .map((i) => `<div class="seq-item">${i.term}</div>`)
                  .join("")}
            </div>
        `;

    // Timer bar?
    setTimeout(() => {
      this.renderPhase2();
    }, 5000);
  },

  renderPhase2: function () {
    // Shuffle for input
    const options = this.shuffle([...this.sequence]);

    this.container.innerHTML = `
            <div class="question-text">Reconstruye la secuencia</div>
            <div class="seq-display" id="userSeqDisplay" style="min-height: 60px; border-bottom: 2px dashed #444;">
                <!-- Filled by user -->
            </div>
            <div class="seq-input-area">
                ${options
                  .map(
                    (i) =>
                      `<button class="option-btn seq-opt" data-id="${i.term}">${i.term}</button>`
                  )
                  .join("")}
            </div>
        `;

    this.container.querySelectorAll(".seq-opt").forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleInput(e.target));
    });
  },

  handleInput: function (btn) {
    const term = btn.dataset.id;
    this.userSequence.push(term);

    // Move visual
    btn.style.opacity = "0";
    btn.disabled = true;

    const slot = document.createElement("div");
    slot.className = "seq-item";
    slot.textContent = term;
    document.getElementById("userSeqDisplay").appendChild(slot);

    if (this.userSequence.length === this.sequence.length) {
      this.checkResult();
    }
  },

  checkResult: function () {
    let correct = true;
    for (let i = 0; i < this.sequence.length; i++) {
      if (this.sequence[i].term !== this.userSequence[i]) {
        correct = false;
        break;
      }
    }

    const display = document.getElementById("userSeqDisplay");
    display.style.backgroundColor = correct
      ? "rgba(34, 197, 94, 0.2)"
      : "rgba(239, 68, 68, 0.2)";

    setTimeout(() => {
      this.onComplete(correct ? 250 : 0);
    }, 1000);
  },

  getRandomSubarray: function (arr, size) {
    return arr.sort(() => Math.random() - 0.5).slice(0, size);
  },

  shuffle: function (array) {
    return array.sort(() => Math.random() - 0.5);
  },
};
