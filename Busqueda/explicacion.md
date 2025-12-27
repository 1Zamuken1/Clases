# 📚 TEMA 4: BÚSQUEDAS (LINEAL Y BINARIA)

## 1️⃣ EXPLICACIÓN DEL TEMA

### ¿Qué son los algoritmos de búsqueda?

Los algoritmos de búsqueda nos permiten encontrar un elemento específico dentro de una colección de datos. Hay dos enfoques principales:

---

## Búsqueda Lineal (Sequential Search)

Recorre todos los elementos uno por uno hasta encontrar el buscado.

### Visualización:
```
Buscar: 7
Array: [3, 1, 7, 9, 2]
        ↑  ↑  ✓
        1  2  3 comparaciones → Encontrado!
```

### Características:

- Funciona con datos ordenados y desordenados
- Complejidad: O(n) - en el peor caso revisa todos
- Simple de implementar

---

## Búsqueda Binaria (Binary Search)

Divide el espacio de búsqueda a la mitad en cada paso. **Requiere datos ordenados**.

### Visualización:
```
Buscar: 7
Array ordenado: [1, 3, 5, 7, 9, 11, 13]
                        ↑
                      medio
                7 < medio? → buscar izquierda
                7 > medio? → buscar derecha
```

### Características:

- Solo funciona con datos ordenados
- Complejidad: O(log n) - mucho más rápido
- Más complejo de implementar

---

## Comparación:

| Aspecto          | Lineal                     | Binaria                |
|------------------|----------------------------|------------------------|
| Datos ordenados  | No necesario               | Obligatorio            |
| Complejidad      | O(n)                       | O(log n)               |
| Mejor caso       | O(1)                       | O(1)                   |
| Peor caso        | O(n)                       | O(log n)               |
| Uso              | Listas pequeñas/desordenadas | Listas grandes ordenadas |

---

## Ejemplo de diferencia:

**Array con 1,000,000 elementos:**

**Búsqueda Lineal:**
- Peor caso: 1,000,000 comparaciones

**Búsqueda Binaria:**
- Peor caso: 20 comparaciones (log₂(1,000,000) ≈ 20)

---

## 3️⃣ EJERCICIO PRINCIPAL: SISTEMA DE BÚSQUEDA DE PRODUCTOS

### **ENUNCIADO:**

Construye un sistema para buscar productos en un inventario. El sistema debe:

1. **Buscar por ID** usando búsqueda lineal (inventario desordenado)
2. **Buscar por precio** usando búsqueda binaria (precios ordenados)
3. **Comparar rendimiento** entre ambos métodos
4. **Buscar por nombre** (búsqueda lineal con coincidencia parcial)

---

## 4️⃣ ESTRUCTURA DE ARCHIVOS
```
proyecto/
├── Main.java
├── modelo/
│   └── Producto.java
├── servicio/
│   └── BusquedaService.java
├── util/
│   └── InputUtil.java
└── vista/
    └── MenuConsola.java
```

---

## 6️⃣ CUÁNDO USAR CADA BÚSQUEDA

### Usa Búsqueda Lineal cuando:

* Los datos NO están ordenados
* La lista es pequeña (< 100 elementos)
* Solo harás pocas búsquedas
* Necesitas buscar por coincidencia parcial

### Usa Búsqueda Binaria cuando:

* Los datos ESTÁN ordenados (o puedes ordenarlos)
* La lista es grande (> 1000 elementos)
* Harás muchas búsquedas
* Necesitas velocidad