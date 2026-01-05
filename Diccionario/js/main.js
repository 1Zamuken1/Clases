// Main Orchestrator (No Modules, purely Global Glue)

document.addEventListener("DOMContentLoaded", () => {
  // 1. Aggregate Data from Globals
  // window.dataAE, window.dataFJ, etc. are loaded by script tags
  const allConcepts = [
    ...(window.dataAE || []),
    ...(window.dataFJ || []),
    ...(window.dataKO || []),
    ...(window.dataPT || []),
    ...(window.dataUZ || []),
  ].sort((a, b) => a.term.localeCompare(b.term));

  // 2. Initialize UI
  window.UI.init();
  window.UI.renderGrid(allConcepts);

  // 3. Setup Events
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".tag-btn");
  let currentFilter = "all";

  // Search
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value;
    const filtered = window.Filter.filterData(
      allConcepts,
      query,
      currentFilter
    );
    window.UI.renderGrid(filtered);
  });

  // Filters
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // UI Toggle
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Logic Update
      currentFilter = btn.dataset.filter;
      const filtered = window.Filter.filterData(
        allConcepts,
        searchInput.value,
        currentFilter
      );
      window.UI.renderGrid(filtered);
    });
  });
});
