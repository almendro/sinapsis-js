function fn_generar_matriz_grafica (entrada) {
	var soy_fn="fn_generar_matriz_grafica";
	
	tracer_lib(soy_fn," DIBUJAR MATRIZ GRAFICA ");
	
//	if (!dev_graficar_matriz) return
	// tamanio=[ancho,alto] (elementos)
	// tamanio_casilla=[ancho,alto] (pixels)
	
	/*		
	fn_sumar_matriz ({	
							ancho: numero, 
							alto: numero, 
							tablero:tablero_array, 
							tamanio_casilla:pixels, 
						})
*/
	// tamanio = [entrada.ancho, entrada.alto];
	tamanio_casilla = entrada.tamanio_casilla;
	nnn = 0;
	removeMovieClip("mc_tablero"); // genera el tablero dentro de un MClip
	this.createEmptyMovieClip("mc_tablero", this.getNextHighestDepth());
	
	for (yy=0; yy < entrada.alto; yy++) {
		for (xx=0; xx < entrada.ancho; xx++) {
			
			if (!(entrada.tablero[xx][yy] == 0)) {
				mc_tablero.createEmptyMovieClip("mc"+nnn, mc_tablero.getNextHighestDepth()); 
				MClip = eval("mc_tablero.mc"+nnn);
				MClip._x = (xx*tamanio_casilla) + (tamanio_casilla/2);
				MClip._y = (yy*tamanio_casilla) + (tamanio_casilla/2);
				MClip._alpha = 100;
				
				fn_forma_crear({
								mc:"mc_tablero.mc"+nnn,
								puntas:1,
								radio:tamanio_casilla*.5,
								caracteristicas: {
									grosor_linea: 1,
									color_linea:(entrada.tablero[xx][yy]),
									color_relleno:null,
									dibuja_mal: true
								}})
				
				nnn++;
			}
		}
	}
}