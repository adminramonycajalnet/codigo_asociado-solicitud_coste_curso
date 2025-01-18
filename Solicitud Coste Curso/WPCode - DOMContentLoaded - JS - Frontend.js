document.addEventListener('DOMContentLoaded', function() {
    // Asumiendo que necesitas obtener el ID del ciclo del formulario
    let idCiclo = document.querySelector('input[name="idCiclo"]').value;
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//------------------------------------------------- CARGA DE DATOS INICIAL AL CARGAR PÁGINA -------------------------------------------------------//
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
	// OBTENCIÓN DE VALORES CARGADOS EN BASE DE DATOS
	
	let incrementosPromesa = obtenerIncrementos();
	let descuentosPromesa = obtenerDescuentos();
	let porcentajesPromesa = obtenerPorcentajesPagoAplazado();
	let otrosCostesPromesa = obtenerOtrosCostes();
	let rangoMensualidadesPromesa = obtenerRangoMensualidades();
	let cuentasBancariasPromesa = obtenerNumerosCuentasBancarias();
	let modulosPromesa = obtenerModulos(idCiclo);
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//------------------------------------------------- VARIABLES GLOBALES -------------------------------------------------------//
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	//
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
	let numMensualidadesPrimero = 0;
	let numMensualidadesSegundo = 0;
	let rangoMensualidadesPrimero = "";
	let rangoMensualidadesSegundo = "";
	let fechaSegundoPagoAplazadoPrimero = "";
	let fechaSegundoPagoAplazadoSegundo = "";
	
	// Valores finales
    let horasTotalFinal = 0;
	let horasTotalMatriculaFinal = 0;
    let costeTotalFinal = 0.0;
    let costeTotalAplazadoFinal = 0.0;
	
	Promise.all([incrementosPromesa, 
				 descuentosPromesa, 
				 porcentajesPromesa, 
				 otrosCostesPromesa, 
				 rangoMensualidadesPromesa, 
				 cuentasBancariasPromesa, 
				 modulosPromesa]).then(results => {
		
		let incrementos = results[0];
        let descuentos = results[1];
		let porcentajes = results[2];
		let otrosCostes = results[3];
		let rangosMensualidades = results[4];
		let cuentasBancos = results[5];
		let modulos = results[6];
		
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
				numMensualidadesPrimero = rangoMensualPrimero.Numero_Mensualidades;
				numMensualidadesSegundo = rangoMensualSegundo.Numero_Mensualidades;
				rangoMensualidadesPrimero = rangoMensualPrimero.Rango_Mensualidades;
				rangoMensualidadesSegundo = rangoMensualSegundo.Rango_Mensualidades;
				fechaSegundoPagoAplazadoPrimero = rangoMensualPrimero.Fecha_Segundo_Pago + "/" + String(new Date().getFullYear() + 1);
				fechaSegundoPagoAplazadoSegundo = rangoMensualSegundo.Fecha_Segundo_Pago + "/" + String(new Date().getFullYear() + 1);
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
		
        if (!modulos) {
           	console.log("No se obtuvieron módulos.");
			modulos = null;
		}
		
		// Devolver los valores para el siguiente 'then'
        return { 
			incrementoPagoAplazado, descuentoAntiguoAlumno, porcentajePagoAplazado, cuentaBanco, modulos
		};
		
	}).then(valores => {
		let { incrementoPagoAplazado, descuentoAntiguoAlumno, porcentajePagoAplazado, cuentaBanco, modulos } = valores;
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//-------------------------------------------- TODOS LOS DATOS OBTENIDOS DE LA BASE DE DATOS----------------------------------//
		//--------------------- COMIENZA LA INICIALIZACIÓN DE LOS CAMPOS HIDDEN Y LOS CÁLCULOS DE COSTE  Y HORAS----------------------//
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	
		if (modulos) {
			// Almacenar los módulos en sessionStorage
            sessionStorage.setItem('modulos-' + idCiclo, JSON.stringify(modulos));
				
			let modulosGuardados = sessionStorage.getItem('modulos-' + idCiclo);
    		if (modulosGuardados) {
        		// Parsear los datos almacenados para convertirlos de JSON string a objeto
        		let modulos = JSON.parse(modulosGuardados);
			}
			
         	modulos.forEach(modulo => {	
				document.querySelector('input[name="nombre-idModulo-' + modulo.ID_Modulo + '"]').value = modulo.Nombre;
				document.querySelector('input[name="horas-idModulo-' + modulo.ID_Modulo + '"]').value = modulo.Horas_Asignadas;
                document.querySelector('input[name="coste-idModulo-' + modulo.ID_Modulo + '"]').value = "";
                document.querySelector('input[name="coste-idModulo-aplazado-' + modulo.ID_Modulo + '"]').value = "";
				document.querySelector('input[name="primer_pago-idModulo-aplazado-' + modulo.ID_Modulo + '"]').value = ""
				document.querySelector('input[name="coste-idModulo-aplazado-mensual-' + modulo.ID_Modulo + '"]').value = "";
					
				document.querySelector('input[name="coste-hora"]').value = modulo.Precio_Hora_Matricula;
				document.querySelector('input[name="coste-hora-aplazado"]').value = modulo.Precio_Hora_Matricula_Aplazado;
				document.querySelector('input[name="porcentaje-modulo-convalidado"]').value = (parseFloat(modulo.Precio_Hora_Convalidacion) / 		
																							   parseFloat(modulo.Precio_Hora_Matricula)) * 100;
				document.querySelector('input[name="porcentaje-primer-pago-aplazado"]').value = parseFloat(porcentaje.Porcentaje);
				document.querySelector('input[name="resto-porcentaje-pago-aplazado"]').value = 100 - parseFloat(porcentaje.Porcentaje);
					
				//Asignar número de cuenta bancario a los campos correspondientes del html final
				document.querySelector('input[name="iban-banco"]').value = cuentaBanco[0];
				document.querySelector('input[name="entidad-banco"]').value = cuentaBanco[1];
				document.querySelector('input[name="oficina-banco"]').value = cuentaBanco[2];
				document.querySelector('input[name="dc-banco"]').value = cuentaBanco[3];
				document.querySelector('input[name="numero-cuenta-banco"]').value = cuentaBanco[4];
				
				/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				//-- ASIGNACIÓN DE EVENTOS PARA CONTROL DE VALORES PREVIOS Y ACUTAL DE LOS CHECK DE MATRÍCULA Y CONVALIDACIÓN DE CADA MÓDULO --//
				/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
				
				// Asignar evento para controlar el cambio, valor actual y valor previo de los grupos checkbox de cada módulo
				let seleccion = null;
				let opciones = document.querySelectorAll('input[name="idModulo-' + modulo.ID_Modulo + '"]');
					
				const valoresGrupos = {};
				opciones.forEach((opcion) => {
					const grupo = opcion.name;
					// Inicializar el grupo en valoresGrupos si no existe
    				if (!valoresGrupos[grupo]) {
        				valoresGrupos[grupo] = {
            				valorPrevio: null,
            				valorActual: null,
        				};
    				}
						
				opcion.addEventListener('change', (event) =>{
					const estadoAnterior = valoresGrupos[grupo].valorActual;
							
					if (!opcion.checked) 
            			valoresGrupos[grupo].valorActual = null; // Deselección
        			else 
            			valoresGrupos[grupo].valorActual = event.target.value; // Selección
				});
				
				////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				//------------ ASIGNACIÓN DE EVENTOS PARA CONTROL DE CAMBIO DE LOS CHECK DE MATRÍCULA Y CONVALIDACIÓN DE CADA MÓDULO ---------//
				//-------------------- CADA VEZ QUE SE CLICKA EN ALGUNA DE LAS OPCIONES SE RECALCULAN LOS COSTES Y HORAS ---------------------//
				////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
						
				opcion.addEventListener('change', function() {
					// Obtener el ID del módulo desde el atributo "name" del checkbox
            		let idModulo = opcion.name.split('-')[1];
					let antiguoAlumno = document.querySelector('select[name="antiguo-alumno"]').value;
					
					////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					//--- OBTENCIÓN DE VALORES YA ASIGNADOS AL MÓDULO SOBRE CUYOS CHECK SE HA CLICKADO PARA POSIBLE RESTA O SUMA SOBRE EL TOTAL---//
					////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
							
					// Obtener valores actuales del módulo
					let horasPrevias = parseFloat(document.querySelector('input[name="horas-idModulo-' + idModulo + '"]').value) || 0;
        			let costePrevio = parseFloat(document.querySelector('input[name="coste-idModulo-' + idModulo + '"]').value) || 0;
        			let costeAplazadoPrevio = parseFloat(document.querySelector('input[name="coste-idModulo-aplazado-' + idModulo + '"]').value) || 0;
					let costePrimerPagoAplazadoPrevio = parseFloat(document.querySelector('input[name="primer_pago-idModulo-aplazado-' + idModulo + '"]').value) || 0;
       	 			let costeMensualPrevio = parseFloat(document.querySelector('input[name="coste-idModulo-aplazado-mensual-' + idModulo + '"]').value) || 0;
							
					let restaPrevias = false;
							
					const estadoAnterior = valoresGrupos[grupo].valorPrevio;
        			const estadoActual = valoresGrupos[grupo].valorActual;
							
					// Restar horas previas de las totales generales y de matrícula
                    if (!opcion.checked && estadoAnterior === "Matrícula")
                    	restaPrevias = true;
					else if (estadoActual === "Matrícula" && (estadoAnterior === "Convalidación" || estadoAnterior === "Excención"))
						restaPrevias = false;
					else if((estadoActual === "Convalidación" || estadoActual === "Exención") && estadoAnterior === "")
							restaPrevias = false;
					else if ((estadoActual == "Convalidación" || estadoActual === "Exención") && estadoAnterior == "Matrícula"){
						restaPrevias = true;
						horasTotalMatriculaFinal -= horasPrevias;
					}else
						restaPrevias = false;
					
					// Incrementar o restar según corresponda
					if (restaPrevias == true) {
                    	if (modulo.Curso == 1) {
                           	horasTotalPrimero -= horasPrevias;
							
						}
                         else if (modulo.Curso == 2){
                         	horasTotalSegundo -= horasPrevias;
							 
						 }
					    
						horasTotalMatriculaFinal -= (opcion.value == "Matrícula")  ? horasPrevias : 0;
					}   	
					// Actualizar valor previo
        			valoresGrupos[grupo].valorPrevio = estadoActual;
						
        			// Restar valores previos de los totales
    				let horasTotal = modulo.Curso == 1 ? horasTotalPrimero : horasTotalSegundo;
    				horasTotal += horasPrevias;
    				let costeTotal = modulo.Curso == 1 ? costeTotalPrimero : costeTotalSegundo;
    				let costeTotalAplazado = modulo.Curso == 1 ? costeTotalAplazadoPrimero : costeTotalAplazadoSegundo;
					let costeTotalPrimerPagoAplazado = modulo.Curso == 1 ? costeTotalPrimerPagoAplazadoPrimero : costeTotalPrimerPagoAplazadoSegundo;
    				let costeTotalAplazadoMensual = modulo.Curso == 1 ? costeTotalAplazadoMensualPrimero : costeTotalAplazadoMensualSegundo;
								
					if(horasTotal > 0)
    					horasTotal -= parseInt(horasPrevias) || 0;
								
					costeTotal = parseFloat(costeTotal - costePrevio).toFixed(2);//
    				costeTotalAplazado = parseFloat(costeTotalAplazado - costeAplazadoPrevio).toFixed(2);		
					
					costeTotalPrimerPagoAplazado = parseFloat(costeTotalPrimerPagoAplazado - costePrimerPagoAplazadoPrevio).toFixed(2);
    				costeTotalAplazadoMensual = parseFloat(costeTotalAplazadoMensual - costeMensualPrevio).toFixed(2);

					horasTotalPrimero = modulo.Curso == 1 ? horasTotal : horasTotalPrimero;
					horasTotalSegundo = modulo.Curso == 2 ? horasTotal : horasTotalSegundo;

					costeTotalPrimero = modulo.Curso == 1 ? costeTotal : costeTotalPrimero;
					costeTotalSegundo = modulo.Curso == 2 ? costeTotal : costeTotalSegundo;

					costeTotalAplazadoPrimero = modulo.Curso == 1 ? costeTotalAplazado : costeTotalAplazadoPrimero;
					costeTotalAplazadoSegundo = modulo.Curso == 2 ? costeTotalAplazado : costeTotalAplazadoSegundo;
					
					costeTotalPrimerPagoAplazadoPrimero = modulo.Curso == 1 ? costeTotalPrimerPagoAplazado : costeTotalPrimerPagoAplazadoPrimero;
					costeTotalPrimerPagoAplazadoSegundo = modulo.Curso == 2 ? costeTotalPrimerPagoAplazado : costeTotalPrimerPagoAplazadoSegundo;

					costeTotalAplazadoMensualPrimero = modulo.Curso == 1 ? costeTotalAplazadoMensual : costeTotalAplazadoMensualPrimero;
					costeTotalAplazadoMensualSegundo = modulo.Curso == 2 ? costeTotalAplazadoMensual : costeTotalAplazadoMensualSegundo;
							
					horasTotalFinal = parseInt(horasTotalPrimero) + parseInt(horasTotalSegundo);
					costeTotalFinal = parseFloat(costeTotalPrimero) + parseFloat(costeTotalSegundo);
					costeTotalAplazadoFinal = parseFloat(costeTotalAplazadoPrimero) + parseFloat(costeTotalAplazadoSegundo);
							
					////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					//----------------- ASIGNACIÓN DE NOMBRE Y HORAS A LOS CAMPOS OCULTOS DE TODOS LOS MÓDULOS, SE SELECCIONEN O NO --------------//
					////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
							
					document.querySelector('input[name="nombre-idModulo-' + idModulo + '"]').value = modulo.Nombre;
					document.querySelector('input[name="horas-idModulo-' + idModulo + '"]').value = modulo.Horas_Asignadas;
					
					////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					//----------------------- CÁLCULOS A REALIZAR SI SE PRESIONA MATRÍCULA O CONVALIDACIÓN DE CADA MÓDULO ------------------------//
					////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
				
					costeTotal = modulo.Curso == 1 ? costeTotalPrimero : costeTotalSegundo;
					costeTotalAplazado = modulo.Curso == 1 ? costeTotalAplazadoPrimero : costeTotalAplazadoSegundo;
					costeTotalPrimerPagoAplazado = modulo.Curso == 1 ? costeTotalPrimerPagoAplazadoPrimero : costeTotalPrimerPagoAplazadoSegundo;
					let costeTotalPrimerPagoAplazadoMensual = modulo.Curso == 1 ?  costeTotalPrimerPagoAplazadoPrimero : costeTotalPrimerPagoAplazadoSegundo;
					
					
					//Asignar el nombre al campo oculto correspondiente al módulo.
					document.querySelector('input[name="nombre-idModulo-' + idModulo + '"]').value = modulo.Nombre;
					document.querySelector('input[name="horas-idModulo-' + idModulo + '"]').value = modulo.Horas_Asignadas;
					
					if (opcion.checked) {
                		let seleccion = opcion.value; // Puede ser "Matrícula", "Convalidación" o "Exención" este último en el caso de FCT
						let modulosGuardados = sessionStorage.getItem('modulos-' + idCiclo);
						let modulo = null;
						
						if (modulosGuardados) {
        					let modulos = JSON.parse(modulosGuardados);
        					modulo = modulos.find(modulo => modulo.ID_Modulo == idModulo);
    					}	
					
						let costeModulo = calcularCosteModulo(modulo, seleccion, antiguoAlumno);
						let costeModuloAplazado = calcularCosteModuloAplazado(costeModulo, incrementoPagoAplazado);
						let primerPagoModuloAplazado = calcularPrimerPagoModuloAplazado(costeModuloAplazado, porcentajePagoAplazado);
						let numMensualidades = modulo.Curso == 1 ? numMensualidadesPrimero : numMensualidadesSegundo;
						let costeModuloAplazadoMensual = calcularCosteModuloAplazadoMensualidad(costeModuloAplazado, porcentajePagoAplazado, modulo.Curso,  numMensualidades);

						//Asignar el coste al campo oculto correspondiente al módulo.
						document.querySelector('input[name="coste-idModulo-' + idModulo + '"]').value = costeModulo;
						document.querySelector('input[name="coste-idModulo-aplazado-' + idModulo + '"]').value = costeModuloAplazado;
						document.querySelector('input[name="primer_pago-idModulo-aplazado-' + idModulo + '"]').value = primerPagoModuloAplazado;
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
                           	if (opcion.value == "Matrícula") 
                            	horasTotalMatriculaFinal += (parseInt(modulo.Horas_Asignadas) || 0);
                                	
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
					}
					else {	
    					let costeTotal = modulo.Curso == 1 ? costeTotalPrimero : costeTotalSegundo;
    					let costeTotalAplazado = modulo.Curso == 1 ? costeTotalAplazadoPrimero : costeTotalAplazadoSegundo;
						let costeTotalPrimerPagoAplazado = modulo.Curso == 1 ? costeTotalPrimerPagoAplazadoPrimero : costeTotalPrimerPagoAplazadoSegundo;
    					let costeTotalAplazadoMensual = modulo.Curso == 1 ? costeTotalAplazadoMensualPrimero : costeTotalAplazadoMensualSegundo;
							
						horasTotalFinal = parseInt(horasTotalPrimero) + parseInt(horasTotalSegundo);
						
						//Asignar el coste a los campo ocultos correspondientes al módulo.
                    	document.querySelector('input[name="coste-idModulo-' + idModulo + '"]').value = "";
                    	document.querySelector('input[name="coste-idModulo-aplazado-' + idModulo + '"]').value = "";
						document.querySelector('input[name="primer_pago-idModulo-aplazado-' + idModulo + '"]').value = ""
						document.querySelector('input[name="coste-idModulo-aplazado-mensual-' + idModulo + '"]').value = "";
					}
										
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
							
					///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					//------------------------------------------------- RÉGIMEN ECONÓMICO -------------------------------------------------------//
					///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
							
					//CÁLCULO DE VALORES PARA RÉGIMEN ECONÓMICO
					//PRIMERO
					let preinscripcionRE= calcularCostePreinscripcion(costeTotalPrimero, costeTotalSegundo, costePreinscripcion);
							
					let matriculaContadoConPreinsPrimeroRE = matriculaContadoConPreinsPrimero(costeTotalPrimero, costeTotalSegundo, costePreinscripcion);
					let primerPagoAplPrimeroConPreinsRE = primerPagoApl(costeTotalAplazadoPrimero, costeTotalAplazadoPrimero, 
																		costePreinscripcion, porcentajePagoAplazado, true, 1);
					let segundoPagoPrimeroRE = segundoPagoApl(costeTotalAplazadoPrimero, costeTotalAplazadoPrimero, 
																		costePreinscripcion, porcentajePagoAplazado, true, 1);
					let primerPagoAplPrimeroSinPreinsRE = primerPagoApl(costeTotalAplazadoPrimero, costeTotalAplazadoPrimero, 
																		costePreinscripcion, porcentajePagoAplazado, false, 1);
					let mensualidadesPrimeroRE = mensualidades(costeTotalAplazadoPrimero, costePreinscripcion, porcentajePagoAplazado, numMensualidadesPrimero);
					let costeTotalAplPrimeroRE = costeTotalAplPrimero(costeTotalPrimero, costeTotalAplazadoPrimero, costePreinscripcion);

					//SEGUNDO
					let matriculaContadoConPreinsSegundoRE = matriculaContadoConPreinsSegundo(costeTotalSegundo, costeTotalPrimero, costePreinscripcion);
					let primerPagoAplSegundoConPreinsRE = primerPagoApl(costeTotalAplazadoSegundo, costeTotalAplazadoPrimero, 
																		costePreinscripcion, porcentajePagoAplazado, true, 2);
					let mensualidadesSegundoRE = mensualidades(costeTotalAplazadoSegundo, costePreinscripcion, porcentajePagoAplazado, numMensualidadesSegundo);
					let segundoPagoSegundoRE = segundoPagoApl(costeTotalAplazadoSegundo, costeTotalAplazadoPrimero, 
																		costePreinscripcion, porcentajePagoAplazado, true, 2);
					let primerPagoAplSegundoSinPreinsRE =  primerPagoApl(costeTotalAplazadoSegundo, costeTotalAplazadoPrimero, 
																		 costePreinscripcion, porcentajePagoAplazado, false, 2);
							
					//ASIGNACIÓN DE VALORES PARA RÉGIMEN ECONÓMICO
					document.querySelector('input[name="coste-preinscripcion"]').value = preinscripcionRE;	
							
					//PRIMERO
					document.querySelector('input[name="coste-matricula-primero"]').value = matriculaContadoConPreinsPrimeroRE;
							
					document.querySelector('input[name="coste-total-primer-pago-aplazado-con-preinscripcion-primero"]').value = primerPagoAplPrimeroConPreinsRE;
					document.querySelector('input[name="fecha-segundo-pago-matricula-primero"]').value = fechaSegundoPagoAplazadoPrimero;
					document.querySelector('input[name="coste-total-segundo-pago-aplazado-con-preinscripcion-primero"]').value = segundoPagoPrimeroRE;
							
					document.querySelector('input[name="coste-total-primer-pago-aplazado-sin-preinscripcion-primero"]').value = primerPagoAplPrimeroSinPreinsRE;
					document.querySelector('input[name="fecha-segundo-pago-matricula-primero"]').value = fechaSegundoPagoAplazadoPrimero;
					document.querySelector('input[name="coste-total-segundo-pago-aplazado-sin-preinscripcion-primero"]').value = segundoPagoPrimeroRE;
							
					document.querySelector('input[name="numero-mensualidades-primero"]').value = numMensualidadesPrimero;
					document.querySelector('input[name="rango-mensualidades-primero"]').value = rangoMensualidadesPrimero;
					document.querySelector('input[name="coste-mensual-primero"]').value = mensualidadesPrimeroRE;
					if(mensualidadesPrimeroRE > 0)
						document.querySelector('input[name="coste-total-aplazado-primero-regimen-economico"]').value = costeTotalAplazadoPrimero;
					else
						document.querySelector('input[name="coste-total-aplazado-primero-regimen-economico"]').value = 0;
							
					//SEGUNDO			
					document.querySelector('input[name="coste-matricula-segundo"]').value = matriculaContadoConPreinsSegundoRE;
							
					document.querySelector('input[name="coste-total-primer-pago-aplazado-con-preinscripcion-segundo"]').value = primerPagoAplSegundoConPreinsRE;
					document.querySelector('input[name="fecha-segundo-pago-matricula-segundo"]').value = fechaSegundoPagoAplazadoSegundo;
					document.querySelector('input[name="coste-total-segundo-pago-aplazado-con-preinscripcion-segundo"]').value = segundoPagoSegundoRE;
							
					document.querySelector('input[name="coste-total-primer-pago-aplazado-sin-preinscripcion-segundo"]').value = primerPagoAplSegundoSinPreinsRE;
					document.querySelector('input[name="fecha-segundo-pago-matricula-segundo"]').value = fechaSegundoPagoAplazadoSegundo;
					document.querySelector('input[name="coste-total-segundo-pago-aplazado-sin-preinscripcion-segundo"]').value = segundoPagoSegundoRE;
							
					document.querySelector('input[name="numero-mensualidades-segundo"]').value = numMensualidadesSegundo;
					document.querySelector('input[name="rango-mensualidades-segundo"]').value = rangoMensualidadesSegundo;
					document.querySelector('input[name="coste-mensual-segundo"]').value = mensualidadesSegundoRE;
					if(mensualidadesSegundoRE > 0)
						document.querySelector('input[name="coste-total-aplazado-segundo-regimen-economico"]').value = costeTotalAplazadoSegundo;
					else
						document.querySelector('input[name="coste-total-aplazado-segundo-regimen-economico"]').value = 0;
					});
			});
		});
		
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//---------------------- ASIGNACIÓN DE EVENTOS PARA CONTROL DE CAMBIO DEL SELECT DE ANTIGUO ALUMNO ----------------------------//
		//------------------ CADA VEZ QUE SE CAMBIA SU VALOR SE LANZAN TODOS LOS CHANGE DE LOS CHECKBOX DE LOS MÓDULOS ----------------//
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
		
		// Seleccionar el select de "antiguo-alumno"
    	let selectAntiguoAlumno = document.querySelector('select[name="antiguo-alumno"]');
    
    	// Añadir evento de cambio al select de "antiguo-alumno"
    	selectAntiguoAlumno.addEventListener('change', function() {
			horasTotalMatriculaFinal = 0;
			
			if (selectAntiguoAlumno.value == "Si")
				document.querySelector('input[name="descuento-antiguo-alumno"]').value = descuentoAntiguoAlumno;
			else
				document.querySelector('input[name="descuento-antiguo-alumno"]').value = "0";
						
        	// Disparar manualmente el evento 'change' para cada checkbox
        	let opciones = document.querySelectorAll('input[type="checkbox"][name^="idModulo-"]');
        	opciones.forEach((opcion) => {
				if (opcion.checked)
            		opcion.dispatchEvent(new Event('change'));	
        	});
    	});
			
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//--------------------------------- ASIGNACIÓN DE EVENTOS PARA CONTROL MAYORÍA DE EDAD ----------------------------------------//
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
				
		let fechas = document.getElementsByClassName('wpcf7-form-control wpcf7-date');
		let fechaNacimiento = Array.from(fechas).find(fecha => fecha.type === 'date');

		// Añadir evento de cambio al input de "fecha de nacimiento"
    	fechaNacimiento.addEventListener('blur', function() {	
					
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
            }	
    	});
      } 
    }).catch(error => {
        console.error("Error al obtener datos de la base de datos:", error);
    });
});