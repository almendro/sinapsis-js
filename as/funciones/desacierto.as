function desacierto () {
	var soy_fn="desacierto";
	/* 
		Funcion que determina que hubo 1 desacerto
		ADVERTENCIA: NO USAR COMO FUNCION DE FINAL DEL JUEGO
		Esta funcion PUEDE SER REMPLAZADA POR EL JUEGO!
	*/

	this.play();
	tracer_lib(soy_fn,'perdio');
	fn_gf_mal ();
	fn_elimina_eventos ()
}
