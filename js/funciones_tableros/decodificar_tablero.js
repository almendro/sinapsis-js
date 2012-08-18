function decodificar_tablero(param){
	var soy_fn="decodificar_tablero";
	/*
	decodificar_tablero({
		tablero: Array,
		tabla_ancho_alto: [Number,Number]
	})
	*/
	
	tracer_fi("decodificar_tablero",param);
		
	var tablero = param.tablero;
	var ancho = param.tabla_ancho_alto[0];
	var alto = param.tabla_ancho_alto[1];
	
	var salida = {filas:[],columnas:[]};
	var coord;
	for ( var f = 0; f < tablero.length; f++ ){
		coord = lineal_a_coord({
			nro_ficha: tablero[f]-1,
			columnas: ancho,
			filas: alto
		});
		// tablero[f]-1 es para corregir la base de inicio de las fichas
		// ya que estan en base 1 y las coordenadas usan base en 0
		
		salida.filas.push(coord.y); // corresponde al codigo de figura
		salida.columnas.push(coord.x); // corresponde al codigo de color
	}
	
	tracer_ff("decodificar_tablero",salida);
	return salida;
}

