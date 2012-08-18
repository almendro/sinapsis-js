/* requiere array.as */

function fn_recolectar_perimetro(param){
	var soy_fn="fn_recolectar_perimetro";
	/*
	Recolecta todas las fichas vacias
	alrededor de las fichas del jugador X
	

	Devuelve una matriz con los numeros de fichas
	
	fn_recolectar_perimetro({
		jugador: Number,
		valor_vacia: Number,
		pila_fichas: Array,
		perimetro_ficha: [[y0,x0],[yN,xN]],
		datos_tablero: {
			tablero:tablero, 
			especial:'hex','tri' // por ahora solo 'hex'
			columnas: columnas,
			filas: filas
		}
	});
	
	*/
	tracer_fi("fn_recolectar_perimetro",param);
	
	var jugador = param.jugador; // no se usa, pero puede ser util
	var valor_vacia = param.valor_vacia;
	
	var pila_fichas = param.pila_fichas;
	var perimetro_ficha = param.perimetro_ficha;
	var datos_tablero = param.datos_tablero;
	
	var salida=[];
	
	var tmp=[]; // almacen temporal para cada ficha
	
	for(var p=0; p<pila_fichas.length; p++){
	
		if(datos_tablero.especial == 'triangular'){
			
			// en el caso del tablero triangular hay que corregir el perimetro invirtiendo la ficha de arriba o abajo segun se trate de una ficha en columna impar y fila par.
			// ver esquema en chamacos
			var tmp = fn_pos_xy({
				nro_ficha: pila_fichas[p]-1,
				datos_tablero: {
					columnas: datos_tablero.columnas
				}
			});
			tracer_lib(soy_fn,"fn_es_par(tmp.y) = "+ fn_es_par(tmp.y));
			tracer_lib(soy_fn,"fn_es_par(tmp.x) = "+ fn_es_par(tmp.x));
			
			var fil_par_col_imp = fn_es_par(tmp.y) && fn_es_par(tmp.x)==false;
			var fil_imp_col_par = fn_es_par(tmp.y)==false && fn_es_par(tmp.x);
			
			tracer_lib(soy_fn,"tmp = "+ver(tmp)+" | fil_par_col_imp="+fil_par_col_imp+" | fil_imp_col_par="+fil_imp_col_par);
			
			if( fil_par_col_imp || fil_imp_col_par ) perimetro_ficha[1][0]=-1; else perimetro_ficha[1][0]=1;// dy
			// cambiamos solo la relativa a la ficha por debajo o encima
			
		}
		tmp = fn_ficha_perimetro_disponibles({
			ficha_ini: pila_fichas[p],
			perimetro_ficha: perimetro_ficha,
			valor_vacia: valor_vacia,
			datos_tablero: datos_tablero
		});
		salida = fn_unir(salida,tmp); // sumamos a la recoleccion
		
	}// <<< for p
	
	salida = fn_array_simple_ordenada(salida); // ordenamos y limpiamos repeticiones
	
	tracer_ff("fn_recolectar_perimetro",salida);
	return salida;
}//<<< recolectar_perimetro


function fn_ficha_perimetro_disponibles(param){
	var soy_fn="fn_ficha_perimetro_disponibles";
	/*
	Nos devuelve una matriz con el listado de las fichas vacias alrededor de la ficha indicada
	
	fn_ficha_perimetro_disponibles({
		ficha_ini: Numer,
		perimetro_ficha: [[y0,x0],[yN,xN]],
		valor_vacia: Number,
		datos_tablero: {
			tablero:tablero, 
			especial:'hex','tri' // por ahora solo 'hex'
			columnas: columnas,
			filas: filas
		}
	});
	
	*/
	tracer_fi("fn_ficha_perimetro_disponibles",param);
	
	var ficha_ini = param.ficha_ini;
	var perimetro_ficha = param.perimetro_ficha;
	var valor_vacia = param.valor_vacia;
	var datos_tablero = param.datos_tablero;
	
	
	var salida = [];
	
	// tomamos los valores de las casillas listadas
	var listado_valores = valor_fichas_listado({
		ficha_ini: ficha_ini, 
		rel: perimetro_ficha, 
		tablero: param.datos_tablero.tablero, 
		especial: param.datos_tablero.especial,
		columnas: param.datos_tablero.columnas,
		filas: param.datos_tablero.filas
	});
	
	// obtenemos los numeros de fichas
	var listado_posiciones = valor_fichas_listado({
		ficha_ini: ficha_ini, 
		rel: perimetro_ficha, 
		tablero: param.datos_tablero.tablero, 
		especial: param.datos_tablero.especial,
		columnas: param.datos_tablero.columnas,
		filas: param.datos_tablero.filas,
		salida_tipo: 'pos'
	});
	
	// buscamos todas las vacias
	var nodos_vacios = fn_array_recolectar_indices({matriz:listado_valores,valor:valor_vacia});
	
	// extraemos del listado relativo a ficha_ini
	// solo las posiciones de la casillas disponibles
	// usando el listado de indices disponibles
	salida = fn_extraer_valores({
			matriz_a:listado_posiciones,
			matriz_b:nodos_vacios
	});
	
	tracer_ff("fn_ficha_perimetro_disponibles",salida);
	
	return salida;
}