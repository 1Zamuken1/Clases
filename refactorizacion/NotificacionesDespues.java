public class NotificacionesDespues {
    public static void main(String[] args) {
    Notificacion email = new NotificacionEmail("juanito@gmail.com", "Tu pedido ha sido enviado");
    Notificacion sms = new NotificacionSMS("+573001234567", "Tu pedido ha sido enviado");
    Notificacion push = new NotificacionPush("device123", "Tu pedido ha sido enviado");

        email.enviar();
        sms.enviar();
        push.enviar();
    }
}

sealed interface Notificacion permits NotificacionEmail, NotificacionSMS, NotificacionPush {
    void enviar();    
}

final class NotificacionEmail implements Notificacion {
    private final String destinatario;
    private final String mensaje;

    public NotificacionEmail(String destinatario, String mensaje) {
        this.destinatario = destinatario;
        this.mensaje = mensaje;
    }

    @Override
    public void enviar() {
        System.out.println("Enviando email a: " + destinatario);
        System.out.println("Asunto: Notificación");
        System.out.println("Mensaje: " + mensaje);
        System.out.println("---");
    }
}

final class NotificacionSMS implements Notificacion {
    private final String destinatario;
    private final String mensaje;

    public NotificacionSMS(String destinatario, String mensaje) {
        this.destinatario = destinatario;
        this.mensaje = mensaje;
    }

    @Override
    public void enviar() {
        System.out.println("Enviando SMS a: " + destinatario);
        System.out.println("Texto (max 160 caracteres): " +
            (mensaje.length() > 160 ? mensaje.substring(0, 160) : mensaje));
        System.out.println("---");
    }
}

final class NotificacionPush implements Notificacion {
    private final String destinatario;
    private final String mensaje;

    public NotificacionPush(String destinatario, String mensaje) {
        this.destinatario = destinatario;
        this.mensaje = mensaje;
    }

    @Override
    public void enviar() {
        System.out.println("Enviando notificación push al dispositivo: " + destinatario);
        System.out.println("Título: Nueva notificación");
        System.out.println("Cuerpo: " + mensaje);
        System.out.println("---");
    }
}