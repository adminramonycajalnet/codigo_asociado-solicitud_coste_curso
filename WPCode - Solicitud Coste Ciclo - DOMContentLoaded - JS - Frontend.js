document.addEventListener('DOMContentLoaded', function() {
    console.log("El DOM ha sido completamente cargado. Ahora se cargan los módulos.");

    // Asumiendo que necesitas obtener el ID del ciclo del formulario
    let idCiclo = document.querySelector('input[name="idCiclo"]').value;
	
	let incrementosPromesa = obtenerIncrementos();
	let descuentosPromesa = obtenerDescuentos();
	let porcentajesPromesa = obtenerPorcentajesPagoAplazado();
	let otrosCostesPromesa = obtenerOtrosCostes();
	let rangoMensualidadesPromesa = obtenerRangoMensualidades();
	let cuentasBancariasPromesa = obtenerNumerosCuentasBancarias();
	
	let horasTotalPrimero = 0;
	let costeTotalPrimero = 0.0;
	let costeTotalAplazadoPrimero = 0.0;
	let costeTotalPrimerPagoAplazadoPrimero = 0.0;
	let costeTotalAplazadoMensualPrimero = 0.0;
	
	let horasTotalSegundo = 0;
	let costeTotalSegundo = 0;
	let costeTotalAplazadoSegundo = 0;
	let costeTotalPrimerPagoAplazadoSegundo = 0.0;
	let costeTotalAplazadoMensualSegundo = 0;
	
	let porcentaje = 0;
	let costePreinscripcion = 0;
	let numeroMensualidadesPrimero = 0;
	let numeroMensualidadesSegundo = 0;
	let rangoMensualidadesPrimero = "";
	let rangoMensualidadesSegundo = "";
	let fechaSegundoPagoAplazadoPrimero = "";
	let fechaSegundoPagoAplazadoSegundo = "";
	
	// Valores finales
    let horasTotalFinal = 0;
	let horasTotalMatriculaFinal = 0;
    let costeTotalFinal = 0.0;
    let costeTotalAplazadoFinal = 0.0;
	
	// Fichero a generar y devolver en el correo
	let presupuestoPersonalFile = document.querySelector('input[name="presupuesto-personal"]');
	
	Promise.all([incrementosPromesa, descuentosPromesa, porcentajesPromesa, otrosCostesPromesa, rangoMensualidadesPromesa, cuentasBancariasPromesa]).then(results => {
		let incrementos = results[0];
        let descuentos = results[1];
		let porcentajes = results[2];
		let otrosCostes = results[3];
		let rangosMensualidades = results[4];
		let cuentasBancos = results[5];
		
		// Verificar que se han obtenido incrementos
        let incrementoPagoAplazado = 0;
        if (incrementos && Array.isArray(incrementos)) {
            const incremento = incrementos.find(inc => inc.ID_Incremento == 1);
            if (incremento) {
                incrementoPagoAplazado = parseFloat(incremento.Porcentaje_Incremento);
            } else {
                console.log("No se encontró un incremento con ID_Incremento = 1");
            }
        } else {
            console.error("No se obtuvieron incrementos.");
        }

		let descuentoAntiguoAlumno = 0;
        if (descuentos && Array.isArray(descuentos)) {
            const descuento = descuentos.find(des => des.ID_Descuento == 1);
            if (descuento) {
                descuentoAntiguoAlumno = parseFloat(descuento.Porcentaje_Descuento);
            } else {
                console.log("No se encontró un descuento con ID_Descuento = 1");
            }
        } else {
            console.error("No se obtuvieron descuentos.");
        }
		
		let porcentajePagoAplazado = 0;
        if (porcentajes && Array.isArray(porcentajes)) {
            porcentaje = porcentajes.find(por => por.ID_Porcentaje == 1);
            if (porcentaje) {
                porcentajePagoAplazado = parseFloat(porcentaje.Porcentaje);
            } else {
                console.log("No se encontró un porcentaje con ID_Porcentaje = 1");
            }
        } else {
            console.error("No se obtuvieron porcentajes.");
        }
		
        if (otrosCostes && Array.isArray(otrosCostes)) {
            const otroCoste = otrosCostes.find(oc => oc.ID_Otros_Costes == 1);
            if (otroCoste) {
                costePreinscripcion = parseFloat(otroCoste.Coste);
            } else {
                console.log("No se encontró un coste con ID_Otro_Coste = 1");
            }
        } else {
            console.error("No se obtuvieron otros costes.");
        }
		
		if (rangosMensualidades && Array.isArray(rangosMensualidades)) {
            const rangoMensualPrimero = rangosMensualidades.find(rm => rm.ID_Mensualidades == 1);
			const rangoMensualSegundo = rangosMensualidades.find(rm => rm.ID_Mensualidades == 2);
            if (rangoMensualPrimero || rangoMensualSegundo) {
				numeroMensualidadesPrimero = rangoMensualPrimero.Numero_Mensualidades;
				numeroMensualidadesSegundo = rangoMensualSegundo.Numero_Mensualidades;
				rangoMensualidadesPrimero = rangoMensualPrimero.Rango_Mensualidades;
				rangoMensualidadesSegundo = rangoMensualSegundo.Rango_Mensualidades;
				fechaSegundoPagoAplazadoPrimero = rangoMensualPrimero.Fecha_Segundo_Pago + "/" + String(new Date().getFullYear() + 1);
				fechaSegundoPagoAplazadoSegundo = rangoMensualSegundo.Fecha_Segundo_Pago + "/" + String(new Date().getFullYear() + 1);
				
				console.log("Numero Mensualidades Primero = " + numeroMensualidadesPrimero);
				console.log("Numero Mensualidades Segundo = " + numeroMensualidadesSegundo);
				console.log("Rango Mensualidades Primero = " + rangoMensualidadesPrimero);
				console.log("Rango Mensualidades Segundo = " + rangoMensualidadesSegundo);
				console.log("Fecha Segundo Pago Aplazado Primero = " + fechaSegundoPagoAplazadoPrimero);
				console.log("Fecha Segundo Pago Aplazado Segundo = " + fechaSegundoPagoAplazadoSegundo);
            } else {
                console.log("No se encontró un rango de mensualidades con ID_Rango_mensualides = 1 o 2");
            }
        } else {
            console.error("No se obtuvieron rangos de mensualidades.");
        }
		
		let cuentaBanco = [];
        if (cuentasBancos && Array.isArray(cuentasBancos)) {
            const cuenta = cuentasBancos.find(cb => cb.ID_Banco == 1);
            if (cuenta) {
                cuentaBanco.push(cuenta.Iban);
				cuentaBanco.push(cuenta.Entidad);
				cuentaBanco.push(cuenta.Oficina);
				cuentaBanco.push(cuenta.DC);
				cuentaBanco.push(cuenta.Numero_Cuenta);
				cuentaBanco.push(cuenta.Descripcion);
            } else {
                console.log("No se encontró una cuenta bancaria con ID_Banco = 1");
            }
        } else {
            console.error("No se obtuvieron cuentas bancarias.");
        }
		
		// Devolver los valores para el siguiente 'then'
        return { 
			incrementoPagoAplazado, descuentoAntiguoAlumno, porcentajePagoAplazado, cuentaBanco
		};
		
	}).then(valores => {
		let { incrementoPagoAplazado, descuentoAntiguoAlumno, porcentajePagoAplazado, cuentaBanco } = valores;
	
    	let modulosPromesa = obtenerModulos(idCiclo)
		Promise.all([modulosPromesa]).then(results => {
			let modulos = results[0];
			if (modulos) {
        		console.log("Módulos obtenidos:", modulos);
				
				// Almacenar los módulos en sessionStorage
            	sessionStorage.setItem('modulos-' + idCiclo, JSON.stringify(modulos));
				
				// Mostrar los módulos en el formulario SE PUEDE BORRAR
				let modulosGuardados = sessionStorage.getItem('modulos-' + idCiclo);
    			if (modulosGuardados) {
        			// Parsear los datos almacenados para convertirlos de JSON string a objeto
        			let modulos = JSON.parse(modulosGuardados);
        			console.log("Módulos cargados desde sessionStorage:", modulos);
				}

         		modulos.forEach(modulo => {
         			// Aquí puedes agregar lógica para mostrar la información del módulo en el formulario
         			// Por ejemplo, puedes crear elementos de HTML dinámicamente para mostrar los módulos
         			console.log("ID del módulo DOMContentLoaded:", modulo.ID_Modulo);
         			console.log("Nombre del módulo DOMContentLoaded:", modulo.Nombre);
					console.log("Precio del módulo DOMContentLoaded:", modulo.Precio_Hora_Matricula);
					
					document.querySelector('input[name="coste-hora"]').value = modulo.Precio_Hora_Matricula;
					document.querySelector('input[name="coste-hora-aplazado"]').value = modulo.Precio_Hora_Matricula_Aplazado;
					document.querySelector('input[name="porcentaje-modulo-convalidado"]').value = (parseFloat(modulo.Precio_Hora_Convalidacion) / parseFloat(modulo.Precio_Hora_Matricula)) * 100;
					document.querySelector('input[name="porcentaje-primer-pago-aplazado"]').value = parseFloat(porcentaje.Porcentaje);
					document.querySelector('input[name="resto-porcentaje-pago-aplazado"]').value = 100 - parseFloat(porcentaje.Porcentaje);
					
					//Asignar número de cuenta bancario a los campos correspondientes del html final
					document.querySelector('input[name="iban-banco"]').value = cuentaBanco[0];
					document.querySelector('input[name="entidad-banco"]').value = cuentaBanco[1];
					document.querySelector('input[name="oficina-banco"]').value = cuentaBanco[2];
					document.querySelector('input[name="dc-banco"]').value = cuentaBanco[3];
					document.querySelector('input[name="numero-cuenta-banco"]').value = cuentaBanco[4];
					
					let seleccion = null;
					let opciones = document.querySelectorAll('input[name="idModulo-' + modulo.ID_Modulo + '"]');

					console.log("Opciones = " + opciones);
					
					opciones.forEach((opcion) => {
						opcion.addEventListener('change', function() {
							// Obtener el ID del módulo desde el atributo "name" del checkbox
            				let idModulo = opcion.name.split('-')[1];
							let antiguoAlumno = document.querySelector('select[name="antiguo-alumno"]').value;

							// Obtener valores actuales del módulo
							let horasPrevias = parseFloat(document.querySelector('input[name="horas-idModulo-' + idModulo + '"]').value) || 0;
        					let costePrevio = parseFloat(document.querySelector('input[name="coste-idModulo-' + idModulo + '"]').value) || 0;
        					let costeAplazadoPrevio = parseFloat(document.querySelector('input[name="coste-idModulo-aplazado-' + idModulo + '"]').value) || 0;
							let costePrimerPagoAplazadoPrevio = parseFloat(document.querySelector('input[name="primer_pago-idModulo-aplazado-' + idModulo + '"]').value) || 0;
       	 					let costeMensualPrevio = parseFloat(document.querySelector('input[name="coste-idModulo-aplazado-mensual-' + idModulo + '"]').value) || 0;

							// Restar horas previas de las totales generales y de matrícula
                        	if (!opcion.checked || opcion.value !== "Matrícula") {
                            	if (modulo.Curso === 1) {
                                	horasTotalPrimero -= horasPrevias;
                            	} else if (modulo.Curso === 2) {
                                	horasTotalSegundo -= horasPrevias;
                            	}
                            	horasTotalMatriculaFinal -= opcion.value === "Matrícula" ? horasPrevias : 0;
                        	}
							
        					// Restar valores previos de los totales
        					if (modulo.Curso == 1 || modulo.Curso == 2) {
    							let horasTotal = modulo.Curso == 1 ? horasTotalPrimero : horasTotalSegundo;
    							let costeTotal = modulo.Curso == 1 ? costeTotalPrimero : costeTotalSegundo;
    							let costeTotalAplazado = modulo.Curso == 1 ? costeTotalAplazadoPrimero : costeTotalAplazadoSegundo;
								let costeTotalPrimerPagoAplazado = modulo.Curso == 1 ? costeTotalPrimerPagoAplazadoPrimero : costeTotalPrimerPagoAplazadoSegundo;
    							let costeTotalAplazadoMensual = modulo.Curso == 1 ? costeTotalAplazadoMensualPrimero : costeTotalAplazadoMensualSegundo;

    							horasTotal -= parseInt(horasPrevias) || 0;
								
    							costeTotal -= costePrevio;
    							costeTotal = parseFloat(costeTotal.toFixed(2));

    							costeTotalAplazado -= costeAplazadoPrevio;
    							costeTotalAplazado = parseFloat(costeTotalAplazado.toFixed(2));
								
								costeTotalPrimerPagoAplazado -= costePrimerPagoAplazadoPrevio;
								costeTotalPrimerPagoAplazado = parseFloat(costeTotalPrimerPagoAplazado.toFixed(2));

    							costeTotalAplazadoMensual -= costeMensualPrevio;
   				 				costeTotalAplazadoMensual = parseFloat(costeTotalAplazadoMensual.toFixed(2));

    							if (modulo.Curso == 1) {
        							horasTotalPrimero = horasTotal;
        							costeTotalPrimero = costeTotal;
       	 							costeTotalAplazadoPrimero = costeTotalAplazado;
									costeTotalPrimerPagoAplazadoPrimero = costeTotalPrimerPagoAplazado;
        							costeTotalAplazadoMensualPrimero = costeTotalAplazadoMensual;
    							} else {
        							horasTotalSegundo = horasTotal;
        							costeTotalSegundo = costeTotal;
        							costeTotalAplazadoSegundo = costeTotalAplazado;
									costeTotalPrimerPagoAplazadoSegundo = costeTotalPrimerPagoAplazado;
        							costeTotalAplazadoMensualSegundo = costeTotalAplazadoMensual;
    							}
								
								horasTotalFinal = parseInt(horasTotalPrimero) + parseInt(horasTotalSegundo);
								costeTotalFinal = parseFloat(costeTotalPrimero) + parseFloat(costeTotalSegundo);
								costeTotalAplazadoFinal = parseFloat(costeTotalAplazadoPrimero) + parseFloat(costeTotalAplazadoSegundo);
							}
							
							if (opcion.checked) {
                				let seleccion = opcion.value; // Puede ser "Matrícula" o "Convalidación"
								console.log("Checkbox marcado:", seleccion, "para el módulo", idModulo);
					
								let modulosGuardados = sessionStorage.getItem('modulos-' + idCiclo);
								let modulo = null;
								if (modulosGuardados) {
        							let modulos = JSON.parse(modulosGuardados);
        							modulo = modulos.find(modulo => modulo.ID_Modulo == idModulo);
    							}
					
								let costeModulo = calcularCosteModulo(modulo, seleccion, antiguoAlumno);
								let costeModuloAplazado = calcularCosteModuloAplazado(costeModulo, incrementoPagoAplazado);
								let primerPagoModuloAplazado = calcularPrimerPagoModuloAplazado(costeModuloAplazado, porcentajePagoAplazado);
								let costeModuloAplazadoMensual = calcularCosteModuloAplazadoMensualidad(costeModuloAplazado, porcentajePagoAplazado, modulo.Curso);
								
								//Asignar el nombre al campo oculto correspondiente al módulo.
								document.querySelector('input[name="nombre-idModulo-' + idModulo + '"]').value = modulo.Nombre;
								//Asignar el número de horas lectivas al campo oculto correspondiente al módulo.
								document.querySelector('input[name="horas-idModulo-' + idModulo + '"]').value = modulo.Horas_Asignadas;
								//Asignar el coste al campo oculto correspondiente al módulo.
								document.querySelector('input[name="coste-idModulo-' + idModulo + '"]').value = costeModulo;
								//Asignar el coste aplazado al campo oculto correspondiente al módulo.
								document.querySelector('input[name="coste-idModulo-aplazado-' + idModulo + '"]').value = costeModuloAplazado;
								//Asignar el coste del primer pago aplazado al campo oculto correspondiente al módulo.
								document.querySelector('input[name="primer_pago-idModulo-aplazado-' + idModulo + '"]').value = primerPagoModuloAplazado;
								//Asignar el coste aplazado mensual al campo oculto correspondiente al módulo.
								document.querySelector('input[name="coste-idModulo-aplazado-mensual-' + idModulo + '"]').value = costeModuloAplazadoMensual;
								
								if (modulo.Curso == 1 || modulo.Curso == 2) {
    								let horasTotal = modulo.Curso == 1 ? horasTotalPrimero : horasTotalSegundo;
    								let costeTotal = modulo.Curso == 1 ? costeTotalPrimero : costeTotalSegundo;
    								let costeTotalAplazado = modulo.Curso == 1 ? costeTotalAplazadoPrimero : costeTotalAplazadoSegundo;
									let costeTotalPrimerPagoAplazadoMensual = modulo.Curso == 1 ?  costeTotalPrimerPagoAplazadoPrimero : costeTotalPrimerPagoAplazadoSegundo;
    								let costeTotalAplazadoMensual = modulo.Curso == 1 ? costeTotalAplazadoMensualPrimero : costeTotalAplazadoMensualSegundo;

    								// Actualizar horas totales
    								horasTotal = (parseInt(horasTotal) || 0) + (parseInt(modulo.Horas_Asignadas) || 0);
									
									// Sumar a las horas de matrícula final si es de tipo Matrícula
                                	if (opcion.value === "Matrícula") 
                                    	horasTotalMatriculaFinal += (parseInt(modulo.Horas_Asignadas) || 0);
									
									console.log("HORAS TOTAL MATRÍCULA FINAL = " + horasTotalMatriculaFinal);
                                	
		    						// Actualizar coste total
    								costeTotal = (parseFloat(costeTotal) || 0) + (parseFloat(costeModulo) || 0);
    								costeTotal = parseFloat(costeTotal.toFixed(2));

    								// Actualizar coste aplazado total
    								costeTotalAplazado = (parseFloat(costeTotalAplazado) || 0) + (parseFloat(costeModuloAplazado) || 0);
    								costeTotalAplazado = parseFloat(costeTotalAplazado.toFixed(2));
									
									let costePrimerPagoActual = parseFloat(document.querySelector('input[name="primer_pago-idModulo-aplazado-' + idModulo + '"]').value) || 0;
									costeTotalPrimerPagoAplazadoMensual = (parseFloat(costeTotalPrimerPagoAplazadoMensual) || 0) + costePrimerPagoActual;
									costeTotalPrimerPagoAplazadoMensual = parseFloat(costeTotalPrimerPagoAplazadoMensual.toFixed(2));

    								// Actualizar coste aplazado mensual total
    								let costeMensualActual = parseFloat(document.querySelector('input[name="coste-idModulo-aplazado-mensual-' + idModulo + '"]').value) || 0;
    								costeTotalAplazadoMensual = (parseFloat(costeTotalAplazadoMensual) || 0) + costeMensualActual;
    								costeTotalAplazadoMensual = parseFloat(costeTotalAplazadoMensual.toFixed(2));

    								// Asignar los valores actualizados
    								if (modulo.Curso == 1) {
        								horasTotalPrimero = horasTotal;
        								costeTotalPrimero = costeTotal;
        								costeTotalAplazadoPrimero = costeTotalAplazado;
										costeTotalPrimerPagoAplazadoPrimero = costeTotalPrimerPagoAplazadoMensual;
        								costeTotalAplazadoMensualPrimero = costeTotalAplazadoMensual;
    								} else {
        								horasTotalSegundo = horasTotal;
        								costeTotalSegundo = costeTotal;
        								costeTotalAplazadoSegundo = costeTotalAplazado;
										costeTotalPrimerPagoAplazadoSegundo = costeTotalPrimerPagoAplazadoMensual;
        								costeTotalAplazadoMensualSegundo = costeTotalAplazadoMensual;
    								}
								}
								
								horasTotalFinal = parseInt(horasTotalPrimero) + parseInt(horasTotalSegundo);
								costeTotalFinal = parseFloat(costeTotalPrimero) + parseFloat(costeTotalSegundo);
								costeTotalAplazadoFinal = parseFloat(costeTotalAplazadoPrimero) + parseFloat(costeTotalAplazadoSegundo);

								console.log("Horas Totales Primero = " + horasTotalPrimero);
        						console.log("Coste Total Primero = " + costeTotalPrimero);
								console.log("Coste Total Aplalzado Primero = " + costeTotalAplazadoPrimero);
								console.log("Coste Total Primer Pago Aplazado Primero = " + costeTotalPrimerPagoAplazadoPrimero);
								console.log("Coste Total Aplazado Mensual Primero = " + costeTotalAplazadoMensualPrimero);
								
								console.log("Horas Totales Segundo = " + horasTotalSegundo);
        						console.log("Coste Total Segundo = " + costeTotalSegundo);
								console.log("Coste Total Aplalzado Segundo = " + costeTotalAplazadoSegundo);
								console.log("Coste Total Primer Pago Aplazado Segundo = " + costeTotalPrimerPagoAplazadoSegundo);
								console.log("Coste Total Aplazado Mensual Segundo = " + costeTotalAplazadoMensualSegundo);
							}
							else {	
								horasTotalFinal = parseInt(horasTotalPrimero) + parseInt(horasTotalSegundo);
								
								document.querySelector('input[name="nombre-idModulo-' + idModulo + '"]').value = "";
                				document.querySelector('input[name="horas-idModulo-' + idModulo + '"]').value = "";
                    			document.querySelector('input[name="coste-idModulo-' + idModulo + '"]').value = "";
                    			document.querySelector('input[name="coste-idModulo-aplazado-' + idModulo + '"]').value = "";
								document.querySelector('input[name="primer_pago-idModulo-aplazado-' + idModulo + '"]').value = "";
								document.querySelector('input[name="coste-idModulo-aplazado-mensual-' + idModulo + '"]').value = "";
								
								console.log(document.querySelector('input[name="nombre-idModulo-' + idModulo + '"]').value);
								console.log(document.querySelector('input[name="horas-idModulo-' + idModulo + '"]').value);
								console.log(document.querySelector('input[name="coste-idModulo-' + idModulo + '"]').value);
								console.log(document.querySelector('input[name="coste-idModulo-aplazado-' + idModulo + '"]').value);
								console.log(document.querySelector('input[name="primer_pago-idModulo-aplazado-' + idModulo + '"]').value);
								console.log(document.querySelector('input[name="coste-idModulo-aplazado-mensual-' + idModulo + '"]').value);
								
								console.log("Horas Totales Primero = " + horasTotalPrimero);
        						console.log("Coste Total Primero = " + costeTotalPrimero);
								console.log("Coste Total Aplalzado Primero = " + costeTotalAplazadoPrimero);
								console.log("Coste Total Primer Pago Aplazado Primero = " + costeTotalPrimerPagoAplazadoPrimero);
								console.log("Coste Total Aplazado Mensual Primero = " + costeTotalAplazadoMensualPrimero);
								
								console.log("Horas Totales Segundo = " + horasTotalSegundo);
        						console.log("Coste Total Segundo = " + costeTotalSegundo);
								console.log("Coste Total Aplalzado Segundo = " + costeTotalAplazadoSegundo);
								console.log("Coste Total Primer Pago Aplazado Segundo = " + costeTotalPrimerPagoAplazadoSegundo);
								console.log("Coste Total Aplazado Mensual Segundo = " + costeTotalAplazadoMensualSegundo);
							}
							
							console.log("Horas Totales = " + parseInt(horasTotalPrimero + horasTotalSegundo));
							
							//Comprobación de horas totales seleccionadas
							if (horasTotalMatriculaFinal > 1000) {
                    			Swal.fire({
  									title: "ERROR: Número de horas lectivas no permitido",
  									html: "<p>No podría matricularse de un número de horas lectivas superior a 1000.</p><p>Por favor, revise su selección de módulos.</p>",
  									icon: "error"
								});
								opcion.checked = false; // Desactiva el botón
								opcion.dispatchEvent(new Event('change'));
							}
							
							document.querySelector('input[name="horas-total-primero"]').value = horasTotalPrimero;
        					document.querySelector('input[name="coste-total-primero"]').value = costeTotalPrimero;
        					document.querySelector('input[name="coste-total-aplazado-primero"]').value = costeTotalAplazadoPrimero;
							document.querySelector('input[name="coste-total-primer-pago-aplazado-primero"]').value = costeTotalPrimerPagoAplazadoPrimero;
							document.querySelector('input[name="coste-total-aplazado-mensual-primero"]').value = costeTotalAplazadoMensualPrimero;
								
							document.querySelector('input[name="horas-total-segundo"]').value = horasTotalSegundo;
        					document.querySelector('input[name="coste-total-segundo"]').value = costeTotalSegundo;
        					document.querySelector('input[name="coste-total-aplazado-segundo"]').value = costeTotalAplazadoSegundo;
							document.querySelector('input[name="coste-total-primer-pago-aplazado-segundo"]').value = costeTotalPrimerPagoAplazadoSegundo;
							document.querySelector('input[name="coste-total-aplazado-mensual-segundo"]').value = costeTotalAplazadoMensualSegundo;
							
							document.querySelector('input[name="coste-total-final"]').value = costeTotalFinal;
							document.querySelector('input[name="coste-total-aplazado-final"]').value = costeTotalAplazadoFinal;
							
							console.log("Coste Total Final = " + costeTotalFinal);
							console.log("Coste Total Aplazado Final = " + costeTotalAplazadoFinal);
							
							//Datos de régimen económico
							let costePreinscripcionFinal = 0;
							
							let costeMatriculaPrimero = 0;
							let costePrimerPagoAplazadoPrimeroConMatriculaFinal = 0;
							let costeSegundoPagoAplazadoPrimeroConMatriculaFinal = 0;
							let costePrimerPagoAplazadoPrimeroSinMatriculaFinal = 0;
							let costeSegundoPagoAplazadoPrimeroSinMatriculaFinal = 0;
							let costeTotalAplazadoMensualPrimeroFinal = 0;
							let costeTotalAplazadoPrimeroFinal = 0;
							
							let costeMatriculaSegundo = 0;
							let costePrimerPagoAplazadoSegundoConMatriculaFinal = 0;
							let costeSegundoPagoAplazadoSegundoConMatriculaFinal = 0;
							let costePrimerPagoAplazadoSegundoSinMatriculaFinal = 0;
							let costeSegundoPagoAplazadoSegundoSinMatriculaFinal = 0;
							let costeTotalAplazadoMensualSegundoFinal = 0;
							let costeTotalAplazadoSegundoFinal = 0;
							
							if((costeTotalPrimero + costeTotalSegundo) > costePreinscripcion)
								costePreinscripcionFinal = costePreinscripcion;
							else
								costePreinscripcionFinal = costeTotalPrimero + costeTotalSegundo;
						
							if(costeTotalPrimero < costePreinscripcion){
								//costePreinscripcionFinal = costeTotalPrimero;
								
								if(costeTotalSegundo > costePreinscripcion)
									costeMatriculaPrimero = costeTotalPrimero;
								else
									costeMatriculaPrimero = 0;
								
								costePrimerPagoAplazadoPrimeroConMatriculaFinal = 0;
								costeSegundoPagoAplazadoPrimeroConMatriculaFinal = 0;
								costePrimerPagoAplazadoPrimeroSinMatriculaFinal = 0;
								costeSegundoPagoAplazadoPrimeroSinMatriculaFinal = 0;
								costeTotalAplazadoMensualPrimeroFinal = 0;
								costeTotalAplazadoPrimeroFinal = 0;
							}
							else{
								costeMatriculaPrimero = parseFloat(costeTotalPrimero - costePreinscripcion).toFixed(2);
								
								costePrimerPagoAplazadoPrimeroConMatriculaFinal = costeTotalPrimerPagoAplazadoPrimero - costePreinscripcionFinal;
								costePrimerPagoAplazadoPrimeroConMatriculaFinal = parseFloat(costePrimerPagoAplazadoPrimeroConMatriculaFinal / 2).toFixed(2);
								
								costeSegundoPagoAplazadoPrimeroConMatriculaFinal = costeTotalPrimerPagoAplazadoPrimero - costePreinscripcionFinal;
								costeSegundoPagoAplazadoPrimeroConMatriculaFinal = parseFloat(costeSegundoPagoAplazadoPrimeroConMatriculaFinal / 2).toFixed(2);
								
								costePrimerPagoAplazadoPrimeroSinMatriculaFinal = costeTotalPrimerPagoAplazadoPrimero + costePreinscripcionFinal;
								costePrimerPagoAplazadoPrimeroSinMatriculaFinal = parseFloat(costePrimerPagoAplazadoPrimeroSinMatriculaFinal / 2).toFixed(2);
								
								costeSegundoPagoAplazadoPrimeroSinMatriculaFinal = costeTotalPrimerPagoAplazadoPrimero - costePreinscripcionFinal;
								costeSegundoPagoAplazadoPrimeroSinMatriculaFinal = parseFloat(costeSegundoPagoAplazadoPrimeroSinMatriculaFinal / 2).toFixed(2);	
								
								costeTotalAplazadoMensualPrimeroFinal = costeTotalAplazadoMensualPrimero;
								
								costeTotalAplazadoPrimeroFinal = costeTotalAplazadoPrimero;
							}
							
							if (costeTotalSegundo < costePreinscripcion){
								if(costeTotalPrimero > costePreinscripcion)
									costeMatriculaSegundo = costeTotalSegundo;
								else{
									if(costeTotalPrimero == 0)
										costeMatriculaSegundo = 0;
									else
										if (costeTotalSegundo > 0)
											costeMatriculaSegundo = parseFloat(costeTotalSegundo - (costePreinscripcion - costeTotalPrimero)).toFixed(2);
										else
											costeMatriculaSegundo = 0;
									}
								
								costePrimerPagoAplazadoSegundoConMatriculaFinal = 0;
								costeSegundoPagoAplazadoSegundoConMatriculaFinal = 0;
								costePrimerPagoAplazadoSegundoSinMatriculaFinal = 0;
								costeSegundoPagoAplazadoSegundoSinMatriculaFinal = 0;
								costeTotalAplazadoMensualSegundoFinal = 0;
								costeTotalAplazadoSegundoFinal = 0;
							}
							else{							
								costeMatriculaSegundo = parseFloat(costeTotalSegundo - costePreinscripcion).toFixed(2);
								
								costePrimerPagoAplazadoSegundoConMatriculaFinal = costeTotalPrimerPagoAplazadoSegundo - costePreinscripcionFinal;
								costePrimerPagoAplazadoSegundoConMatriculaFinal = parseFloat(costePrimerPagoAplazadoSegundoConMatriculaFinal / 2).toFixed(2);
								
								costeSegundoPagoAplazadoSegundoConMatriculaFinal = costeTotalPrimerPagoAplazadoSegundo - costePreinscripcionFinal;
								costeSegundoPagoAplazadoSegundoConMatriculaFinal = parseFloat(costeSegundoPagoAplazadoSegundoConMatriculaFinal / 2).toFixed(2);
								
								costePrimerPagoAplazadoSegundoSinMatriculaFinal = costeTotalPrimerPagoAplazadoSegundo + costePreinscripcionFinal;
								costePrimerPagoAplazadoSegundoSinMatriculaFinal = parseFloat(costePrimerPagoAplazadoSegundoSinMatriculaFinal / 2).toFixed(2);
								
								costeSegundoPagoAplazadoSegundoSinMatriculaFinal = costeTotalPrimerPagoAplazadoSegundo - costePreinscripcionFinal;
								costeSegundoPagoAplazadoSegundoSinMatriculaFinal = parseFloat(costeSegundoPagoAplazadoSegundoSinMatriculaFinal / 2).toFixed(2);	
								
								costeTotalAplazadoMensualSegundoFinal = costeTotalAplazadoMensualSegundo;
								
								costeTotalAplazadoSegundoFinal = costeTotalAplazadoSegundo;
							}
							
							if (costeTotalPrimero > costePreinscripcion && costeTotalSegundo > costePreinscripcion){
								costeMatriculaSegundo = costeTotalSegundo;
								costePrimerPagoAplazadoSegundoConMatriculaFinal = costePrimerPagoAplazadoSegundoSinMatriculaFinal;
							}
							
							document.querySelector('input[name="coste-preinscripcion"]').value = costePreinscripcionFinal;	
							
							//Primero
							document.querySelector('input[name="coste-matricula-primero"]').value = costeMatriculaPrimero;
							
							document.querySelector('input[name="coste-total-primer-pago-aplazado-con-preinscripcion-primero"]').value = costePrimerPagoAplazadoPrimeroConMatriculaFinal;
							document.querySelector('input[name="fecha-segundo-pago-matricula-primero"]').value = fechaSegundoPagoAplazadoPrimero;
							document.querySelector('input[name="coste-total-segundo-pago-aplazado-con-preinscripcion-primero"]').value = costeSegundoPagoAplazadoPrimeroConMatriculaFinal;
							
							document.querySelector('input[name="coste-total-primer-pago-aplazado-sin-preinscripcion-primero"]').value = costePrimerPagoAplazadoPrimeroSinMatriculaFinal;
							document.querySelector('input[name="fecha-segundo-pago-matricula-primero"]').value = fechaSegundoPagoAplazadoPrimero;
							document.querySelector('input[name="coste-total-segundo-pago-aplazado-sin-preinscripcion-primero"]').value = costeSegundoPagoAplazadoPrimeroSinMatriculaFinal;
							
							document.querySelector('input[name="numero-mensualidades-primero"]').value = numeroMensualidadesPrimero;
							document.querySelector('input[name="rango-mensualidades-primero"]').value = rangoMensualidadesPrimero;
							document.querySelector('input[name="coste-mensual-primero"]').value = costeTotalAplazadoMensualPrimeroFinal;	
							
							//Segundo			
							document.querySelector('input[name="coste-matricula-segundo"]').value = costeMatriculaSegundo;
							
							document.querySelector('input[name="coste-total-primer-pago-aplazado-con-preinscripcion-segundo"]').value = costePrimerPagoAplazadoSegundoConMatriculaFinal;
							
							document.querySelector('input[name="fecha-segundo-pago-matricula-segundo"]').value = fechaSegundoPagoAplazadoSegundo;
							document.querySelector('input[name="coste-total-segundo-pago-aplazado-con-preinscripcion-segundo"]').value = costeSegundoPagoAplazadoSegundoConMatriculaFinal;
							
							document.querySelector('input[name="coste-total-primer-pago-aplazado-sin-preinscripcion-segundo"]').value = costePrimerPagoAplazadoSegundoSinMatriculaFinal;
							document.querySelector('input[name="fecha-segundo-pago-matricula-segundo"]').value = fechaSegundoPagoAplazadoSegundo;
							document.querySelector('input[name="coste-total-segundo-pago-aplazado-sin-preinscripcion-segundo"]').value = costeSegundoPagoAplazadoSegundoSinMatriculaFinal;
							
							document.querySelector('input[name="numero-mensualidades-segundo"]').value = numeroMensualidadesSegundo;
							document.querySelector('input[name="rango-mensualidades-segundo"]').value = rangoMensualidadesSegundo;
							document.querySelector('input[name="coste-mensual-segundo"]').value = costeTotalAplazadoMensualSegundoFinal;
						});
					});
				});
				
				// Seleccionar el select de "antiguo-alumno"
    			let selectAntiguoAlumno = document.querySelector('select[name="antiguo-alumno"]');
    
    			// Añadir evento de cambio al select de "antiguo-alumno"
    			selectAntiguoAlumno.addEventListener('change', function() {
        			console.log("El select de 'antiguo-alumno' ha cambiado.");
        			// Disparar manualmente el evento 'change' para cada checkbox
        			let opciones = document.querySelectorAll('input[type="checkbox"][name^="idModulo-"]');
        			opciones.forEach((opcion) => {
						if (opcion.checked)
            				opcion.dispatchEvent(new Event('change'));
        			});
    			});
				
				let fechas = document.getElementsByClassName('wpcf7-form-control wpcf7-date');
				let fechaNacimiento = Array.from(fechas).find(fecha => fecha.type === 'date');
				
				// Añadir evento de cambio al select de "antiguo-alumno"
    			fechaNacimiento.addEventListener('change', function() {
        			console.log("El campo fecha de 'fecha de nacimiento' ha cambiado.");
        			
					//Comprobar mayoría de edad
					const inputDate = new Date(fechaNacimiento.value);
            		const today = new Date();
            		const age = today.getFullYear() - inputDate.getFullYear();
            		const monthDiff = today.getMonth() - inputDate.getMonth();
            		const dayDiff = today.getDate() - inputDate.getDate();

            		// Comprobar si tiene al menos 18 años
    				if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {                		
                		Swal.fire({
  							title: "ERROR: Fecha de nacimiento incorrecta",
  							html: "<p>Debe ser mayor de edad para poder matricularse</p><p>Por favor, revise si la fecha de nacimiento introducida es correcta.</p>",
  							icon: "error"
							});
						fechaNacimiento.value = ""; // Limpia el campo
						
						console.log("EDAD NO PERMITIDA");
            		}
					else
						console.log("EDAD PERMITIDA");
    			});
        	} else {
           		console.log("No se obtuvieron módulos.");
        	}
		});
    }).catch(error => {
        console.error("Error al obtener los módulos:", error);
    });
});