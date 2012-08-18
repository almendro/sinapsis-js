function lineal_a_coord(param){
	var soy_fn="lineal_a_coord";
	/*
	Convierte una numero de posicion lineal en su equivalente en coordenadas X,Y.
	Sirve para saber la coordenada de una ficha.
	
	tablero = [0,...,15]
	
	representa un tablero de 5x5 (ojo, no confundir con una matriz de doble entrada)
	
	columna     0    1    2    3
	
	tablero = [ 0 ,  1 ,  2 ,  3 ,			0 filas
	            4 ,  5 ,  6 ,  7 ,			1
						  8 ,  9 , 10 , 11 ,			2
						 12 , 13 , 14 , 15 ];			3
	
	
	Devuelve un objeto con propiedades x,y
	
	Importante: El nro. de ficha debe esta basado en cero.
	
	Ej: ficha 9 -> x=1, y=2
	
	lineal_a_coord({
		nro_ficha:Number,
		columnas:Number,
	});
	*/
	
	tracer_fi("lineal_a_coord",param);
	
	var nro_ficha = param.nro_ficha
	var columnas = param.columnas;

	var salida = {};
	salida.y = Math.floor (nro_ficha / columnas); // fila
	salida.x = nro_ficha - (columnas * salida.y); // columna
	
	tracer_ff("lineal_a_coord",salida);
	return salida;
}

/*
HISTORIAL

8/6/2010
hay que pasar como parametros obligatorios el numero de columnas (las filas las deduce solo)
Hay unas versiones mejoradas en fn_pos_xy.as
*/