function fn_mat_centro_en_rango (p) {
	soy="fn_mat_centro_en_rango";
/*
	Devuelve la posicion centrar en un rango con respecto al un largo

	fn_mat_centro_en_rango ( { 
								largo: largo en pixels,
								 rango: [inicio, fin] 
								});

-------------------------------------------------------------

	Ejemplo:
		ficha._x = fn_mat_centro_en_rango ({ 
												largo: (ficha._width * niveles_tablero[nivel][1]), 
												rango: [this._x, this._width] 
											}); //	centra un Mclip en el centro de la pantalla

-------------------------------------------------------------	
*/
	return (((p.rango[1]-p.rango[0]) - p.largo) / 2) + p.rango[0]
}
