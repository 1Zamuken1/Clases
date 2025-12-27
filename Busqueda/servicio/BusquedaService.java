package Busqueda.servicio;

import Busqueda.modelo.Producto;
import java.util.*;

/**
 * Servicio que implementa algoritmos de busqueda.
 */
public class BusquedaService {
    private List<Producto> inventario;
    private int comparacionesRealizadas;
    
    public BusquedaService() {
        this.inventario = new ArrayList<>();
        cargarInventarioInicial();
    }
    
    private void cargarInventarioInicial() {
        inventario.add(new Producto(105, "Laptop HP", 850.00, 15));
        inventario.add(new Producto(203, "Mouse Logitech", 25.50, 50));
        inventario.add(new Producto(101, "Teclado Mecanico", 120.00, 30));
        inventario.add(new Producto(307, "Monitor Samsung", 320.00, 20));
        inventario.add(new Producto(450, "Auriculares Sony", 95.00, 40));
        inventario.add(new Producto(112, "Webcam HD", 75.00, 25));
        inventario.add(new Producto(289, "SSD 500GB", 180.00, 35));
        inventario.add(new Producto(156, "Memoria RAM 16GB", 140.00, 45));
    }
    
    /**
     * BUSQUEDA LINEAL: Busca producto por ID.
     * Complejidad: O(n)
     */
    public Producto buscarPorIdLineal(int id) {
        comparacionesRealizadas = 0;
        
        System.out.println("Iniciando busqueda lineal por ID: " + id);
        System.out.println();
        
        for (int i = 0; i < inventario.size(); i++) {
            comparacionesRealizadas++;
            Producto producto = inventario.get(i);
            
            System.out.println("Comparacion " + comparacionesRealizadas + 
                ": ID " + producto.getId() + 
                (producto.getId() == id ? " - ENCONTRADO" : ""));
            
            if (producto.getId() == id) {
                return producto;
            }
        }
        
        System.out.println("No encontrado");
        return null;
    }
    
    /**
     * BUSQUEDA BINARIA: Busca producto por precio.
     * Requiere lista ordenada por precio.
     * Complejidad: O(log n)
     */
    public Producto buscarPorPrecioBinaria(double precioObjetivo) {
        comparacionesRealizadas = 0;
        
        // Ordenar por precio primero
        List<Producto> ordenados = new ArrayList<>(inventario);
        ordenados.sort(Comparator.comparingDouble(Producto::getPrecio));
        
        System.out.println("Iniciando busqueda binaria por precio: $" + precioObjetivo);
        System.out.println("Lista ordenada por precio");
        System.out.println();
        
        int inicio = 0;
        int fin = ordenados.size() - 1;
        
        while (inicio <= fin) {
            comparacionesRealizadas++;
            int medio = inicio + (fin - inicio) / 2;
            Producto productoMedio = ordenados.get(medio);
            
            System.out.println("Comparacion " + comparacionesRealizadas + ":");
            System.out.println("  Rango: [" + inicio + ", " + fin + "]");
            System.out.println("  Medio: posicion " + medio + 
                " - " + productoMedio.getNombre() + " ($" + 
                productoMedio.getPrecio() + ")");
            
            if (Math.abs(productoMedio.getPrecio() - precioObjetivo) < 0.01) {
                System.out.println("  ENCONTRADO");
                return productoMedio;
            }
            
            if (productoMedio.getPrecio() < precioObjetivo) {
                System.out.println("  Precio menor, buscar en mitad derecha");
                inicio = medio + 1;
            } else {
                System.out.println("  Precio mayor, buscar en mitad izquierda");
                fin = medio - 1;
            }
            System.out.println();
        }
        
        System.out.println("No encontrado");
        return null;
    }
    
    /**
     * BUSQUEDA LINEAL: Busca por nombre (coincidencia parcial).
     */
    public List<Producto> buscarPorNombre(String nombre) {
        List<Producto> resultados = new ArrayList<>();
        comparacionesRealizadas = 0;
        
        System.out.println("Buscando productos que contengan: '" + nombre + "'");
        System.out.println();
        
        for (Producto producto : inventario) {
            comparacionesRealizadas++;
            if (producto.getNombre().toLowerCase()
                    .contains(nombre.toLowerCase())) {
                System.out.println("Encontrado: " + producto.getNombre());
                resultados.add(producto);
            }
        }
        
        return resultados;
    }
    
    /**
     * Compara rendimiento entre busqueda lineal y binaria.
     */
    public void compararRendimiento(int id) {
        System.out.println("=== COMPARACION DE RENDIMIENTO ===");
        System.out.println("Buscando producto con ID: " + id);
        System.out.println();
        
        // Busqueda lineal
        System.out.println("1. BUSQUEDA LINEAL:");
        long inicioLineal = System.nanoTime();
        Producto resultadoLineal = buscarPorIdLineal(id);
        long finLineal = System.nanoTime();
        int comparacionesLineal = comparacionesRealizadas;
        
        System.out.println();
        
        // Busqueda binaria (requiere ordenar primero)
        System.out.println("2. BUSQUEDA BINARIA:");
        System.out.println("Ordenando lista por ID...");
        List<Producto> ordenados = new ArrayList<>(inventario);
        ordenados.sort(Comparator.comparingInt(Producto::getId));
        
        long inicioBinaria = System.nanoTime();
        Producto resultadoBinaria = buscarBinarioPorId(ordenados, id);
        long finBinaria = System.nanoTime();
        int comparacionesBinaria = comparacionesRealizadas;
        
        System.out.println();
        System.out.println("=== RESULTADOS ===");
        System.out.println("Busqueda Lineal:  " + comparacionesLineal + " comparaciones | " +
            (finLineal - inicioLineal) + " ns");
        System.out.println("Busqueda Binaria: " + comparacionesBinaria + " comparaciones | " +
            (finBinaria - inicioBinaria) + " ns");
    }
    
    private Producto buscarBinarioPorId(List<Producto> ordenados, int id) {
        comparacionesRealizadas = 0;
        int inicio = 0;
        int fin = ordenados.size() - 1;
        
        while (inicio <= fin) {
            comparacionesRealizadas++;
            int medio = inicio + (fin - inicio) / 2;
            Producto productoMedio = ordenados.get(medio);
            
            System.out.println("Comparacion " + comparacionesRealizadas + 
                ": ID " + productoMedio.getId() +
                (productoMedio.getId() == id ? " - ENCONTRADO" : ""));
            
            if (productoMedio.getId() == id) {
                return productoMedio;
            }
            
            if (productoMedio.getId() < id) {
                inicio = medio + 1;
            } else {
                fin = medio - 1;
            }
        }
        
        return null;
    }
    
    public void listarTodos() {
        System.out.println("\n=== INVENTARIO COMPLETO ===\n");
        for (int i = 0; i < inventario.size(); i++) {
            System.out.println((i + 1) + ". " + inventario.get(i));
        }
        System.out.println("\nTotal: " + inventario.size() + " productos");
    }
    
    public int getComparacionesRealizadas() {
        return comparacionesRealizadas;
    }
}