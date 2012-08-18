function acierto (eleccion) {
	var soy_fn="acierto";
	/* 
		Funcion que determina que hubo 1 acierto 
		ADVERTENCIA: NO USAR COMO FUNCION DE FINAL DEL JUEGO
		Esta funcion PUEDE SER REMPLAZADA POR EL JUEGO!
	*/
	
	this.play();
	tracer_lib(soy_fn,'gano');
	fn_gf_bien ();
	fn_elimina_eventos ()
}
