function fn_fichas_recorrer_camino(param){
	var soy_fn="fn_fichas_recorrer_camino";
	/*
	Recorre un camino de ficha continuas y cuenta
	cuantos pasos dio y registra las fichas involucradas.
	
	recorrer_camino({
		ficha_ini: Number
		valor_vacia: Number,
		perimetro: [[y0,x0],[yN,xN],
		camino: Array,
		tablero: Array,
		columnas: Number,
		filas: Number
	})
	*/
	/*
	var ficha_ini = param.ficha_ini;
	var valor_vacia = param.valor_vacia;
	var perimetro = param.perimetro;
	var camino = param.camino; // 
	var tablero = param.tablero;
	var columnas = param.columnas;
	var filas = param.filas;
	
	
	
	var salida={pasos:[],ficha:[]};
	
	var limite_vuelta = perimetro.length;
	
	var direccion=0; // direccion en la que se mueve hacia la proxima ficha, apuntamos al elemento de la matriz que contiene el perimetro. Y mantenemos esa direccion hasta encontrarnos con una ficha ocupada, entonces pasamos a la proxima direccion. Siempre que encontramos un obstaculo sumamos 1 a esa ficha. Si alcanza el limite de vuelta es que hemos terminado. Es importante que el perimetro este definido en posiciones relativas y las fichas este en continuidad, o sea, sentido horario o antihorario
	
	//Ej:   7 0 1
	//      6 X 2
	//			5 4 3
	
	
	
	var fichas_perimetro = valor_fichas_listado ({
		ficha: ficha_ini,
		rel: perimetro,
		tablero: tablero,
		columnas: columnas,
		filas: filas,
		especial: 'hex',
		salida_tipo: 'pos'
	});
	
	var donde_estoy = fn_cual_contiene(camino,ficha_ini,false);
	camino.splice(donde_estoy,1); // quitamos la
	
	// recorremos alrededor de la ficha buscando el proximo paso
	for(var pp=0; pp<limite_vuelta; pp++){
		// verificamos si dimos la vuelta en la direccion
		if(direccion>=limite_vuelta) direccion=0;
			
			// tomamos la posicion del proximo paso
			var proximo_paso = fichas_perimetro[direccion];
			// verificamos si ese paso esta en el camino a seguir
			var en_camino = (fn_cual_contiene(camino,proximo_paso,true)>0);
			if( en_camino ){
				// verificamos si ese paso esta vacio, en ese caso llamamos recursivamente
				var ficha_vacia = (tablero[proximo_paso] == valor_vacia);
				if( ficha_vacia ) {
					
					
				}//<<< if ficha_vacia
			}//<<< if en_camino
			
		direccion++;
	}//<<< for pp
	
	return salida
	*/
}// <<< fn_fichas_recorrer_camino