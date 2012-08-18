function tiempo_juego (duracion:Number) {
		var soy_fn="tiempo_juego";
	/*
		La duracion se expresa en unidades de 5; o sea 1 es 5 segundos 
		para sacar el tiempo es muy simple:  duracion = segundo / 5
	*/
	if (!_level0.turbo) _level0.turbo = 0;
	
	_level0.tiempo_general = 0;
	_level0.tiempo_general_juego = duracion;
	_level0.tiempo_general_juego_txt = "";
	// el tiempo de entrada en texto
	this.createEmptyMovieClip('mc_tiempo_juego', this.getNextHighestDepth()); 
	this.mc_tiempo_juego.onEnterFrame = function () {
		_level0.tiempo_general_juego -= .006 * Math.round((_level0.turbo)+1);  
 		if (_level0.tiempo_general_juego < 0) tiempo_juego_matar ();
		if (_level0.tiempo_general_juego < .006*10) {
			fn_ani_pop ("mc_tablero", [0,0,0,0, -100], [0,10]); // cuando faltan 10 segundos
		}
		// convierte a texto
		_level0.tiempo_general_juego_txt = n_a_hora (_level0.tiempo_general_juego, true, true);
	}
	
	// NUEVO 2010-09-12
	// CREA EL PAUSADOR DE TIEMPO
	this.createEmptyMovieClip ( "mc_tiempo_pausa" , this.getNextHighestDepth ( ) ) ;
	this.mc_tiempo_pausa.onEnterFrame = function () {
		if ( _level0.juego_en_pausa ) _root.tiempo_general_juego += .006 * Math.round( ( _level0.turbo ) + 1 ) ;  // este valor esta relacionado con el de la funcion tiempo_juego.as
	}

	
}
