function calcularCosteModulo(modulo, seleccion, antiguoAlumno) {
    if (!modulo) {
        console.error("Módulo no encontrado");
        return;
    }

    // Calcula el coste según si el usuario seleccionó Matrícula o Convalidación
    var coste = 0;
    if(antiguoAlumno == "No"){
        if(seleccion == "Matrícula"){
            coste = modulo.Horas_Asignadas * modulo.Precio_Hora_Matricula;
        }
        else{
            if(seleccion == "Convalidación"){
                coste = modulo.Horas_Asignadas * modulo.Precio_Hora_Convalidacion;
            }
        }
    }
    else {
        if (antiguoAlumno == "Si"){
            if(seleccion == "Matrícula"){
                coste = modulo.Horas_Asignadas * modulo.Precio_Hora_Matricula_Antiguo_Alumno;
            }
            else{
                if(seleccion == "Convalidación"){
                    coste = modulo.Horas_Asignadas * modulo.Precio_Hora_Convalidacion_Antiguo_Alumno;
                }
            }
        }
    }
   return (Math.round(coste * 10) / 10).toFixed(2);
}

function calcularCosteModuloAplazado(costeModulo, incrementoPagoAplazado) {
	let costeModuloAplazado = costeModulo * (1 + incrementoPagoAplazado / 100);
	return (Math.round(costeModuloAplazado * 10) / 10).toFixed(2);
}

function calcularCosteModuloAplazadoMensualidad(costeModuloAplazado, porcentajePagoAplazado, curso) {
	let restoCosteModuloAplazado = ((100 - porcentajePagoAplazado) / 100) * costeModuloAplazado;
	let costeModuloAplazadoMensualidad = 0;
	
	if(curso == 1)
		costeModuloAplazadoMensualidad = restoCosteModuloAplazado / 8;
	else
		costeModuloAplazadoMensualidad = restoCosteModuloAplazado / 3;

	return ((costeModuloAplazadoMensualidad * 10) / 10).toFixed(2);
}

function calcularPrimerPagoModuloAplazado(costeModuloAplazado, porcentajePagoAplazado) {
	let primerPagoModuloAplazado = (porcentajePagoAplazado / 100) * costeModuloAplazado;
	return ((primerPagoModuloAplazado * 10) / 10).toFixed(2);
}