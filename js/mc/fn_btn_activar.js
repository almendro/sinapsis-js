// fn_btn_activar.as
// 26/5/2010
function fn_btn_activar(param){
	var soy_fn="fn_btn_activar";
	/*
	Activa o desactiva un boton.
	Al desactivarlo lo oculta, lo inhabilita y le quita el useHandCursor
	Pero conserva las funciones asignadas a los eventos.
	
	ruta, listado y estado son opcionales,
	por defecto sus valores son:
		ruta = _root;
		listado = [""];
		estado = true;
	
	fn_btn_activar({
		nombre_mc: String,
		ruta: MovieClip,
		listado: Array,
		estado: Boolean
	});
	
	_root.atril.ficha0.onRelease = soltar ;
	_root.atril.ficha1.onRelease = soltar ;
	_root.atril.ficha2.onRelease = soltar ;
	
	Ej:
		fn_btn_activar({
			nombre_mc: 'ficha',
			listado: [1,2],
			ruta: _root.atril,
			estado: false
		});
		
		tracer_lib(soy_fn,_root.atril.ficha0.enabled) 	// => false
		tracer_lib(soy_fn,_root.atril.ficha1._visible) 	// => false
		tracer_lib(soy_fn,_root.atril.ficha1.onRelease) 	// => function
	*/
	tracer_fi("fn_btn_activar",param);
	
	var nombre_mc = param.nombre_mc;
	var listado = param.listado;
	var ruta = param.ruta;
	var estado = param.estado;
	
	if(ruta==undefined || ruta == null) ruta=_root;
	if(listado==undefined || listado == null) listado=[""];
	if(estado==undefined || estado == null) estado=true;
	
	if(nombre_mc==undefined || nombre_mc == null) return (tracer_lib(soy_fn,"ERROR: falta parametro"));
	
	var mc;
	for(var n in listado){
		mc = ruta[nombre_mc+listado[n]];
		
		mc.enabled = estado;
		mc.useHandCursor = estado;
		mc._visible = estado;
	}
	
	tracer_ff("fn_btn_activar",salida);
}