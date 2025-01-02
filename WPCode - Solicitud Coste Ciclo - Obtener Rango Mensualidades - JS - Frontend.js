function obtenerRangoMensualidades() {
    // Crear el objeto de datos a enviar
    const datos = new FormData();
    
    // El 'action' conecta el JavaScript con la función PHP
    datos.append('action', 'obtenerRangoMensualidades'); // Esta acción llama a la función 'obtenerRangoMensualidades' en PHP
    
    // Enviar la solicitud AJAX
    return fetch('/wp-admin/admin-ajax.php', {
        method: 'POST',
        body: datos
    })
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        // Verificar si es realmente un array
        if (Array.isArray(data)) {
        	return data;
    	} else {
        	console.error("Data no es un array, verifique la estructura:", data);
			return null;
    	}
    })
    .catch(error => {
		console.error('Error:', error);
		return null;
	});
}