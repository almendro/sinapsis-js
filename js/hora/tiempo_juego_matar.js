/* esta tambien se puede reemplazar segun convenga */
function tiempo_juego_matar () {
	var soy_fn="tiempo_juego_matar";
	/*
		Aca deberia ir algo mas, como acciones despues de que el juego termina
	*/
	ir_a_inicio();
	this.mc_tiempo_juego.removeMovieClip();
	this.mc_tiempo_pausa.removeMovieClip();
}
