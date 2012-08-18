function fn_mezclar_mc (param){
	var soy_fn="fn_mezclar_mc";
	/*
	Intercambia las coordenadas de un listado de MovieClips al azar
	Usando nombre+N
	
	fn_mezclar_mc ({
		nombre_mc: String,
		rango: [min,max],
		listado: Array,
		ruta: MovieClip
	});
	
	ficha0 (x:10,y:10)
	ficha1 (x:20,y:20)
	ficha2 (x:30,y:30)
	ficha3 (x:40,y:40)
	
	fn_mezclar_mc ({
		nombre_mc: 'ficha',
		rango: [0,3],
		ruta: _root
	});
	
	ficha0 (x:30,y:30)
	ficha1 (x:10,y:10)
	ficha2 (x:40,y:40)
	ficha3 (x:20,y:20)
	
	*/

	tracer_fi("fn_mezclar_mc",param);
	
	var nombre_mc = param.nombre_mc;
	var rango = param.rango;
	var listado = param.listado;
	var ruta = param.ruta;
	
	if(listado && rango==undefined){
		tracer_lib(soy_fn,"Solo listado");
		rango = [ 0, listado.length-1]
	}
	
	if(ruta==undefined || ruta == null) ruta=_root;
	
	// obtenemos el listado de propiedades
	var propiedades_originales = fn_propiedades_mc ({
		nombre_mc: nombre_mc,
		rango: [rango[0],rango[1]],
		listado:listado,
		ruta: ruta,
		accion: 'tomar'
	})

	var propiedades_mezcladas = fn_mezclar_array({matriz: propiedades_originales});
	
	var salida = fn_propiedades_mc ({
		nombre_mc: nombre_mc,
		rango: [rango[0],rango[1]],
		listado:listado,
		ruta: ruta,
		accion: 'poner',
		poner_propiedades: propiedades_mezcladas
	});
	
	tracer_ff("fn_mezclar_mc",salida);
}

