function fn_matriz  (entrada) {
	var soy_fn="fn_matriz";
		/*
			entrada: 
						ancho:	cantidad de elementos de ancho
						alto:	cantidad de elementos de alto
						elemento: con el que llenar la matriz
			salida:
						devuelve una matriz de ancho y alto determinado		
		*/
		
		salida = [];
		for (yy = 0; yy < entrada.alto; yy++)  {
			salida[yy] = [];
			for (xx = 0; xx < entrada.ancho; xx++) salida[yy][xx] = entrada.elemento;
		}
		return salida
}
