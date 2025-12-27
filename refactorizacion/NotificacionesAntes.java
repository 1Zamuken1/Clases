public class NotificacionesAntes {
    public static void main(String[] args) {
        String tipo = "email";
        String destinatario = "juan@example.com";
        String mensaje = "Tu pedido ha sido enviado";
        
        enviarNotificacion(tipo, destinatario, mensaje);
        
        tipo = "sms";
        destinatario = "+573001234567";
        enviarNotificacion(tipo, destinatario, mensaje);
        
        tipo = "push";
        destinatario = "device123";
        enviarNotificacion(tipo, destinatario, mensaje);
    }
    
    static void enviarNotificacion(String tipo, String destinatario, String mensaje) {
        if (tipo.equals("email")) {
            System.out.println("Enviando email a: " + destinatario);
            System.out.println("Asunto: Notificación");
            System.out.println("Mensaje: " + mensaje);
            System.out.println("---");
        } else if (tipo.equals("sms")) {
            System.out.println("Enviando SMS a: " + destinatario);
            System.out.println("Texto (max 160 caracteres): " + 
                (mensaje.length() > 160 ? mensaje.substring(0, 160) : mensaje));
            System.out.println("---");
        } else if (tipo.equals("push")) {
            System.out.println("Enviando notificación push al dispositivo: " + destinatario);
            System.out.println("Título: Nueva notificación");
            System.out.println("Cuerpo: " + mensaje);
            System.out.println("---");
        }
    }
}