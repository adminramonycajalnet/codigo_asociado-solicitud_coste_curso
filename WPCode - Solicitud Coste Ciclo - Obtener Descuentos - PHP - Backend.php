add_action('wp_ajax_obtenerDescuentos', 'obtenerDescuentos');
add_action('wp_ajax_nopriv_obtenerDescuentos', 'obtenerDescuentos');

function obtenerDescuentos() {
	error_log("Función obtenerDescuentos ha sido llamada."); // Añade esta línea para ver si la función se ejecuta
	
	global $wpdb;
    $results = $wpdb->get_results(
    	$wpdb->prepare(
        "SELECT * FROM `RYC_Tarifas_Descuento`"), 
    	ARRAY_A);
    	echo json_encode($results);
	
    wp_die(); // Es necesario para detener el script correctamente
}