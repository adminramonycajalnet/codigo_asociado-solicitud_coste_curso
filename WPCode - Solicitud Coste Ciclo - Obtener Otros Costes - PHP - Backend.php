add_action('wp_ajax_obtenerOtrosCostes', 'obtenerOtrosCostes');
add_action('wp_ajax_nopriv_obtenerOtrosCostes', 'obtenerOtrosCostes');

function obtenerOtrosCostes() {
	error_log("Función obtenerOtrosCostes ha sido llamada."); // Añade esta línea para ver si la función se ejecuta
	
	global $wpdb;
    $results = $wpdb->get_results(
    	$wpdb->prepare(
        "SELECT * FROM `RYC_Tarifas_Otros_Costes`"), 
    	ARRAY_A);
    	echo json_encode($results);
	
    wp_die(); // Es necesario para detener el script correctamente
}