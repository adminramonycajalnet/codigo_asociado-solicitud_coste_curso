add_action('wp_ajax_obtenerNumerosCuentasBancarias', 'obtenerNumerosCuentasBancarias');
add_action('wp_ajax_nopriv_obtenerNumerosCuentasBancarias', 'obtenerNumerosCuentasBancarias');

function obtenerNumerosCuentasBancarias() {
	error_log("Función obtenerNumerosCuentasBancarias ha sido llamada."); // Añade esta línea para ver si la función se ejecuta
	
	global $wpdb;
    $results = $wpdb->get_results(
    	$wpdb->prepare(
        "SELECT * FROM `RYC_Tarifas_Numero_Cuenta`"), 
    	ARRAY_A);
    	echo json_encode($results);
	
    wp_die(); // Es necesario para detener el script correctamente
}