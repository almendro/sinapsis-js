function fn_sumar_matriz (entrada) {
	var soy_fn="fn_sumar_matriz";
/*		
	fn_sumar_matriz ({	
							tablero:tablero_array, 
							pieza:array_pieza, 
							x:nx, 
							y:ny, 
						})
*/
	//tracer_fi("fn_sumar_matriz",entrada);
	// tracer_lib(soy_fn,"entrada tablero " + entrada.tablero);	
	
	salida.tablero = entrada.tablero; // copia la matriz pieza en la de tablero


	// comprueba que la pieza y posicion no sobre pasen el tablero
	if ( entrada.pieza.length +  entrada.y >  entrada.tablero.length ) return false
	if ( entrada.pieza[0].length +  entrada.x >  entrada.tablero[0].length ) return false
	if ( entrada.x < 0 ) return false
	if ( entrada.y < 0 ) return false
	//------------------------

	
	for (yy=0; yy < entrada.pieza.length; yy++)  {
		for (xx=0; xx < entrada.pieza[yy].length; xx++)  {		
						// suma la matriz de entrada a la matriz del tablero (tambien puede usarse para otras cosas)
			//tracer_lib(soy_fn,"piezas: " + xx +" - " + entrada.pieza[yy][xx]);
			if (entrada.tablero[entrada.x+xx][entrada.y+yy] == 'x' && entrada.pieza[yy][xx] != 0 ) { 
					// no suma nunca dos 'x' en la misma posicion
					// devuelve el mismo tablero que en la entrada (esta pieza no existe)
				return false
			} else {
				if (entrada.tablero[entrada.x+xx][entrada.y+yy] == entrada.pieza[yy][xx] || entrada.tablero[entrada.x+xx][entrada.y+yy] == 0 ||0 == entrada.pieza[yy][xx]) { 
					if (!(0 == entrada.pieza[yy][xx])) {
						salida.tablero[entrada.x+xx][entrada.y+yy] = entrada.pieza[yy][xx];
					}
				} else {
					return false
				}
		}
		}
	}

			/*
				falta hacer las reglas para union de matrices de piezas de difrentes formas
					ID piezas:	[3-9]
					Fijas:		x
					Uniones:	[1-2]
					vacio:		0
			
			*/

	//tracer_ff("fn_sumar_matriz",salida.tablero);
	return 	salida.tablero
}

