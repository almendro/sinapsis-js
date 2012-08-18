function fn_matriz_flop (entrada) {
	var soy_fn="fn_matriz_flop";
	salida=[];
	for (n=0; n < entrada.length ; n++) {
		salida[n]=[];
		for (i=0; i < entrada[0].length ; i++) {
			// rota la matriz y ademas remplaza 2 x 1 y 1 x 2
			salida[n][i] = entrada[entrada.length-n-1][i]==1?2:entrada[entrada.length-n-1][i]==2?1:entrada[entrada.length-n-1][i]; // if comparativo
		}
	}
	tracer_lib(soy_fn,'rotando matriz');
	return salida
}