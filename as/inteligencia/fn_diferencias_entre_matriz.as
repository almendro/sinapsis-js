function fn_diferencias_entre_matriz (entrada) {
	var soy_fn="fn_diferencias_entre_matriz";
	/*
		entrada:
				array_1:
				array_2:
		salida:
				array con elementos diferentes
	*/
	var salida = [];

	for (yy=0; yy < entrada.array_1.length; yy++)  {
		for (xx=0; xx < entrada.array_1[0].length; xx++) {
			if (!(entrada.array_1[xx][yy] == entrada.array_2[xx][yy])) salida [salida.length] = [xx,yy];
		}
	}
//	tracer_lib(soy_fn,"Diferencias" + salida);
	return salida
}
