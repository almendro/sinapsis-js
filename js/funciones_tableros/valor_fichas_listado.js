function valor_fichas_listado (param){
	/*
		Yo simplificaria esta funcion haciendo que me devuelva cualquier MovieClip al rededor de una ficha 
		Se que no seria exacto, pero si eficiente, esto es lennnnnttttoooooooo
	*/
	var soy_fn="valor_fichas_listado";
	/* 
	
	funcion triple !!!!
	
	Recorre una serie de fichas listadas en
	coordenadas [y,x] (rel)
	en una matriz lineal (tablero) que representa
	un tablero de 2 dimensiones
	de cierto tamanio (columnas x filas)
	utilizando como partida un nodo (ficha)
	
	y devuelve una matriz con lo indicado (salida_tipo)
	
	Por defecto devuelte los valores de las fichas
	(equivalente a mc.txt)
	
	valor_fichas_listado ({
		ficha_ini:Number 	
		rel: [ [y0,x0],[y1,x1],...[yn,xn] ]
		tablero:Array,
		columnas: Number,
		filas: Number,
		especial: 'hex'
		salida_tipo: 'val'|'pos'|'yx'
		})
	
	
	valor_fichas_listado ({
		ficha_ini:Number, 	
		// La ficha a partir de la cual empieza la busqueda
		rel:Array,		
		// Las posiciones relativas a ficha en formato
		// [ [y0,x0],[y1,x1],...[yn,xn] ]
		tablero:Array	
		// La matriz lineal del tablero
		especial:String
		// indica una forma de ficha y tablero distinto de rectangular
		// para hacer correcciones en las coordenadas
						'hex' -> hexagona
						'tri' -> triangular (falta hacerlo)
								
		salida_tipo:String 	
		// indica que tipo de datos debe devolvernos
									'val' 	-> valores de las casillas
									'pos' 	-> posicion lineal de las fichas
									'yx'	-> coordenadas y,y de las casillas
		})
	*/
	
	tracer_fi("valor_fichas_listado",param);
	
	var salida = [];
	
	// referenciamos a los parametros para hacer mas facil la lectura
	var ficha_ini = param.ficha_ini;
	var rel = param.rel;
	var tablero = param.tablero;
	var columnas = param.columnas;
	var filas = param.filas;
	var especial = param.especial;
	var salida_tipo = param.salida_tipo;
	var salida_completa = param.salida_completa;
	
	// por defecto filtra las fichas fuera del tablero
	if (salida_completa == undefined || salida_completa == null ) salida_completa = false;
	
	if (rel){
		tracer_lib(soy_fn,"MODO relativo");
		
		// obtenemos la coordenada actual de la ficha
		// nota:restamos 1 porque estamos usando un sistema basado en 0 para las coord.
		var coord = lineal_a_coord({
			nro_ficha: ficha_ini-1,
			columnas: columnas,
			filas: filas
		});
		
		tracer_lib(soy_fn,"Coordenadas de la ficha_ini = "+ficha_ini);
		tracer_lib(soy_fn,"coord.x = "+coord.x+" | coord.y = "+coord.y);
		tracer_lib(soy_fn,"Recorremos las posiciones relativas a la ficha inicial");

		for(var f in rel){
		
			var dy = rel[f][0];
			var dx = rel[f][1];	
			
			tracer_lib(soy_fn,"f = "+f+"  -> coords -> dy = "+dy+" | dx = "+dx);
				
			if(especial=='hex'){
				// Corregimos el desplazamiento X segun se trate
				// de una ficha por encima o por debajo de la fila de la ficha inicial
				// y tambien en funcion de si es una fila impar
				if(dy!=0 && es_par(coord.y)==false){
					dx+=1;
					tracer_lib(soy_fn,"corregir dx = "+dx);
				}
				// volvemos a ajustar si se trata de una ficha inicial en fila impar
				// y las ficha a verificar esta en una fila distinta a una distancia par
				if(dy!=0 && es_par(coord.y)==false && es_par(dy)){
					dx-=1;
					tracer_lib(soy_fn,"corregir 2 dx = "+dx);
				}
			}
			
			var fuera_de_tablero = coord.y+dy<0 || coord.y+dy>=filas || coord.x+dx<0 || coord.x+dx>=columnas;
			if (fuera_de_tablero) {
				tracer_lib(soy_fn,"Objetivo FUERA DE TABLERO");
			} else {
				// obtenemos su coordenada en formato lineal
				var objetivo = ficha_ini + coord_a_num_lineal({
					x:dx,
					y:dy,
					columnas: columnas,
					filas: filas
				});
				// aqui no hace falta corregir la coordenada linea obtenida porque
				// ficha_ini ya tiene el 1 sumado
				
				var valor = tablero[objetivo];	
				
				tracer_lib(soy_fn,"f = "+f+" -> objetivo = "+objetivo+" -> valor = "+ valor);
				
				
				// Verificamos si estamos en los límites horizontales del tablero
				// porque las fichas en formato lineal toman como validas
				// las de la otra punta del tablero
				
				var coord_tmp = lineal_a_coord({
					nro_ficha: objetivo-1,
					columnas: columnas,
					filas: filas
					});

				
				tracer_lib(soy_fn,"Verificar limites");
				tracer_lib(soy_fn,"dy = "+dy+" | coord_tmp.y = "+coord_tmp.y+" | coord.y = "+coord.y);
				
				var valor_yx = [coord_tmp.x, coord_tmp.y];
				var valor_pos = objetivo;
				var valor_val = tablero[objetivo];
			
			}//<<< else if (fuera_de_tablero)
			
			
			//if (Math.abs(dy) != Math.abs(coord_tmp.y-coord.y) && salida_completa==true ){
			if (fuera_de_tablero && salida_completa==true ){
				// para ello verificamos si el desplazamiento en Y
				// es diferente del que supone entra la original y la temporal
				// basado en sus coordenadas Y de la ficha inicial y la objetivo
				
				tracer_lib(soy_fn,"Advertencia: fuera de limites, pero agregamos");
				valor_yx = null;
				valor_pos = null;
				valor_val = null;
				
			}
			//if (Math.abs(dy) != Math.abs(coord_tmp.y-coord.y) && salida_completa==false ){
			if (fuera_de_tablero && salida_completa==false ){
				tracer_lib(soy_fn,"fuera de limites (bordes del tablero)");
			}	else {
				// ficha valida dentro de los bordes del tablero
				
				// una ultima verificacion porque la anterior no es infalible
				// y en las esquinas falla
				
				
				if((tablero[objetivo]!=null && tablero[objetivo]!=undefined) || salida_completa){
				
					switch(salida_tipo){
						case 'yx' :
							salida.push(valor_yx);
							break;
						case 'pos' :
							salida.push(valor_pos);
							break;
						case 'val' :
						default:
						// 'val' devuelve valores
						salida.push(valor_val);
					} // <<< switch
					
					
				} // <<< valor valido

				
				if(_level0.dev){
					// pruebas >>> de indicadores graficos
					_root["ficha"+objetivo]._xscale=50;
					_root["ficha"+objetivo]._yscale=50;
					// <<< pruebas			
				}
				
				
			} // <<< else
			
			
		} // <<< for in
		
		tracer_ff("valor_fichas_listado",salida);
		return salida;
	
	}
} // <<< valor_fichas_listado
