#include "../array/fn_mezclar_array.as"

function fn_repartir_en_grupos_al_azar (e){
	/*
	
	Reparte X cantidad en G grupos, y devuelve una matriz con la cantidad de elementos que le corresponde a cada grupo.
	
	Sintaxis:
	
	fn_repartir_en_grupos_al_azar ({
		cantidad: Number,
		grupos: Number
	});
	
	Nota: si la cantidad a repartir es menor al numero de grupos entonces devuelve un solo grupo con toda la cantidad.
	
	Ejemplo:
	
		piedras = 10;
		hoyos = 3;
		
		grupos = fn_repartir_en_grupos_al_azar ({
			cantidad: piedras,
			grupos: hoyos
		});
	
		trace (grupos); // 3,2,5   --- 3+2+5 = 10
		
	*/
	
	// DEV >>>
	var soy_fn="fn_repartir_en_grupos_al_azar";
	tracer_fi(soy_fn,param);
	// <<< DEV
	
	var cantidad = e.cantidad;
	var grupos = e.grupos;
	
	var salida = [];
	
	if(cantidad<grupos) return [cantidad]; // si la cantidad es menor, salimos con un solo grupo.
	
	var cantidad_por_grupo = Math.floor(cantidad/grupos); // redondeamos para abajo. Importante no cambiar esto.
	
	for ( var g = 0 ; g < grupos ; g ++ ) {
		salida [ g ] = fn_azar ( [ 1 , cantidad_por_grupo ] ); // seleccionamos al azar la cantidad dentro del limite por grupo.
		cantidad -= salida [ g ]; // vamos dejando el resto para el u'ltimo grupo.
	}
	salida[salida.length-1] += cantidad; // en el u'ltimo tramo juntamos lo que haya sobrado
	
	salida = fn_mezclar_array(salida); // mezclamos todo
	
	// DEV >>>
	tracer_ff(soy_fn,salida);
	// <<< DEV
	
	return salida;
}