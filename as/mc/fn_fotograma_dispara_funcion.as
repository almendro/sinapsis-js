function fn_fotograma_dispara_funcion (e){
	var soy_fn="fn_fotograma_dispara_funcion";
	tracer_fi("fn_fotograma_dispara_funcion",e);
/*
	fn_fotograma_dispara_funcion ({
		mc: String | Array,
		fotograma: Number | String | Array (de string o number),
		funcion: String | Array de funciones,
		e: parametros
	});
	
	Se pueden poner etiquetas como fotogramas claves en el AS de flash
	Ejemplo:
			etiqueta = "fotograma clave";
			
	La variable 'etiqueta' debe estar en la linea de tiempo del MC pasado como parametro.
	
*/

	var mc = e.mc;
	var fotograma = e.fotograma;
	var funcion = e.funcion;
	var e = e.e; // parametros
	
	if(!(_level0.id_fn_fotograma_dispara_funcion)) _level0.id_fn_fotograma_dispara_funcion=0;
	
	var id;
	
	tracer_lib(soy_fn,"id = "+id);

	
	if(!(mc)) mc="this";
	
	var ultimo_fotograma = eval(mc)._totalframes;
	

	if(!(fotograma)) {
		fotograma=[ultimo_fotograma];
	} else if (typeof(fotograma)=="number" || typeof(fotograma)=="string"){
		fotograma=[fotograma];
	}
	
	if(fn_tipo_dato(funcion)!="arr"){
		funcion =[funcion];
	}
	
	if(fn_tipo_dato(e)!="arr"){
		e =[e];
	}
	
	var salida = [];
	var mc_control;
	
	for(var n = 0; n < fotograma.length; n++){
	
		id = "id_fn_fotograma_dispara_funcion_"+_level0.id_fn_fotograma_dispara_funcion++;
		mc_control = this.createEmptyMovieClip(id, this.getNextHighestDepth());
		
		trace("funcion["+n+"] "+funcion[n]);
		trace("e["+n+"] "+e[n]);
		
		mc_control.mc = mc;
		mc_control.fotograma = fotograma[n];
		mc_control.funcion = funcion[n];
		mc_control.e = e[n];
		
		mc_control.onEnterFrame = function () {
			tracer_lib(this._name,this._name+" f = "+eval(this.mc)._currentframe+" "+this.fotograma);
			if(eval(this.mc)._currentframe==this.fotograma || eval(this.mc).etiqueta == this.fotograma) {
				if (eval(this.mc).etiqueta == this.fotograma) eval(this.mc).etiqueta = ""; 
				//eval(funcion)(e);
				//this._parent[this._name+"_return"] = eval(this.funcion)(this.e);
				this._parent[this._name+"_return"] = this.funcion() || eval(this.funcion)(this.e);
				this.removeMovieClip();
			}
		}
		
		salida[n]=mc_control;
		
	}//<<< for
	
	return salida;
}