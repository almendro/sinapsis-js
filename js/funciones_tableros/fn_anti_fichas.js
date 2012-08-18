function fn_anti_fichas (entrada) {
	var soy_fn="fn_anti_fichas";
	/*
		esta funcion toma los valores de las fichas y los devuelve en una cadena
			entrada:
					objetos: nombre sin numeros
					cantidad: cantidad de objetos

	*/
	salida = [];
	for (n=0; n < entrada.cantidad; n++) {
		MClip = eval(entrada.objetos + n);
		salida[n] = MClip.txt;
		tracer_lib(soy_fn,MClip + ' - '+ salida[n])
	}
	
	return salida
}

