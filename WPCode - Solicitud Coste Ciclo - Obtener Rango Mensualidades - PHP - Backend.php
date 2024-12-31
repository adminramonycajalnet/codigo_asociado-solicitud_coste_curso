add_action('wp_ajax_obtenerRangoMensualidades', 'obtenerRangoMensualidades');
add_action('wp_ajax_nopriv_obtenerRangoMensualidades', 'obtenerRangoMensualidades');

function obtenerRangoMensualidades() {
	error_log("Función obtenerRangoMensualidades ha sido llamada."); // Añade esta línea para ver si la función se ejecuta
	
	global $wpdb;
    $results = $wpdb->get_results(
    	$wpdb->prepare(
        "SELECT * FROM `RYC_Tarifas_Pago_Aplazado_Mensualidades`"), 
    	ARRAY_A);
    	echo json_encode($results);
	
    wp_die(); // Es necesario para detener el script correctamente
}