public class CalculadoraAntes {
    public static void main(String[] args) {
        double n1 = 10;
        double n2 = 5;
        String o = "multiplicacion";
        
        double r = 0;
        
        if (o.equals("suma")) {
            r = n1 + n2;
        } else if (o.equals("resta")) {
            r = n1 - n2;
        } else if (o.equals("multiplicacion")) {
            r = n1 * n2;
        } else if (o.equals("division")) {
            if (n2 != 0) {
                r = n1 / n2;
            } else {
                System.out.println("Error");
                return;
            }
        }
        
        System.out.println("El resultado es: " + r);
    }
}