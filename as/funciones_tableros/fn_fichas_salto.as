function fn_fichas_salto (e){

	trace ("fn_fichas_salto");
/*	
	fn_fichas_salto ({
		mi_nro_ficha: Number,
		ficha_a_saltar: Number,
		ficha_destino: Number,
		perimetro_interno: Array,
		perimetro_externo: Array,
		datos_tablero: {
			tablero: Array,
			especial: String,
			columnas: Number,
			filas: Number
		}
	});
	/*
	Obtenemos las posiciones de las fichas adyacentes, luego las posiciones de las fichas destino de salto.
	Recuperamos en un listado el valor de las fichas adyacentes y filtramos quedandonos solamente con las que tienen una ficha no vacia.
	Cruzamos los datos extrayendo del perimetro de salto usando los indices (nodos) de las fichas no vacias.
	*/
	
	trace ("e.mi_nro_ficha "+e.mi_nro_ficha);
	
	var salida = [];
	
	var perimetro_interno = valor_fichas_listado({
		ficha_ini: e.mi_nro_ficha, 
		rel: e.perimetro_interno, 
		tablero: e.datos_tablero.tablero, 
		especial: e.datos_tablero.especial,
		columnas: e.datos_tablero.columnas,
		filas: e.datos_tablero.filas,
		salida_tipo: 'pos',
		salida_completa: true
	});
	
	trace ("perimetro_interno "+perimetro_interno)
	/*
	marcar_fichas({
		listado: perimetro_interno,
		color_transforma: {
			ra: 100, rb: 100, 
			ga: 100, gb: 100, 
			ba: 100, bb: 0, 
			aa: 100, ab: 0},
		mc_nombre: "ficha"
	});
	*/

	var perimetro_externo = valor_fichas_listado({
		ficha_ini: e.mi_nro_ficha, 
		rel: e.perimetro_externo, 
		tablero: e.datos_tablero.tablero, 
		especial: e.datos_tablero.especial,
		columnas: e.datos_tablero.columnas,
		filas: e.datos_tablero.filas,
		salida_tipo: 'pos',
		salida_completa: true
	});
	
	trace ("perimetro_externo "+perimetro_externo);
	/*
	marcar_fichas({
		listado: perimetro_externo,
		color_transforma: {
			ra: 100, rb: 255, 
			ga: 100, gb: 100, 
			ba: 100, bb: 0, 
			aa: 50, ab: 0},
		mc_nombre: "ficha"
	});
	*/


	var perimetro_externo_valores = valor_fichas_listado({
		ficha_ini: e.mi_nro_ficha, 
		rel: e.perimetro_externo, 
		tablero: e.datos_tablero.tablero, 
		especial: e.datos_tablero.especial,
		columnas: e.datos_tablero.columnas,
		filas: e.datos_tablero.filas,
		salida_tipo: 'val',
		salida_completa: true
	});
	var perimetro_interno_valores = valor_fichas_listado({
		ficha_ini: e.mi_nro_ficha, 
		rel: e.perimetro_interno, 
		tablero: e.datos_tablero.tablero, 
		especial: e.datos_tablero.especial,
		columnas: e.datos_tablero.columnas,
		filas: e.datos_tablero.filas,
		salida_tipo: 'val',
		salida_completa: true
	});
	

	trace ("perimetro_interno_valores "+perimetro_interno_valores);
	trace ("perimetro_externo_valores "+perimetro_externo_valores);
	
	// buscamos todas las fichas a saltar
	var fichas_a_saltar = fn_array_recolectar_indices ({
		matriz: perimetro_interno_valores,
		valor: e.ficha_a_saltar,
		salida_completa: true
	});
	
	trace ("fichas_a_saltar = "+fichas_a_saltar);
	
	salida = fn_extraer_valores({
			matriz_a:perimetro_externo,
			matriz_b:fichas_a_saltar
	});

	trace ("salida = "+salida);
	
	var fichas_vacias = fn_array_recolectar_indices ({
			matriz: perimetro_externo_valores,
			valor: e.ficha_destino,
			salida_completa: true
	});
	
	trace ("fichas_vacias "+ fichas_vacias)
	
	salida = fn_extraer_valores({
		matriz_a: salida,
		matriz_b: fichas_vacias
	});
	
	trace ("salida = "+salida);
	return salida;
}