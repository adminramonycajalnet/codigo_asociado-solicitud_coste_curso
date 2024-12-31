function calcularPrimerPagoModuloAplazado(costeModuloAplazado, porcentajePagoAplazado) {
	let primerPagoModuloAplazado = (porcentajePagoAplazado / 100) * costeModuloAplazado;
	console.log("Primer Pago Modulo Aplazado = " + primerPagoModuloAplazado);
	return ((primerPagoModuloAplazado * 10) / 10).toFixed(2);
}