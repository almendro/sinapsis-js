function fn_ficha_movimientos_posibles (e){
	var soy_fn = "fn_ficha_movimientos_posibles";
	/*
	Devuelve los numeros de las fichas validas para hacer un movimiento lineal y continuo una distancia determinada y en las direcciones indicadas por el perimetro.
	
	fn_ficha_movimientos_posibles ({
		ficha: Number || Array ,
		valor_vacia: Number || String,
		datos_tablero: {
			tablero: Array,
			columnas: Number,
			filas: Number,
			especial: String
		},
		perimetro: Array,
		distancia: Number
	})
	*/
	var ficha = e.ficha;
	var valor_vacia = e.valor_vacia;
	var datos_tablero = e.datos_tablero;
	var perimetro = e.perimetro;
	var distancia = e.distancia;
	var inverso = e.inverso;
	var incluye = e.incluye;
	
	if(!(inverso)) inverso = true;
	
	tracer_fi(soy_fn,e);
	
	var salida = [];

	if (typeof(ficha)=='number') ficha = [ficha];  // permite pasar 1 o varias fichas
	
	tracer_lib(soy_fn,"ficha = "+ver(ficha));
	
	for ( var f = 0 ; f < ficha.length; f++) {
		for ( var p = 0 ; p < perimetro.length ; p++) {
			tracer_lib(soy_fn, " perimetro ["+p+"]"+perimetro[p]);
			var area = [];
			area = fn_fichas_area_continua({
				ficha_ini: ficha[f],
				valor_vacia: valor_vacia,
				inverso: inverso,
				incluye: incluye,
				perimetro: [perimetro[p]],
				direccion: 0,
				area: [],
				tablero: datos_tablero.tablero,
				columnas: datos_tablero.columnas,
				filas: datos_tablero.filas,
				especial: datos_tablero.especial
			});
			tracer_lib(soy_fn," area "+area);
			if (distancia!=undefined) {
				if(distancia<area.length){
					area = fn_array_seccion (area,[0,distancia+1]);
				}
				tracer_lib(soy_fn," area + distancia = "+area);
			}
			
			salida = fn_unir (salida,area);

		}//<<< for p
		// limpiamos la salida eliminando la ficha de inicio
		salida = fn_quitar_nodo_por_valor ({
			array: salida,
			valor: ficha[f]
		});
	}//<<< for f
	

	salida.sort();
	tracer_ff(soy_fn,salida);
	return salida;
}//<<<fn_ficha_movimientos_posibles