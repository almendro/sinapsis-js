function fn_fade_sonido(e){
	// cambia de manera progresiva el sonido para hacer fade in y out
	
	// por defecto hace FADE IN, pone el volumen a cero y sube a 100
	/*
		fn_fade_sonido ({
			sonido: Object,
			direccion: String, //  "in" || "out"
			volumen: Number,
			volumen_limite: Number,
			factor: Number, // 2.5 x defecto
			funcion: Function, // funcion a dispara cuando termine el fade (opcional)
			e: Cualquiera // parametros para la funcion (opcional)
		});
	*/
	
	trace(" FADE e = "+ver(e));
	
	var sonido = e.sonido;
	
	var direccion = e.direccion==undefined?"in":e.direccion;
	var signo = direccion=="in"?1:-1;
	
	var volumen = ( e.volumen==undefined && direccion=="in" ) ? 1 : e.volumen; // para hacer el fade in por defecto ponemos el volumen a cero
	
	// si no de define el volumen limite se pone 100 para cuando es "in" o' 0 (cero) para cuando es "out"
	var volumen_limite = e.volumen_limite!=undefined ? e.volumen_limite : direccion=="in" ? 100 : 0 ;
	
	var factor = e.factor==undefined ? 2.5 : e.factor;
	
	trace ("direccion "+direccion);
	trace ("signo "+signo);
	trace ("volumen "+volumen);
	trace ("volumen_limite "+volumen_limite);
	trace ("factor "+factor);
	
	volumen+= (volumen/factor)*signo;
	sonido.setVolume(volumen);
	
	if(
	(volumen < volumen_limite && direccion=="in")
	||
	(volumen > volumen_limite && direccion=="out")
	) {
		e.volumen = volumen;
		e.direccion = direccion;
		e.volumen_limite = volumen_limite;
		e.factor = factor;
		
		fn_tiemp_dispara(3,fn_fade_sonido,e);
		
	} else {
	
		sonido.setVolume(volumen_limite);
		e.funcion(e.e);
		
	}
}