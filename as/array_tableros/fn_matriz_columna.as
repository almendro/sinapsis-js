function fn_matriz_columna (entrada) {
	var soy_fn="fn_matriz_columna";
	/*
		entrada:
			columna: numero de columna
			array: donde quitar la columna
		salida:
			Array de forma de cadena
	*/
	// extrae una columna de una matriz 
	var salida:Array = new Array(); 
	for (i=0; i < entrada.array.length ; i++) salida[salida.length] = entrada.array[i][entrada.columna];
	return salida;
}