//---------->>>>>>

function fn_piezas_a_matriz_tablero () {
	var soy_fn="fn_piezas_a_matriz_tablero";
	tracer_lib(soy_fn,"MATRIZ !!!!!!");
	/*
			esta funcion pasa todas las piezas a la matriz de tablero, ecepto las que se esta moviendo.
			
	*/
	// crea una matriz en blanco
	tablero_array = fn_matriz ({ ancho: tamanio_matriz[0], alto: tamanio_matriz[1], elemento: 0 }); // matriz del tablero toda vacia
	//------------------------------------------------
	for (n = 1; n < fichas_cantidad; n++) {
		tracer_lib(soy_fn,"ficha "+n);
		//------------ loop para todas las casilla -------------
		if (!(eval('ficha'+n).sostiene)) { // si la pieza es sostenida no se incorpora a la matriz
			pieza = fn_posicion_en_matriz ({tamanio_casilla: tamanio_casilla, mc: 'ficha'+n }); 
			// calcula la posicion del MClip en la matriz de tablero
			// suma la PIEZA al TABLERO
			tablero_array = fn_sumar_matriz ({	
								tablero: tablero_array, 
								pieza: pieza.array, 
								x:pieza.x, 
								y:pieza.y
							});
			// si la matriz o cantida de piezas es grande, esto accelera mucho el proceso
			if (!tablero_array) return false;
		}
	}
	
	// ------------- genera la matriz del tablero grafica -------------
	fn_generar_matriz_grafica ({	
					ancho: tamanio_matriz[0], 
					alto: tamanio_matriz[1], 
					tamanio_casilla: tamanio_casilla, 
					tablero:tablero_array 
				});	
	
	// devuelve el tablero esto puede servir para ahorar tiempo
	tracer_lib(soy_fn,"MATRIZ >>>> salida = "+ver(tablero_array));
	return tablero_array
}
//<<<<<<<----------
