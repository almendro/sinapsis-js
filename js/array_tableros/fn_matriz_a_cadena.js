function fn_matriz_a_cadena (entrada) {
	var soy_fn="fn_matriz_a_cadena";
	// entra una matriz 2 entrada y sale una cadena (array)
	salida = []
	for (nn = 0; nn < entrada.length; nn++) for (ii = 0; ii < entrada[nn].length; ii++) salida[salida.length] = entrada[nn][ii];
	return salida
}