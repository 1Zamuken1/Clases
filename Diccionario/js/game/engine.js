// Game Engine: The Director

window.GameEngine = {
  // Data & State
  allConcepts: [],
  currentLevel: null,
  score: 0,
  timeLeft: 0,
  timerInterval: null,

  // Config
  LEVELS: [
    {
      id: "novice",
      name: "Hello World",
      desc: "Conceptos Básicos de Programación",
      icon: "🌱",
      filter: "basicos",
      modes: ["Quiz", "Binary", "Typing", "Flashcards", "Memory", "Sequence"], // Names must match window.Modes keys
      time: 60,
      targetScore: 1000,
    },
    {
      id: "frontend",
      name: "Frontend Warrior",
      desc: "HTML, Interfaz y General",
      icon: "🎨",
      filter: "general",
      modes: [
        "Quiz",
        "Binary",
        "Hangman",
        "Scramble",
        "WordSearch",
        "CategorySorter",
      ],
      time: 90,
      targetScore: 1500,
    },
    {
      id: "architect",
      name: "Master Architect",
      desc: "SOLID, Patrones y Estructuras",
      icon: "🏛️",
      filter: "solid|arquitectura", // Custom pipe logic
      modes: ["Quiz", "Match", "Typing", "OddOneOut", "WordSearch"], // Will add more modes later
      time: 120,
      targetScore: 2000,
    },
    {
      id: "survival",
      name: "Survival Mode",
      desc: "Modo Infinito - ¡Todo vale!",
      icon: "🔥",
      filter: "all",
      modes: [
        "Quiz",
        "Binary",
        "Hangman",
        "Match",
        "Scramble",
        "Typing",
        "Memory",
        "OddOneOut",
        "WordSearch",
      ],
      time: 999,
      targetScore: 5000,
    },
  ],

  init: function () {
    this.loadData();
    this.renderMenu();
    this.setupEventListeners();
    console.log("Game Engine Initialized");
  },

  loadData: function () {
    // Aggregate global data from separate files
    this.allConcepts = [
      ...(window.dataAE || []),
      ...(window.dataFJ || []),
      ...(window.dataKO || []),
      ...(window.dataPT || []),
      ...(window.dataUZ || []),
    ];
  },

  renderMenu: function () {
    const grid = document.getElementById("levelGrid");
    grid.innerHTML = "";

    this.LEVELS.forEach((level) => {
      const card = document.createElement("div");
      card.className = "level-card";
      card.innerHTML = `
                <span class="level-icon">${level.icon}</span>
                <h3 class="level-name">${level.name}</h3>
                <p class="level-desc">${level.desc}</p>
            `;
      card.addEventListener("click", () => this.startLevel(level));
      grid.appendChild(card);
    });
  },

  setupEventListeners: function () {
    document
      .getElementById("exitBtn")
      .addEventListener("click", () => this.showView("menu"));
    document
      .getElementById("menuBtn")
      .addEventListener("click", () => this.showView("menu"));
    document.getElementById("restartBtn").addEventListener("click", () => {
      if (this.currentLevel) this.startLevel(this.currentLevel);
    });
  },

  startLevel: function (level) {
    this.currentLevel = level;
    this.score = 0;
    this.timeLeft = level.time;
    this.updateHUD();
    this.showView("game");

    // Filter Data for this Level
    let levelData = [];
    if (level.filter === "all") {
      levelData = this.allConcepts;
    } else if (level.filter.includes("|")) {
      const filters = level.filter.split("|");
      levelData = this.allConcepts.filter(
        (c) =>
          filters.includes(c.category) ||
          (c.category === "basicos" && filters.includes("basic"))
      );
    } else {
      // Handle 'basic' vs 'basicos' mismatch if any, otherwise direct match
      levelData = this.allConcepts.filter(
        (c) =>
          c.category === level.filter ||
          (level.filter === "basicos" && c.category === "basic")
      );
      if (levelData.length < 5) {
        // Fallback: relax filter if too few items
        levelData = this.allConcepts.filter(
          (c) => c.category === level.filter || c.category === "general"
        );
      }
    }

    // Ensure we have data
    if (levelData.length === 0) levelData = this.allConcepts; // Fallback

    this.activePool = [...levelData];
    this.startTimer();
    this.nextRun();
  },

  nextRun: function () {
    // Check conditions
    if (this.timeLeft <= 0) {
      this.endGame();
      return;
    }

    // Pick Random Mode
    const modeName =
      this.currentLevel.modes[
        Math.floor(Math.random() * this.currentLevel.modes.length)
      ];
    const mode = window.Modes[modeName];

    if (mode) {
      mode.init(this.gameBoard, this.activePool, (points) =>
        this.handleResult(points)
      );
    } else {
      console.error("Mode not found:", modeName);
    }
  },

  handleResult: function (points) {
    if (points > 0) {
      this.score += points;
      // Visual feedback could go here
    } else {
      // Penalty?
      this.timeLeft -= 5; // Lose time on wrong answer
    }
    this.updateHUD();
    this.nextRun();
  },

  startTimer: function () {
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateHUD();
      if (this.timeLeft <= 0) {
        this.endGame();
      }
    }, 1000);
  },

  updateHUD: function () {
    document.getElementById("levelName").textContent = this.currentLevel
      ? this.currentLevel.name
      : "";
    document.getElementById("scoreValue").textContent = this.score;
    document.getElementById("timerValue").textContent = this.timeLeft + "s";
  },

  endGame: function () {
    clearInterval(this.timerInterval);
    document.getElementById("finalScore").textContent = this.score;

    // Dynamic message
    let msg = "¡Buen esfuerzo!";
    if (this.score > 1000) msg = "¡Increíble habilidad!";
    if (this.score > 2000) msg = "¡Nivel Dios del Código!";

    document.getElementById("resultMessage").textContent = msg;
    this.showView("result");
  },

  showView: function (viewName) {
    document.getElementById("menuView").classList.add("hidden");
    document.getElementById("gameView").classList.add("hidden");
    document.getElementById("resultView").classList.add("hidden");

    document.getElementById(viewName + "View").classList.remove("hidden");

    // Clean board if leaving game
    if (viewName !== "game") {
      document.getElementById("gameBoard").innerHTML = "";
      clearInterval(this.timerInterval);
    }
  },

  // Helper for modes to access board
  get gameBoard() {
    return document.getElementById("gameBoard");
  },
};

// Mode Namespace Container
window.Modes = {};
