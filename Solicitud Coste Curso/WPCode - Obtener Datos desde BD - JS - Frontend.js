function obtenerDescuentos() {
    // Crear el objeto de datos a enviar
    const datos = new FormData();
    
    // El 'action' conecta el JavaScript con la función PHP
    datos.append('action', 'obtenerDescuentos'); // Esta acción llama a la función 'obtenerDescuentos' en PHP
    
    // Enviar la solicitud AJAX
    return fetch('/wp-admin/admin-ajax.php', {
        method: 'POST',
        body: datos
    })
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        // Verificar si es realmente un array
        if (Array.isArray(data)) {
			console.log("Tipo de data:", typeof data);
        	console.log("Data es un array.");
        
        	// Iterar sobre los módulos
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

function obtenerIncrementos() {
    // Crear el objeto de datos a enviar
    const datos = new FormData();
    
    // El 'action' conecta el JavaScript con la función PHP
    datos.append('action', 'obtenerIncrementos'); // Esta acción llama a la función 'obtenerIncrementos' en PHP
    
    // Enviar la solicitud AJAX
    return fetch('/wp-admin/admin-ajax.php', {
        method: 'POST',
        body: datos
    })
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        // Verificar si es realmente un array
        if (Array.isArray(data)) {
			console.log("Tipo de data:", typeof data);
        	console.log("Data es un array.");
        
        	// Iterar sobre los módulos
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

function obtenerModulos(idCiclo) {
    // Crear el objeto de datos a enviar
    const datos = new FormData();
    
    // El 'action' conecta el JavaScript con la función PHP
    datos.append('action', 'obtenerModulos'); // Esta acción llama a la función 'obtenerModulos' en PHP
    
    // Enviar el 'ID_Ciclo' como variable al backend
    datos.append('ID_Ciclo', idCiclo);

    // Enviar la solicitud AJAX
    return fetch('/wp-admin/admin-ajax.php', {
        method: 'POST',
        body: datos
    })
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
		 console.log("Tipo de data:", typeof data);
		// Verificar si es realmente un array
        if (Array.isArray(data)) {
        	console.log("Data es un array.");

        	return data;
    	} else {
        	console.error("Data no es un array, verifique la estructura:", data);
			return null;
    	}
    })
    .catch(error => {
		console.error('Error:', error);
		return null 
	});
}

function obtenerPorcentajesPagoAplazado() {
    // Crear el objeto de datos a enviar
    const datos = new FormData();
    
    // El 'action' conecta el JavaScript con la función PHP
    datos.append('action', 'obtenerPorcentajesPagoAplazado'); // Esta acción llama a la función 'obtenerPorcentajesPagoAplazado' en PHP
    
    // Enviar la solicitud AJAX
    return fetch('/wp-admin/admin-ajax.php', {
        method: 'POST',
        body: datos
    })
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        // Verificar si es realmente un array
        if (Array.isArray(data)) {
			console.log("Tipo de data:", typeof data);
        	console.log("Data es un array.");
        
        	// Iterar sobre los módulos
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

function obtenerNumerosCuentasBancarias() {
    // Crear el objeto de datos a enviar
    const datos = new FormData();
    
    // El 'action' conecta el JavaScript con la función PHP
    datos.append('action', 'obtenerNumerosCuentasBancarias'); // Esta acción llama a la función 'obtenerNumerosCuentaBancaria' en PHP
    
    // Enviar la solicitud AJAX
    return fetch('/wp-admin/admin-ajax.php', {
        method: 'POST',
        body: datos
    })
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        // Verificar si es realmente un array
        if (Array.isArray(data)) {
			console.log("Tipo de data:", typeof data);
        	console.log("Data es un array.");
        
        	// Iterar sobre los módulos
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

function obtenerOtrosCostes() {
    // Crear el objeto de datos a enviar
    const datos = new FormData();
    
    // El 'action' conecta el JavaScript con la función PHP
    datos.append('action', 'obtenerOtrosCostes'); // Esta acción llama a la función 'obtenerNumerosCuentaBancaria' en PHP
    
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
			console.log("Tipo de data:", typeof data);
        	console.log("Data es un array.");
        
        	// Iterar sobre los módulos
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