function codificar_tablero (param){
	var soy_fn="codificar_tablero";
	/*
	codificar_tablero ({
		matriz_columnas: Array,
		matriz_filas: Array,
		tabla_ancho_alto: [Number,Number]
	})
	*/
	tracer_fi("codificar_tablero",param);
	
	var matriz_columnas = param.matriz_columnas;
	var matriz_filas = param.matriz_filas;
	var ancho = param.tabla_ancho_alto[0];
	var alto = param.tabla_ancho_alto[1];
	
	var salida = [];
	
	for ( var f = 0; f < matriz_columnas.length; f++ ){
		salida.push (coord_a_num_lineal({
			x: matriz_columnas[f], 
			y: matriz_filas[f],
			columnas: ancho,
			filas: alto
		}) +1);// el +1 es para corregir
	}
	
	tracer_ff("codificar_tablero",salida);
	return salida;
}
