function  fn_tiemp_dispara (delay:Number, funcion, parametros) {
	var soy_fn="fn_tiemp_dispara";
	/*--- crea la animacion ----*/
	anima_nombre = "animacion" +fn_azar([1,100000000]);
	MC = this.createEmptyMovieClip(anima_nombre, this.getNextHighestDepth()); 
	MC.delay = delay;
	MC.delay_actual  = 0;

	MC.onEnterFrame = function () {
			this.delay_actual ++;
			tracer_lib(soy_fn,this.delay_actual + " - " + this.delay) 
			if (this.delay == this.delay_actual) { 
				if(parametros==undefined){
					funcion(); 
				} else {
					funcion(parametros);
				}
				this.removeMovieClip();
			}

	}
	return MC
}



