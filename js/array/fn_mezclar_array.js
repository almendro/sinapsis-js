function fn_mezclar_array(param){
	var soy_fn="fn_mezclar_array";
	
	tracer_fi("fn_mezclar_array",param);
	
	if ( !(param.matriz) ) {
		var matriz = param;
	} else {
		var matriz = param.matriz;
	}
	
	var salida = [];
	
	
	// generamos un listado de indices desordenado
	var rango_min = 0;
	var rango_max = matriz.length;
	
	var mezclada = fn_GC(null,[rango_min,rango_max-1],rango_max,false);
	
	salida = fn_extraer_valores({
		matriz_a: matriz,
		matriz_b: mezclada
	});
	
	tracer_ff("fn_mezclar_array",salida);
	return salida;
}