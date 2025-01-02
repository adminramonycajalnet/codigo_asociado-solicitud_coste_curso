function calcularCostePreinscripcion(costeTotalPrimero, costeTotalSegundo, costePreinscripcion) {
	let preinscripcion = 0;
	
    if((costeTotalPrimero + costeTotalSegundo) > costePreinscripcion)
		preinscripcion = costePreinscripcion;
	else
		preinscripcion = costeTotalPrimero + costeTotalSegundo;
	
	return preinscripcion;
}

function calcularMatriculaContadoPrimero(costeTotalPrimero, costeTotalSegundo, costePreinscripcion) {
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

function primerPagoAplConPreinsPrimero(costeTotalAplazadoPrimero, costePreinscripcion, porcentajePagoAplazado) {
	let primerPagoAplazadoPrimero = 0;
	
	if(costeTotalAplazadoPrimero < costePreinscripcion)
		primerPagoAplazadoPrimero = 0;
	else{
		primerPagoAplazadoPrimero = parseFloat(costeTotalAplazadoPrimero) - parseFloat(costePreinscripcion);
		primerPagoAplazadoPrimero = primerPagoAplazadoPrimero * (parseFloat(porcentajePagoAplazado) / 100);
		primerPagoAplazadoPrimero = parseFloat(primerPagoAplazadoPrimero / 2).toFixed(2);
	}
		
	return primerPagoAplazadoPrimero;
}

function segundoPagoAplConPreinsPrimero(costeTotalAplazadoPrimero, costePreinscripcion, porcentajePagoAplazado) {
	let segundoPagoAplazadoPrimero = 0;
	
	if(costeTotalAplazadoPrimero < costePreinscripcion)
		segundoPagoAplazadoPrimero = 0;
	else{
		segundoPagoAplazadoPrimero = parseFloat(costeTotalAplazadoPrimero) - parseFloat(costePreinscripcion);
		segundoPagoAplazadoPrimero = segundoPagoAplazadoPrimero * (parseFloat(porcentajePagoAplazado) / 100);
		segundoPagoAplazadoPrimero = parseFloat(segundoPagoAplazadoPrimero / 2).toFixed(2);
	}
		
	return segundoPagoAplazadoPrimero;
}

function mensualidadesPrimero(costeTotalAplazadoPrimero, costePreinscripcion, porcentajePagoAplazado, numMensualidadesPrimero) {
	let mensualidadesPrimero = 0;
	
	if(costeTotalAplazadoPrimero < costePreinscripcion)
		mensualidadesPrimero = 0;
	else{
		mensualidadesPrimero = parseFloat(costeTotalAplazadoPrimero) - parseFloat(costePreinscripcion);
		mensualidadesPrimero = mensualidadesPrimero * (parseFloat(100 - porcentajePagoAplazado) / 100);
		mensualidadesPrimero = parseFloat(mensualidadesPrimero / numMensualidadesPrimero).toFixed(2);
	}
		
	return mensualidadesPrimero;
}

function primerPagoAplSinPreinsPrimero(costeTotalAplazadoPrimero, costePreinscripcion, porcentajePagoAplazado) {
	let primerPagoAplazadoPrimero = 0;
	
	if(costeTotalAplazadoPrimero < costePreinscripcion)
		primerPagoAplazadoPrimero = 0;
	else{
		primerPagoAplazadoPrimero = parseFloat(costeTotalAplazadoPrimero) - parseFloat(costePreinscripcion);
		primerPagoAplazadoPrimero = primerPagoAplazadoPrimero * (parseFloat(porcentajePagoAplazado) / 100);
		primerPagoAplazadoPrimero = parseFloat(primerPagoAplazadoPrimero / 2).toFixed(2);
		primerPagoAplazadoPrimero = parseFloat(primerPagoAplazadoPrimero) +  parseFloat(costePreinscripcion);
	}
		
	return parseFloat(primerPagoAplazadoPrimero).toFixed(2);
}

function segundoPagoAplSinPreinsPrimero(costeTotalAplazadoPrimero, costePreinscripcion, porcentajePagoAplazado) {
	let segundoPagoAplazadoPrimero = 0;
	
	if(costeTotalAplazadoPrimero < costePreinscripcion)
		segundoPagoAplazadoPrimero = 0;
	else{
		segundoPagoAplazadoPrimero = parseFloat(costeTotalAplazadoPrimero) - parseFloat(costePreinscripcion);
		segundoPagoAplazadoPrimero = segundoPagoAplazadoPrimero * (parseFloat(porcentajePagoAplazado) / 100);
		segundoPagoAplazadoPrimero = parseFloat(segundoPagoAplazadoPrimero / 2).toFixed(2);
	}
		
	return segundoPagoAplazadoPrimero;
}

function costeTotalAplPrimero(costeTotalPrimero, costeTotalAplazadoPrimero, costePreinscripcion) {
	let costePrimero = 0;
	
	if(costeTotalPrimero < costePreinscripcion)
		costePrimero = 0;
	else
		costePrimero = costeTotalAplazadoPrimero;
							
	return costePrimero;
}