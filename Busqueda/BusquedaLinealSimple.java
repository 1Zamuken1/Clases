package Busqueda;

public class BusquedaLinealSimple {
    /*
    * Buscar un elemento en un array
    * Retornar el índice del elemento si se encuentra, de lo contrario retornar -1
    */

    public static int busquedaLineal(int[] array, int buscado){
        System.out.println("Buscando: " + buscado);
        for (int i = 0; i < array.length; i++){
            System.out.println("Posición: " + i + ": " + array[i] + (array[i] == buscado ? " <-- Encontrado" : ""));

            if (array[i] == buscado){
                return i;
            }
        }

        System.out.println("No encontrado");
        return -1;
    }

    public static void main(String[] args){
        int[] numeros = {15, 3, 8, 12, 7, 20, 9};
        System.out.println("Array: ");
        for (int i = 0; i < numeros.length; i++){
             System.out.print(numeros[i] + " ");
        }
        System.out.println("");

        int buscado = 12;
        int indice = busquedaLineal(numeros, buscado);

        System.out.println("");
        if (indice != -1) {
            System.out.println("Resultado: Encontrado en posicion " + indice);
            System.out.println("Comparaciones realizadas: " + (indice + 1));
        } else{
            System.out.println("Resultado: No encontrado");
            System.out.println("Comparaciones realizadas: " + numeros.length);
        }
    }
}
