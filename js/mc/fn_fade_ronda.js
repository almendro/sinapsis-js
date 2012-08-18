function fn_fade_ronda(param){
	/*
	fn_fade_ronda({
		escenario:[ancho_px,alto_px],
		tipo: ">","<","><"
		fotogramas: Number || [delay,duracion],
		que_color: 0xffffff
		funcion: funcion de retorno
	});
	*/
	
	var escenario_ancho = param.escenario[0];
	var escenario_alto = param.escenario[1];
	var fotogramas = param.fotogramas;
	var que_color = param.que_color;
	
	if(param.escenario == undefined){
		var escenario_ancho = Stage.width * 1.1;
		var escenario_alto = Stage.height * 1.1;
	}
	
	if(param.que_color == undefined){
		var que_color = 0xffffff;
	}
	
	if(fotogramas==undefined) fotogramas = 24;
	
	if(typeof(fotogramas)=="number"){
		var delay = Math.floor(fotogramas/2);
		var duracion = Math.ceil(fotogramas/2);
	} else {
		var delay = param.fotogramas[0];
		var duracion = param.fotogramas[1];
	}
	
	/* remplazar esto por la funcion de geometria */
	
	fade_mc.removeMovieClip();
	createEmptyMovieClip("fade_mc", this.getNextHighestDepth());
	
	if (!(param.tipo == "<")) fade_mc._alpha = 0;
	
	fade_mc.beginFill(que_color);
	fade_mc.moveTo(0,0);
	fade_mc.lineTo(escenario_ancho,0);
	fade_mc.lineTo(escenario_ancho,escenario_alto);
	fade_mc.lineTo(0,escenario_alto);
	fade_mc.lineTo(0,0);
	fade_mc.endFill();

	if (param.tipo == "<") {
		fn_ani_pop ("fade_mc", [0,0,0,0,-100], [delay,duracion]);
	} else {
		fn_ani_pop ("fade_mc", [0,0,0,0,100], [delay,duracion]);
		if (param.tipo == "><") {
			fn_ani_pop ("fade_mc", [0,0,0,0,-100], [delay+duracion+1,duracion]);
		}
	}
	fn_tiemp_dispara (delay+duracion+1, param.funcion);
}