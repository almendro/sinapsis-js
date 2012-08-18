function fn_matriz_a_posicion  (entrada)  {
	var soy_fn="fn_matriz_a_posicion";

	MClip = eval(entrada.mc); // Pieza
	//----------------calculos de posicion	
	MClip._x = Math.round(entrada.x*entrada.tamanio_casilla);
	MClip._y = Math.round(entrada.y*entrada.tamanio_casilla);
	
}