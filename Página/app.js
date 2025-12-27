// app.js - Funcionalidad compartida para Masterclass MPA

// Lógica de Acordeón (Usada en SOLID)
// Lógica de Acordeón (Compatible con Tailwind Layout)
function toggleAccordion(button) {
  // Buscamos el contenido hermano inmediatamente siguiente
  const content = button.nextElementSibling;

  if (content && content.classList.contains("accordion-content")) {
    content.classList.toggle("active");

    // Rotar ícono si existe
    const icon = button.querySelector(".fa-chevron-down");
    if (icon) {
      icon.style.transform = content.classList.contains("active")
        ? "rotate(180deg)"
        : "rotate(0deg)";
    }
  }
}

// Lógica de Tabs de Código
function switchTab(btn, contentId) {
  const parent = btn.closest(".code-playground");

  // Desactivar todos los botones y contenidos de este bloque
  parent.querySelectorAll(".tab-btn").forEach((b) => {
    b.classList.remove("active");
    b.classList.remove("border-b-2"); // Tailwind styles removal if added
    b.style.color = ""; // Reset inline colors if any
  });
  parent
    .querySelectorAll(".code-display")
    .forEach((c) => c.classList.remove("active"));

  // Activar el seleccionado
  btn.classList.add("active");
  const targetContent = document.getElementById(contentId);
  if (targetContent) {
    targetContent.classList.add("active");
  }
}

// Resaltado de Navegación
document.addEventListener("DOMContentLoaded", () => {
  // Obtenemos el nombre del archivo actual (ej: solid.html)
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  // Buscamos enlaces en el navbar que apunten a este archivo
  document.querySelectorAll("nav a").forEach((link) => {
    const href = link.getAttribute("href");

    // Logica simple de coincidencia
    if (href === currentPath) {
      // Ya tienen estilos inline o clases Tailwind para 'active' hardcoded en el HTML
      // Pero si quisiéramos añadir algo extra dinámicamente:
      // link.classList.add("text-white");
    }
  });
});
