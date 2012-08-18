// fn_matriz_rotar_90

function fn_matriz_rotar_90 (entrada) {
	var soy_fn="fn_matriz_rotar_90";
	salida=[];
	for (var n=0; n < entrada[0].length ; n++) {
		salida[n]=[];
		for (var i=0; i < entrada.length ; i++) {
			// rota la matriz y ademas remplaza 2 x 1 y 1 x 2
			salida[n][i] = entrada[i][n]; // if comparativo
		}
	}
	tracer_lib(soy_fn,'rotando matriz');
	return salida
}