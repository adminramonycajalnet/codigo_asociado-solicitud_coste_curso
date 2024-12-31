add_action('wpcf7_before_send_mail', 'cf7_attach_message_body_file');
function cf7_attach_message_body_file($contact_form) {
	
    // Obtener la instancia de la clase WPCF7_Submission
    $submission = WPCF7_Submission::get_instance();

    if ($submission) {
        // Obtener el contenido del "Message Body" de la pestaña Mail
        $mail = $contact_form->prop('mail');
        $message_body = $mail['body'];

        // Reemplazar los campos dinámicos con los datos enviados
        $posted_data = $submission->get_posted_data();
        foreach ($posted_data as $key => $value) {
            if (is_array($value)) {
                $value = implode(', ', $value);
            }
            $message_body = str_replace('[' . $key . ']', $value, $message_body);
        }

        // Guardar el contenido del Message Body en un archivo temporal
        $upload_dir = wp_upload_dir();
        $file_path = $upload_dir['basedir'] . '/cf7-message-body.pdf';
        file_put_contents($file_path, $message_body);

        // Agregar el archivo como adjunto
        $mail['attachments'] .= "\n" . $file_path;
        $contact_form->set_properties(['mail' => $mail]);

        // Limpiar el archivo después de enviar el correo
        add_action('wpcf7_mail_sent', function() use ($file_path) {
            if (file_exists($file_path)) {
                unlink($file_path);
            }
        });
    }
}
