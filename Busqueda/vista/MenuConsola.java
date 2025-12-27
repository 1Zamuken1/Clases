package Busqueda.vista;

import Busqueda.modelo.Producto;
import Busqueda.servicio.BusquedaService;
import Busqueda.util.InputUtil;
import java.util.List;

public class MenuConsola {
    private BusquedaService busquedaService;
    
    public MenuConsola() {
        this.busquedaService = new BusquedaService();
    }
    
    public void ejecutar() {
        boolean continuar = true;
        
        while (continuar) {
            mostrarMenu();
            int opcion = InputUtil.leerOpcionMenu("Seleccione una opcion: ", 1, 6);
            
            switch (opcion) {
                case 1 -> buscarPorId();
                case 2 -> buscarPorPrecio();
                case 3 -> buscarPorNombre();
                case 4 -> compararRendimiento();
                case 5 -> busquedaService.listarTodos();
                case 6 -> {
                    continuar = false;
                    System.out.println("\nGracias por usar el sistema. Hasta luego!");
                }
            }
            
            if (continuar) {
                InputUtil.pausar();
            }
        }
    }
    
    private void mostrarMenu() {
        limpiarPantalla();
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║   SISTEMA DE BUSQUEDA DE PRODUCTOS    ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println();
        System.out.println("1. Buscar por ID (busqueda lineal)");
        System.out.println("2. Buscar por precio (busqueda binaria)");
        System.out.println("3. Buscar por nombre");
        System.out.println("4. Comparar rendimiento");
        System.out.println("5. Listar todos los productos");
        System.out.println("6. Salir");
        System.out.println();
    }
    
    private void buscarPorId() {
        System.out.println("\n=== BUSCAR POR ID ===\n");
        
        int id = InputUtil.leerEntero("Ingrese ID del producto: ");
        System.out.println();
        
        Producto producto = busquedaService.buscarPorIdLineal(id);
        
        System.out.println();
        if (producto != null) {
            System.out.println("RESULTADO:");
            System.out.println(producto);
        } else {
            System.out.println("Producto no encontrado");
        }
        
        System.out.println("\nComparaciones realizadas: " + 
            busquedaService.getComparacionesRealizadas());
    }
    
    private void buscarPorPrecio() {
        System.out.println("\n=== BUSCAR POR PRECIO ===\n");
        
        double precio = InputUtil.leerDecimal("Ingrese precio a buscar: $");
        System.out.println();
        
        Producto producto = busquedaService.buscarPorPrecioBinaria(precio);
        
        System.out.println();
        if (producto != null) {
            System.out.println("RESULTADO:");
            System.out.println(producto);
        } else {
            System.out.println("Producto con ese precio no encontrado");
        }
        
        System.out.println("\nComparaciones realizadas: " + 
            busquedaService.getComparacionesRealizadas());
    }
    
    private void buscarPorNombre() {
        System.out.println("\n=== BUSCAR POR NOMBRE ===\n");
        
        String nombre = InputUtil.leerTexto("Ingrese nombre a buscar: ");
        System.out.println();
        
        List<Producto> resultados = busquedaService.buscarPorNombre(nombre);
        
        System.out.println();
        if (resultados.isEmpty()) {
            System.out.println("No se encontraron productos");
        } else {
            System.out.println("RESULTADOS:");
            for (int i = 0; i < resultados.size(); i++) {
                System.out.println((i + 1) + ". " + resultados.get(i));
            }
        }
        
        System.out.println("\nComparaciones realizadas: " + 
            busquedaService.getComparacionesRealizadas());
    }
    
    private void compararRendimiento() {
        System.out.println("\n=== COMPARAR RENDIMIENTO ===\n");
        
        int id = InputUtil.leerEntero("Ingrese ID a buscar: ");
        System.out.println();
        
        busquedaService.compararRendimiento(id);
    }
    
    private void limpiarPantalla() {
        System.out.print("\033[H\033[2J");
        System.out.flush();
    }
}