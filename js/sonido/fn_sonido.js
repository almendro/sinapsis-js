function fn_sonido(nombre_mp3:String, array:Array) {
	soy_fn="fn_sonido";
	// if(_level0.mute == true) return; // si esta en mute se va // De momento no se está usando
/*
	array:
		0: delay - NO esta aplicado todabia el sistema de Delay
			// el loop es eterno podria tener tambien una cantidad de loops
		1: repeticiones (true, false)
		TODAVIA NO FUNCIONA
*/

	sonido_mc = new Sound();
	sonido_mc.onLoad = function(success:Boolean) {
		if (success) {
			if(array[1] == true) loop = 999; else loop = array[1];
			if(array[1]) sonido_mc.start(0, loop); else sonido_mc.start();
			//fn_tiemp_dispara (Math.floor((sonido_mc.duration/1000)*24), function () {sonido_mcfn_sonido(nombre_mp3);}) //delay
		}
	};
	
	sonido_mc.loadSound("sonidos/"+nombre_mp3+".mp3", false);	// ejemplo fn_sonido('burbuja/burbuja1'); usado en asteroides.swf
	
	// parche para la musica
	var tmp = [];
	tmp = nombre_mp3.split("/");
	if(tmp[0]=="musica"){
		//_root.musica.setVolume(0);
		//fn_desvanecer_audio(100,5);
	}
	return sonido_mc;
}
