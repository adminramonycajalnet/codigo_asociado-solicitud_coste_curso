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
   console.log("Coste = " + coste);
   return (Math.round(coste * 10) / 10).toFixed(2);
}