function fn_limpiar_eventos(param){
	var soy_fn="fn_limpiar_eventos";
	/*
	Elimina eventos de un listado de movieclips basado en nombre+N
	Si no se define el entorno (ruta) toma el _root
	
	fn_limpiar_eventos({
		nombre_mc: String,
		ruta: MovieClip,
		listado: Array
	});
	
	_root.atril.ficha0.onRelease = soltar ;
	_root.atril.ficha1.onRelease = soltar ;
	_root.atril.ficha2.onRelease = soltar ;
	
	Ej:
		fn_limpiar_eventos({
			nombre_mc: 'ficha',
			listado: [1,2],
			ruta: _root.atril
		});
		
		tracer_lib(soy_fn,_root.atril.ficha0.onRelease) // => soltar
		tracer_lib(soy_fn,_root.atril.ficha1.onRelease) // => null
	
	NOTA MEJORAS: agregar la posibilidad de rango (ver la funcion que explora propiedades de mc.
	*/
	
	tracer_fi("fn_limpiar_eventos",param);
	
	var nombre_mc = param.nombre_mc;
	var listado = param.listado;
	var ruta = param.ruta;
	
	if(ruta=="") {
		// modo EVAL STRING 
		
		tracer_lib(soy_fn," ** modo EVAL STRING  ** ");
		
		for(var n in listado){
			fn_limpiar_eventos_mc({
				nombre_mc: nombre_mc+listado[n],
				ruta: ""
			});
		}
	
	} else {
		// modo OBJECT + STRING
	
		tracer_lib(soy_fn," ** modo OBJECT + STRING ** ");
		
		if(ruta==undefined || ruta == null) ruta=_root;
		
		for(var n in listado){
		fn_limpiar_eventos_mc({
			nombre_mc: nombre_mc+listado[n],
			ruta: ruta
			});
		}
	}

	tracer_ff("fn_limpiar_eventos",salida);
}

