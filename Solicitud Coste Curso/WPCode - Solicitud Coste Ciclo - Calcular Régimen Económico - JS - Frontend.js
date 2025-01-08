function calcularCostePreinscripcion(costeTotalPrimero, costeTotalSegundo, costePreinscripcion) {
	let preinscripcion = 0;
	
    if((costeTotalPrimero + costeTotalSegundo) > costePreinscripcion)
		preinscripcion = costePreinscripcion;
	else
		preinscripcion = costeTotalPrimero + costeTotalSegundo;
	
	return preinscripcion;
}

function matriculaContadoConPreinsPrimero(costeTotalPrimero, costeTotalSegundo, costePreinscripcion) {
	let matricula = 0;
	
	if(costeTotalPrimero < costePreinscripcion)
		if(costeTotalSegundo > costePreinscripcion)
			matricula = costeTotalPrimero;
		else
			matricula = 0; //Se ha pagado en la preinscripción.
	else
		matricula = parseFloat(costeTotalPrimero - costePreinscripcion).toFixed(2);
	
	return matricula;
}

function primerPagoApl(costeTotalAplazado, costeTotalAplazadoPrimero, costePreinscripcion, porcentajePagoAplazado, preinscripcionPagada, curso) {
	let primerPagoAplazado = 0;
	
	if(costeTotalAplazado < costePreinscripcion)
		primerPagoAplazado = 0;
	else{
		primerPagoAplazado = costeTotalAplazado * (parseFloat(porcentajePagoAplazado) / 100);
		
		if(curso == 2 && costeTotalAplazadoPrimero < costePreinscripcion)
			primerPagoAplazado = parseFloat(primerPagoAplazado) - parseFloat(costePreinscripcion);
		else if(curso == 1)
			primerPagoAplazado = parseFloat(primerPagoAplazado) - parseFloat(costePreinscripcion);
		
		primerPagoAplazado = parseFloat(primerPagoAplazado / 2).toFixed(2);
				
		if(curso == 1){
			if(preinscripcionPagada == false)
				primerPagoAplazado = parseFloat(primerPagoAplazado) +  parseFloat(costePreinscripcion);
		}
		else if(curso == 2){
			if(costeTotalAplazadoPrimero < costePreinscripcion && preinscripcionPagada == false)
				primerPagoAplazado = parseFloat(primerPagoAplazado) + parseFloat(costePreinscripcion);
		}
	}
	
	return parseFloat(primerPagoAplazado).toFixed(2);
}

function segundoPagoApl(costeTotalAplazado, costeTotalAplazadoPrimero, costePreinscripcion, porcentajePagoAplazado, preinscripcionPagada, curso) {
	let segundoPagoAplazado = 0;
	
	if(costeTotalAplazado < costePreinscripcion)
		segundoPagoAplazado = 0;
	else{
		segundoPagoAplazado = costeTotalAplazado * (parseFloat(porcentajePagoAplazado) / 100);
		
		if(curso == 2 && costeTotalAplazadoPrimero < costePreinscripcion && preinscripcionPagada == false)
				segundoPagoAplazado = parseFloat(segundoPagoAplazado) - parseFloat(costePreinscripcion);
		else if(curso == 1 && preinscripcionPagada == false)
			segundoPagoAplazado = parseFloat(segundoPagoAplazado) - parseFloat(costePreinscripcion);
		
		segundoPagoAplazado = parseFloat(segundoPagoAplazado / 2).toFixed(2);
	}
		
	return segundoPagoAplazado;
}

function mensualidades(costeTotalAplazado, costePreinscripcion, porcentajePagoAplazado, numMensualidades) {
	let mensualidades = 0;
	
	if(costeTotalAplazado < costePreinscripcion)
		mensualidades = 0;
	else{
		mensualidades = costeTotalAplazado * (parseFloat(100 - porcentajePagoAplazado) / 100);
		mensualidades = parseFloat(mensualidades / numMensualidades).toFixed(2);
	}
		
	return mensualidades;
}

function costeTotalAplPrimero(costeTotalPrimero, costeTotalAplazadoPrimero, costePreinscripcion) {
	let costePrimero = 0;
	
	if(costeTotalPrimero < costePreinscripcion)
		costePrimero = 0;
	else
		costePrimero = costeTotalAplazadoPrimero;
							
	return costePrimero;
}

function matriculaContadoConPreinsSegundo(costeTotalSegundo, costeTotalPrimero, costePreinscripcion) {
	let matricula = 0;
	
	if (costeTotalSegundo < costePreinscripcion){
		if(costeTotalPrimero > costePreinscripcion)
			matricula = costeTotalSegundo;
		else{
			if(costeTotalSegundo == 0)
				matricula = 0;
			else
				if (costeTotalPrimero > 0)
					matricula = parseFloat(costeTotalSegundo - (costePreinscripcion  - costeTotalPrimero)).toFixed(2);
				else
					matricula = costeTotalSegundo;
		}
	}
	else
		if (costeTotalPrimero > costePreinscripcion)
			matricula = costeTotalSegundo;
		else
			matricula = parseFloat(costeTotalSegundo - costePreinscripcion).toFixed(2);
	
	return matricula;
}