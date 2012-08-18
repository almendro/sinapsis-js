// fn_extraer_valores

function fn_extraer_valores (param){
	var soy_fn="fn_extraer_valores";
	/*
	Extrae los valores de la matriz A usando como indices los valores de la matriz B
	Devuelve una matriz con los valores
	
	fn_extraer_valores({
		matriz_a:Array,
		matriz_b:Array
	});
	
	ej: Supongamos que nos interesa extraer los valores de unas fichas para
	hacer alguna comprobacion.
	
	tablero = [0,3,3,0,3,2,0];
	indices = [0,2,4,5];
	
	porcion = fn_extraer_valores({
		matriz_a: tablero
		matriz_b: indices
	});
	
	tracer_lib(soy_fn,porcion); // => [0,3,3,2]
	
	*/
	tracer_fi("fn_extraer_valores",param);
	
	var matriz_a = param.matriz_a;
	var matriz_b = param.matriz_b;
	
	var salida = [];
	
	for(var indice=0; indice < matriz_b.length; indice++){

		var indexar = matriz_b[indice];
		salida.push( matriz_a[indexar] );

	}
	tracer_fi("fn_extraer_valores",salida);
	return salida;
}