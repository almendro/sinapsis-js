
function fn_ani_pop (mc:String, escala:Array, fts:Array, tipo:String, funcion) {
	var soy_fn="fn_ani_pop";
	/*
		mc: MovieClip en string
		escala:[ x, y , w, h, alfa ,... ]
		fts: [0, 0] 
			0- Delay
			1- largo de la animacion en fotogramas 
			
	*/
	
	MClip = eval(mc);
	if(fts == undefined) fts = [0,1];
		
	anima_nombre = "animacion" +fn_azar([1,100000000]);
	
	MClip.createEmptyMovieClip(anima_nombre, MClip.getNextHighestDepth()); 

	MClip[anima_nombre].escala =  escala;
	tracer_lib(soy_fn,"Posiciones finales ----> " +anima_nombre + " - "+  escala);
	MClip[anima_nombre].fts = fts;
	MClip[anima_nombre].fts_actual = 0;
	MClip[anima_nombre].fts_delay_actual= 0;
	MClip[anima_nombre].tipo= tipo;

	/*--- LInea de tiempo ----*/
	
	// funcion global para desarrollo
	 fn_ani_linea_tiempo (mc, escala, fts, tipo);
	 
	/*--- crea la animacion ----*/
	
	MClip[anima_nombre].onEnterFrame = function () {
		if (this.fts[0] == this.fts_delay_actual) {
			this.rt = 1 / this.fts[1];
			if(this.tipo == 'cos')	this.rt = (1 - Math.cos( 3.14 / this.fts[1]   *  this.fts_actual)) / this.fts[1] ;
			
			this._parent._x +=  this.escala[0]  * this.rt ;
			this._parent._y += this.escala[1] * this.rt ;
			this._parent._xscale += this.escala[2]  * this.rt ;
			this._parent._yscale += this.escala[3] * this.rt;
			this._parent._alpha += this.escala[4]  *this.rt ;
			this._parent._rotation += this.escala[5]  *this.rt ;
			this.fts_actual ++;
			
			tracer_lib(soy_fn,this._parent._y)
			
			// funcion global para desarrollo
			 fn_ani_linea_tiempo_posicion (this);
			
			if (this.fts[1] == this.fts_actual) {
				funcion();
				this.removeMovieClip();
				this = undefined;
			}
		} else {
				this.fts_delay_actual  ++ ;
		}
		
	}
	return MClip[anima_nombre]
}
