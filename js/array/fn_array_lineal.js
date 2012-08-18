//fn_array_lineal.as
function fn_array_lineal(param){
	var soy_fn="fn_array_lineal";
	/*
	Devuelve una matriz desde rango[0] a rango[1]
	donde cada nodo tiene por valor el numero de nodo
	
	fn_array_lineal({
		rango:[min,max]
	});
	
	Ej: 
	
	matriz = fn_array_lineal({
		rango:[0,10]
	});
	
	tracer_lib(soy_fn, matriz[0] ); 	// -> 0
	tracer_lib(soy_fn, matriz[1] ); 	// -> 1
	tracer_lib(soy_fn, matriz[10] ); 	// -> 10
	*/
	salida = [];
	for(var n = param.rango[0]; n < param.rango[1]; n++){
		salida[n]=n;
	}
	return salida;
}