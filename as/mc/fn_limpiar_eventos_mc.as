function fn_limpiar_eventos_mc(param){
	var soy_fn="fn_limpiar_eventos_mc";
	/*
	Elimina eventos de un sólo movieclip en un entorno 
	Si no se define el entorno (ruta) toma el _root
	
	fn_limpiar_eventos_mc({
		nombre_mc: String,
		ruta: MovieClip
	});
	
	Ej.
		_root.mis_fichas.ficha0.onEnterFrame = contar;
	
		fn_limpiar_eventos_mc({
				nombre_mc: 'ficha0',
				ruta: _root.mis_fichas
		});	
	
	NOTA MEJORAS: eliminar todos los eventos o grupos, o uno en particular.
		(Consultar API)
	*/
	
	tracer_fi("fn_limpiar_eventos_mc",param);
	
	var nombre_mc = param.nombre_mc;
	var ruta = param.ruta;
	
	if(ruta=="") {
		// modo EVAL STRING 
		
		tracer_lib(soy_fn," ** modo EVAL STRING  ** ");
		var mc = eval (nombre_mc);
	} else {
		// modo OBJECT + STRING
	
		tracer_lib(soy_fn," ** modo OBJECT + STRING ** ");
		
		if(ruta==undefined || ruta == null) ruta=_root;
		var mc = ruta[nombre_mc];
		
	}
	tracer_lib(soy_fn,"mc = "+ mc);
	
	mc.onPress = null;
	mc.onRollOut = null;		
	mc.onRollOver = null;
	mc.onRelease = null;
	mc.onReleaseOutside = null;
	mc.onDragOut = null;
	mc.onDragOver = null;
	mc.onKeyDown = null;
	mc.onKeyUp = null;
	mc.onMouseDown = null;
	mc.onMouseUp = null;
	mc.onEnterFrame = null;
	mc.onLoad = null;
	
	tracer_ff("fn_limpiar_eventos_mc","");
	
}

