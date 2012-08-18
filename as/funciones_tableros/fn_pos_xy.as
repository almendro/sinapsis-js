function fn_pos_xy(param){
	var soy_fn="fn_pos_xy";
	/*
	Version mejorada de lineal_a_coord() con parametros mas simplificados.
	La idea es que las caracteristicas del tablero esten en un objeto generico a todos los juegos de tablero
	
	datos_tablero: {
			tablero: Array,
			columnas: Number,
			filas: Number,
			especial: String // 'hex', 'tri', etc
	}
	
	fn_pos_xy({
		nro_ficha: Number,
		datos_tablero: {
			columnas: Number,
		}
	});
	
	*/
	
	return lineal_a_coord({
		nro_ficha: param.nro_ficha,
		columnas: param.datos_tablero.columnas
	});
}//<<< fn_pos_xy

function fn_xy_pos(param){
	var soy_fn="fn_xy_pos";
	/*
	Es una version mejorada en parametros.
	
	fn_xy_pos({
		xy: { x: Number, y: Number },
		datos_tablero: { columnas: Number }
	});
	
	*/
	return coord_a_num_lineal({
		x: param.xy.x, 
		y: param.xy.y,
		columnas: param.datos_tablero.columnas
	});
}