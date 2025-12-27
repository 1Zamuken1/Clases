public class CalculadoraDespues {
    
    enum Operacion {
        SUMA, RESTA, MULTIPLICACION, DIVISION
    }
    
    public static void main(String[] args) {
        double primerNumero = 10;
        double segundoNumero = 5;
        Operacion operacion = Operacion.MULTIPLICACION;
        
        double resultado = calcular(primerNumero, segundoNumero, operacion);
        mostrarResultado(resultado);
    }
    
    private static double calcular(double primerNumero, double segundoNumero, Operacion operacion) {
        // CAMBIO: Cada operación tiene su método
        return switch (operacion) {
            case SUMA -> sumar(primerNumero, segundoNumero);
            case RESTA -> restar(primerNumero, segundoNumero);
            case MULTIPLICACION -> multiplicar(primerNumero, segundoNumero);
            case DIVISION -> dividir(primerNumero, segundoNumero);
        };
    }
    
    // NUEVOS MÉTODOS: Cada operación es independiente y testeable
    private static double sumar(double a, double b) {
        return a + b;
    }
    
    private static double restar(double a, double b) {
        return a - b;
    }
    
    private static double multiplicar(double a, double b) {
        return a * b;
    }
    
    private static double dividir(double a, double b) {
        if (b == 0) {
            throw new ArithmeticException("No se puede dividir por cero");
        }
        return a / b;
    }
    
    private static void mostrarResultado(double resultado) {
        System.out.println("El resultado es: " + resultado);
    }
}