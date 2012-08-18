function fn_posicion_en_matriz (entrada) {
	var soy_fn="fn_posicion_en_matriz";
	/*
		entrada:
			tamanio_casilla:	40
			mc:		nombre del MClip pieza
			tablero:	
	
		salida:
			x:		en la matriz
			y:		en la matriz
			array:	matriz de la pieza
		
	*/
	MClip = eval(entrada.mc); // Pieza
	//----------------calculos de posicion
	salida = {};	
	salida.x = Math.round(MClip._x/entrada.tamanio_casilla);
	salida.y = Math.round(MClip._y/entrada.tamanio_casilla);
	
	//------ propiedades del MClip-------------
	salida.array = MClip.array;
	salida.sostiene = MClip.sostiene;
	salida.id = MClip._name;
	salida.valor = MClip.valor; // para compatibilizarlo con el viejo juego
	
	// si la pieza se sobre sale da un error

/*	
	//---------trace-------------
	tracer_lib(soy_fn,"=============");
	tracer_lib(soy_fn,MClip.array);
	tracer_lib(soy_fn,"x: " + salida.x);
	tracer_lib(soy_fn,"y: " + salida.y);
	tracer_lib(soy_fn,"array: " + salida.array);
*/
	return salida

}
