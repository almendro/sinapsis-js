function crear_tablero(param){
	var soy_fn="crear_tablero";

	/*
	Arma una grilla de movieclips duplicando a partir de uno base en el escenario
	La grilla supone fichas rectangulares pero se puede especificar si
	la forma de las misma es especial (se agregara el tratamiento en futuras versiones)

	Bazza: ahora tiene valores por defecto, en todos los que rompian el script

		mc_nombre: String, 		// nombre base
		ruta: MovieClip,		// por defecto: _root (lamentablemente)
		
		filas: Number,
		columnas: Number,
		
		ficha_ancho: Number,	// por defecto: ancho del MC
		ficha_alto: Number,		// por defecto: alto del MC
		ajustar_mc: Boolean,	// indica si debe o no ajustar el tamanio del mc
		pos_x_ini: Number,		// por defecto: x del MC
		pos_y_ini: Number,		// por defecto: y del MC
		
		
		cantidad_fichas:Number, 
		base_nro_fichas:Number,	// indica desde donde comienza a contar las fichas, por defecto es "0"
	
		especial:Object 		// en el caso de tableros con fichas no rectangulares
	});
	
	
	*/
	tracer_fi("crear_tablero",param);


	var mc_nombre = param.mc_nombre;
	var ruta = !param.ruta?_root:param.ruta; // preferia cambiarla por this, pero es por defecto _root
	
	var filas = param.filas;
	var columnas = param.columnas;
	

	var ficha_ancho = !param.ficha_ancho?eval(mc_nombre)._width: param.ficha_ancho;
	var ficha_alto = !param.ficha_alto?eval(mc_nombre)._height: param.ficha_alto;


	var pos_x_ini = !param.pos_x_ini?eval(mc_nombre)._x:param.pos_x_ini;
	var pos_y_ini = !param.pos_y_ini?eval(mc_nombre)._y:param.pos_y_ini;

	var ajustar_mc = !param.ajustar_mc?true:param.ajustar_mc;	// QUE ES?!!
    var margen_ancho = !param.margen_ancho?0:param.margen_ancho;
	var margen_alto = !param.margen_alto?0:param.margen_alto;

	var cantidad_fichas = param.cantidad_fichas;
	// este valor puede diferir del total de la grilla,
	//en ese caso se recalcula las filas o las columnas y se centra
	// la ultima fila si el numero es menor.
	
	var base_nro_fichas = !param.base_nro_fichas?0:param.base_nro_fichas; 
	var especial = param.especial;
	
		
	// Calculos adicionales
	
	var cantidad_grilla = filas * columnas;
	var diferencia_fichas = cantidad_grilla - cantidad_fichas;
	
	var pos_x_final = (diferencia_fichas*ficha_ancho)/2;
	// para centrar la posicion X de la ultima fila.
	var pos_x, pos_y;

	/*

		Yo sacaria todas estas definiciones,
		las con un for in y un eval se podrian redefinir en este nivel
		bazza
	*/
	
	if(especial.tipo == "triangular"){
		// calculamos distancias internas del triangulo equilatero
		var dif_tmp = cosenico({angulo:60,radio:ficha_ancho});
		var altura = dif_tmp.dy_sen;
		var dx = ficha_ancho/2;
		var dy = dif_tmp.dy_sen/3;
		var radio = dif_tmp.dy_sen * 2; // este dato por ahora no lo usamos.
		var angulo_base = especial.angulo;
	}
	
	for (var fil=0 ; fil < filas ; fil++){
		
		if (fil == filas-1){
			//tracer_lib(soy_fn,"Conpensamos la diferencia de la ultima fila.");
			pos_x_ini += pos_x_final; // Conpensamos la diferencia de la ultima fila.
		}
		
		if(especial.tipo == "triangular"){
			if(es_par(fil)){
				angulo_ficha=angulo_base+180;
			} else {
				angulo_ficha=angulo_base;
			}
		}
		
		for(col=0 ; col < columnas ; col++){
			
			nro_ficha = col + fil*columnas + base_nro_fichas;
			tracer_lib(soy_fn,"nro_ficha = "+nro_ficha);

			if ( nro_ficha < cantidad_fichas + base_nro_fichas ) {
				
				removeMovieClip(ruta[mc_nombre+nro_ficha]);
				duplicateMovieClip(ruta[mc_nombre],mc_nombre+nro_ficha,ruta.getNextHighestDepth());
				var nueva_ficha = ruta[mc_nombre+nro_ficha];
				
				tracer_lib(soy_fn,"mc -> "+nueva_ficha);
				
				// calcula posicion
				pos_x = pos_x_ini + col * (ficha_ancho+margen_ancho) ;
				pos_y = pos_y_ini + fil * (ficha_alto+margen_alto) ;
				
				
				if(especial.tipo == "triangular"){
					pos_x = pos_x_ini + col * (dx +margen_ancho);
					pos_y = pos_y_ini + fil * (altura +margen_alto);

					// ajustamos si es columna impar
					
					if(es_par(fil)==true && es_par(col)==false){
						nueva_ficha.figura._y -=altura*(100/nueva_ficha._yscale); 
						nueva_ficha.figura._x -=ficha_ancho*(100/nueva_ficha._xscale); 
					}
					if(es_par(fil)==false && es_par(col)==true){ 
						nueva_ficha.figura._y -=altura*(100/nueva_ficha._yscale); 
						nueva_ficha.figura._x -=ficha_ancho*(100/nueva_ficha._xscale); 
					}
					// y ajustamos el angulo
					angulo_ficha+=180;
				}
				
				
				// posiciona el movieclip
				nueva_ficha._x = pos_x;
				nueva_ficha._y = pos_y;
				
				if(angulo_ficha!=undefined && angulo_ficha!=null) nueva_ficha._rotation = angulo_ficha;
				if(ajustar_mc){
					nueva_ficha._width = ficha_ancho;
					nueva_ficha._height = ficha_alto;
				}
				nueva_ficha.soy_n = nro_ficha;
				nueva_ficha.nombre_base = mc_nombre;
				
			}
		} // <<< for col
	} // <<< for fil
}; // <<< function crear_tablero
