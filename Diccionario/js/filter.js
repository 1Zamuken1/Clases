// Filter Logic: Pure functions for filtering (Global Namespace)

window.Filter = {
  filterData: function (data, query, activeFilter) {
    query = query.toLowerCase();

    return data.filter((concept) => {
      // 1. Text Search Match
      const matchesSearch =
        concept.term.toLowerCase().includes(query) ||
        concept.def.toLowerCase().includes(query);

      // 2. Category/Letter Match
      let matchesFilter = true;

      if (activeFilter !== "all") {
        if (
          ["basic", "solid", "arquitectura", "devops", "general"].includes(
            activeFilter
          )
        ) {
          // Topic Filter
          const dataCat = concept.category || "general";
          if (activeFilter === "basic") matchesFilter = dataCat === "basicos";
          else matchesFilter = dataCat === activeFilter;
        } else {
          // Letter Range Filter (A-E, etc)
          const [start, end] = activeFilter.split("-");
          const firstLetter = concept.term.charAt(0).toUpperCase();
          matchesFilter = firstLetter >= start && firstLetter <= end;
        }
      }

      return matchesSearch && matchesFilter;
    });
  },
};
