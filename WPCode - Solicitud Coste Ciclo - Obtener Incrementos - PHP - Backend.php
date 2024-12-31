add_action('wp_ajax_obtenerIncrementos', 'obtenerIncrementos');
add_action('wp_ajax_nopriv_obtenerIncrementos', 'obtenerIncrementos');

function obtenerIncrementos() {
	error_log("Función obtenerIncremntos ha sido llamada."); // Añade esta línea para ver si la función se ejecuta
	
	global $wpdb;
    $results = $wpdb->get_results(
    	$wpdb->prepare(
        "SELECT * FROM `RYC_Tarifas_Incremento`"), 
    	ARRAY_A);
    	echo json_encode($results);
	
    wp_die(); // Es necesario para detener el script correctamente
}