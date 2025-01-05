add_action('wp_ajax_obtenerDescuentos', 'obtenerDescuentos');
add_action('wp_ajax_nopriv_obtenerDescuentos', 'obtenerDescuentos');
add_action('wp_ajax_obtenerIncrementos', 'obtenerIncrementos');
add_action('wp_ajax_nopriv_obtenerIncrementos', 'obtenerIncrementos');
add_action('wp_ajax_obtenerNumerosCuentasBancarias', 'obtenerNumerosCuentasBancarias');
add_action('wp_ajax_nopriv_obtenerNumerosCuentasBancarias', 'obtenerNumerosCuentasBancarias');
add_action('wp_ajax_obtenerOtrosCostes', 'obtenerOtrosCostes');
add_action('wp_ajax_nopriv_obtenerOtrosCostes', 'obtenerOtrosCostes');
add_action('wp_ajax_obtenerPorcentajesPagoAplazado', 'obtenerPorcentajesPagoAplazado');
add_action('wp_ajax_nopriv_obtenerPorcentajesPagoAplazado', 'obtenerPorcentajesPagoAplazado');
add_action('wp_ajax_obtenerRangoMensualidades', 'obtenerRangoMensualidades');
add_action('wp_ajax_nopriv_obtenerRangoMensualidades', 'obtenerRangoMensualidades');
add_action('wp_ajax_obtenerModulos', 'obtenerModulos');
add_action('wp_ajax_nopriv_obtenerModulos', 'obtenerModulos');

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

function obtenerPorcentajesPagoAplazado() {
	error_log("Función obtenerPorcentajesPagoAplazado ha sido llamada."); // Añade esta línea para ver si la función se ejecuta
	
	global $wpdb;
    $results = $wpdb->get_results(
    	$wpdb->prepare(
        "SELECT * FROM `RYC_Tarifas_Pago_Aplazado_Porcentajes`"), 
    	ARRAY_A);
    	echo json_encode($results);
	
    wp_die(); // Es necesario para detener el script correctamente
}

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

function obtenerModulos() {
	error_log("Función obtenerModulos ha sido llamada."); // Añade esta línea para ver si la función se ejecuta
	if (isset($_POST['ID_Ciclo'])) {
        $ID_Ciclo = intval($_POST['ID_Ciclo']); // Convertir el valor en un número para mayor seguridad

    	global $wpdb;
    	$results = $wpdb->get_results(
    		$wpdb->prepare(
        	"SELECT * FROM `RYC_Tarifas_Modulo` WHERE ID_Modulo IN (SELECT ID_Modulo FROM RYC_Tarifas_Ciclo_Modulo WHERE ID_Ciclo = %d)", 
        	$ID_Ciclo), 
    		ARRAY_A);
    	echo json_encode($results);
	}
	else {
		// En caso de que falte el parámetro, envías un error
        echo json_encode(array('error' => 'No se ha proporcionado ID_Ciclo'));
	}
    wp_die(); // Es necesario para detener el script correctamente
}