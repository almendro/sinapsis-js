function fn_inteligencia (entrada) {
	var soy_fn="fn_inteligencia";
	salida = {};
	/*
		Pegante y petulante funcion que trata de imitar la inteligencia del jugador de modo generico
			entrada:
					tablero: tablero actual
					jugada_matriz: jugada a comprobar
					
			salida:
					jugadas: con las posiciones más eficientes para jugar
					existe: jugadas_posible ya existe en el tablero

	*/

	nn=0
	salida.existe = false
	posibles_jugadas = [];
	for (ny=0; ny < entrada.tablero.length; ny++) {
		for (nx=0; nx < entrada.tablero[nx].length ; nx++) {
			// siciones relativas en una matriz - es bastante siemple.
		
			matriz_final = fn_sumar_matriz ({ tablero: entrada.tablero, pieza: entrada.jugada_matriz, x:nx, y:ny });
			//--------------------------INTELIGENCIA-----------------------------
			if ( matriz_final == entrada.tablero) { salida.existe = true; }
			//--------------------------JUGA DEL ENEMIGO -----------------------------
			jugada = fn_diferencias_entre_matriz ({ array_1:entrada.tablero, array_2:matriz_final});
			// tracer_lib(soy_fn," tablero: " + jugada );
			/* fn_diferencias_entre_matriz : devuelve los nodos que serian posibles jugadas */

			if (jugada) {
			//	tracer_lib(soy_fn,jugada);
				posibles_jugadas[nn] = jugada;
				nn++;
			}
		}
	}
//	tracer_lib(soy_fn,'jugadas posibles ---> ' + posibles_jugadas);

	jugadas_finales = posibles_jugadas[0]; // muerte a null y undefined
	
	for (nn2=0; nn2 < posibles_jugadas.length; nn2++) {
			//comprueba cual es la mas larga de las cadenas (se puede funcionar)
			if ( posibles_jugadas[nn2] < jugadas_finales) jugadas_finales = posibles_jugadas[nn2];
	}

	
	salida.jugadas = jugadas_finales;
	
	return salida
}
