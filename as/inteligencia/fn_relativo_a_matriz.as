function fn_relativo_a_matriz (entrada) {
	var soy_fn="fn_relativo_a_matriz";
	/*
		convierte posiciones relativa a una matriz. no funciona bien por que deberia tomar a cero como la posicion central de la matriz
	
		entrada:
				array: con las posiciones relativas 
				nodo: valor que hay que poner en cada punto
				alto: alto de la matriz de salida
				ancho: ancho de la matriz de salida
				
		salida:
				matriz creada a partir de esos datos
	*/
	
	salida = fn_matriz ({ ancho: entrada.ancho, alto: entrada.alto, elemento: 0 });
	for (nn=0; nn < entrada.array.length; nn++) salida [entrada.array[nn][0]][entrada.array[nn][1]] = entrada.nodo;
	return salida
}
