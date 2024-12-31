function calcularCosteModuloAplazado(costeModulo, incrementoPagoAplazado) {
	let costeModuloAplazado = costeModulo * (1 + incrementoPagoAplazado / 100);
	return (Math.round(costeModuloAplazado * 10) / 10).toFixed(2);
}