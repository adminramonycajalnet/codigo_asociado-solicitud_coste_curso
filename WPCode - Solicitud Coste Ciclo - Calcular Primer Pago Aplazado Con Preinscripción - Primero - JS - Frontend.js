function calcularCosteModuloAplazadoMensualidad(costeModuloAplazado, porcentajePagoAplazado, curso) {
	let restoCosteModuloAplazado = ((100 - porcentajePagoAplazado) / 100) * costeModuloAplazado;
	let costeModuloAplazadoMensualidad = 0;
	if(curso == 1)
		costeModuloAplazadoMensualidad = restoCosteModuloAplazado / 8;
	else
		costeModuloAplazadoMensualidad = restoCosteModuloAplazado / 3;
	
	console.log("Coste Modulo Aplazado Mensualidad = " + costeModuloAplazadoMensualidad);
	return ((costeModuloAplazadoMensualidad * 10) / 10).toFixed(2);
}