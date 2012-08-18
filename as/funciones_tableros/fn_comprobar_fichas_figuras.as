function fn_comprobar_fichas_figuras (param) {
	var soy_fn="fn_comprobar_fichas_figuras";
	/*
	
	Revisa si una ficha ha formado una figura ganadora
	
	Esta funcion es para uso doble: nos permite obtener un ranking de fichas segun las figuras ganadoras y saber si alguna alcanzo el valor.
	
	Devuelve un objeto de cuatro propiedades, cada una es un Array con la posicion lineal de cada ficha en la pila, el ranking (cantidad de fichas que estan a punto de formar una figura ganadora) y la figura correspondiente.
	El cuato objeto es un booleano si alguna alcanzo el valor especial.
	
	Si alguna ficha alcanza el ranking del parametro valor especial entonces devuelve gano = true y en nodo 0
	de las otras 3 propiedades la ficha y la figura correspondiente. De esta manera podemos marcar graficamente la figura.
		
		salida.pos[] 	// nro de ficha
		salida.rank[]	// ranking
		salida.figu[]	// ID de la figura ganadora
		salida.gano		// true si se alcanzo el valor especial;
		
	fn_comprobar_fichas_figuras({
		valor_ficha: Number, 		
		pila: Array,
		patron: Array,
		valor_especial: Number,
		datos_tablero: {
			tablero: Array,
			filas: Number,
			columnas: Number,
			especial: String
		}
	)};
	
	valor_ficha: un numero con el valor a buscar dentro de las fichas.
	
	pila: Matriz con la posicion lineas de las casillas a verificar, en este caso el registro de las fichas de cada jugador.
	
	patron: Matriz con las figuras que deben formar las fichas. Cada elemento tiene una matriz con las posiciones relativas.
	
	valor_especial: un numero ganador de coincidencia que debe alcanzar el ranking de cada ficha.
	
	datos_tablero: la matriz lineas que hace de tablero y sus caracteristicas
	
	
	FALTA: mejorar forma de busqueda, toma mucho tiempo cuando las figuras ganadoras son muchas y el flash queda paralizado un poco.
	*/

	tracer_fi("fn_comprobar_fichas_figuras",param);

	var valor_ficha = param.valor_ficha; 
	var pila = param.pila;
	var patron = param.patron;
	var valor_especial = param.valor_especial;
	var datos_tablero = param.datos_tablero;
	
	var salida = {pos:[],rank:[],figu:[],gano:false};

	
	// recorremos la pila de fichas indicadas
	for (var c=0; c<pila.length; c++){
		
		tracer_int("pila [ "+c+" ] = "+pila[c]);
		
		var top_rank = 0; // filtra el ranking mas alto para cada figura
		
		// cotejamos las figuras de victoria
		for (var fig=0; fig<patron.length; fig++){
			tracer_int("FIGURA "+fig);
			
			// obtenemos los valores de las casillas segun el patron
			var listado_valores = valor_fichas_listado({
				ficha_ini: pila[c], 
				rel: patron[fig], 
				tablero:datos_tablero.tablero, 
				columnas: datos_tablero.columnas,
				filas: datos_tablero.filas,
				especial:datos_tablero.especial
			});
			
			// revisamos cuantas tienen el valor buscado
			// este valor nos sirve de ranking
			// ranking = numero de casillas propias - nro de casillas ocupadas por otra cosa
			
			var ranking = fn_cual_contiene(listado_valores, valor_ficha, true);
			var nro_vacias = fn_cual_contiene(listado_valores, 1, true);
			var resto = valor_especial-ranking-nro_vacias;
			
			tracer_int("numero de fichas validas = "+ranking);
			tracer_int("numero de fichas VACIAS = "+nro_vacias);
			tracer_int("resto = "+resto);
			
			// comprobamos tener algo rankeado
			if(ranking!=undefined && ranking!=null){
			
				ranking-=resto; // bajamos el ranking si hay otras fichas ocupando parte del patron de figura ganadora
		
				tracer_int("comprobamos valor especial para ficha "+pila[c]+" = "+ranking);
				if(valor_especial==ranking){
					tracer_int("¡¡¡ ALCANZO !!!");
					
					// almacenamos la salida
					salida.pos[0] = pila[c];
					salida.rank[0]=ranking;
					salida.figu[0]=fig;
					salida.gano = true;
					
					tracer_ff("fn_comprobar_fichas_figuras",salida);
					return salida; // salimos
					break;
				
				} else if(ranking>=top_rank){
					// si esta figura tiene mejor ranking que las anteriores la actualizamos
					
					top_rank=ranking;
					tracer_int("almacenamos el ranking para ficha "+pila[c]+" = "+ranking+" para la figura = "+fig);

					salida.pos[c]=pila[c];
					salida.rank[c]=ranking;
					salida.figu[c]=fig;
				} // <<< if valor_especial
			} // <<< if ranking!=null
		} // <<< for fig
	} // <<< for c

	tracer_ff("fn_comprobar_fichas_figuras",salida);
	return salida;
}