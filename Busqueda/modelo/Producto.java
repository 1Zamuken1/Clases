package Busqueda.modelo;

/**
 * Representa un producto en el inventario.
 */
public class Producto {
    private int id;
    private String nombre;
    private double precio;
    private int stock;
    
    public Producto(int id, String nombre, double precio, int stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
    
    public int getId() {
        return id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public double getPrecio() {
        return precio;
    }
    
    public int getStock() {
        return stock;
    }
    
    @Override
    public String toString() {
        return String.format("ID: %d | %-20s | $%-8.2f | Stock: %d", 
            id, nombre, precio, stock);
    }
}