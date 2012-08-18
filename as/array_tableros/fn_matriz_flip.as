function fn_matriz_flip (entrada) {
	var soy_fn="fn_matriz_flip";
	salida=[];
	for (n=0; n < entrada.length ; n++) {
		salida[n]=[];
		for (i=0; i < entrada[0].length ; i++) {
			// rota la matriz y ademas remplaza 2 x 1 y 1 x 2
			salida[n][i] = entrada[n][entrada[0].length-i-1]==1?2:entrada[n][entrada[0].length-i-1]==2?1:entrada[n][entrada[0].length-i-1]; // if comparativo
		}
	}
	tracer_lib(soy_fn,'rotando matriz');
	return salida
}