package Busqueda.util;

import java.util.Scanner;

public class InputUtil {
    private static final Scanner scanner = new Scanner(System.in);
    
    public static String leerTexto(String mensaje) {
        System.out.print(mensaje);
        return scanner.nextLine().trim();
    }
    
    public static int leerEntero(String mensaje) {
        int numero;
        while (true) {
            System.out.print(mensaje);
            try {
                numero = Integer.parseInt(scanner.nextLine().trim());
                return numero;
            } catch (NumberFormatException e) {
                System.out.println("Error: Debe ingresar un numero entero valido.");
            }
        }
    }
    
    public static double leerDecimal(String mensaje) {
        double numero;
        while (true) {
            System.out.print(mensaje);
            try {
                numero = Double.parseDouble(scanner.nextLine().trim());
                return numero;
            } catch (NumberFormatException e) {
                System.out.println("Error: Debe ingresar un numero valido.");
            }
        }
    }
    
    public static int leerOpcionMenu(String mensaje, int min, int max) {
        int opcion;
        while (true) {
            opcion = leerEntero(mensaje);
            if (opcion >= min && opcion <= max) {
                return opcion;
            }
            System.out.println("Error: Opcion invalida. Debe estar entre " + 
                min + " y " + max);
        }
    }
    
    public static void pausar() {
        System.out.println("\nPresione ENTER para continuar...");
        scanner.nextLine();
    }
}