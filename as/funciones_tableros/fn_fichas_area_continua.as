function fn_fichas_area_continua(param){
	var soy_fn="fn_fichas_area_continua";
	/*
	Recorre un area de fichas continuas y la devuelve
	
	fn_fichas_area_continua({
		ficha_ini: Number
		valor_vacia: Number,
		inverso: Boolean
		perimetro: [[y0,x0],[yN,xN],
		direccion: Number,
		area: Array,1
		tablero: Array,
		columnas: Number,
		filas: Number,
		especial: especial,
	})
	*/
	tracer_lib(soy_fn," param = "+ver(param));
	
	var ficha_ini = param.ficha_ini;
	var valor_vacia = param.valor_vacia;
	var inverso = param.inverso;
	var incluye = param.incluye;
	var perimetro = param.perimetro;
	var area = param.area;
	var tablero = param.tablero;
	var columnas = param.columnas;
	var filas = param.filas;
	var especial = param.especial;
	var direccion=param.direccion;// direccion en la que se mueve hacia la proxima ficha, apuntamos al elemento de la matriz que contiene el perimetro. Y mantenemos esa direccion hasta encontrarnos con una ficha ocupada, entonces pasamos a la proxima direccion. Siempre que encontramos un obstaculo sumamos 1 a esa ficha. Si alcanza el limite de vuelta es que hemos terminado. Es importante que el perimetro este definido en posiciones relativas y las fichas este en continuidad, o sea, sentido horario o antihorario
	//Ej:   7 0 1
	//      6 X 2
	//			5 4 3	
	
	var limite_vuelta = perimetro.length;
	
	if ( especial == undefined ) especial = "hex"; // compatibilidad con el SIX
	if ( inverso == undefined ) inverso = false;
	if ( incluye == undefined ) incluye = false;
	
	
	var fichas_perimetro = valor_fichas_listado ({
		ficha_ini: ficha_ini,
		rel: perimetro,
		tablero: tablero,
		columnas: columnas,
		filas: filas,
		especial: especial,
		salida_tipo: 'pos'
	});
	
	direccion--;
	if(direccion<0) direccion=limite_vuelta+direccion;
	tracer_lib(soy_fn,"direccion anterior = "+direccion);
	
	area.push(ficha_ini);
	tracer_lib(soy_fn," area = "+ver(area));
	
	// recorremos alrededor de la ficha buscando el proximo paso
	for(var pp=0; pp<limite_vuelta; pp++){
		// verificamos si dimos la vuelta en la direccion
		tracer_lib(soy_fn,"pp = "+pp);
		if(direccion==limite_vuelta) direccion=0;
			tracer_lib(soy_fn,"direccion = "+direccion);
			// tomamos la posicion del proximo paso
			var proximo_paso = fichas_perimetro[direccion];
			tracer_lib(soy_fn,"proximo_paso = "+proximo_paso);
			// verificamos si esa proxima ficha no esta vacia
			// y si no esta registrada en el area
			
			var ficha_no_vacia = tablero[proximo_paso] != valor_vacia;
			
			ficha_no_vacia = inverso?!ficha_no_vacia:ficha_no_vacia;
			
			tracer_lib(soy_fn,"ficha_no_vacia = "+ficha_no_vacia);
			
			if( ficha_no_vacia ) {
				var no_en_area = fn_cual_contiene(area,proximo_paso,true)==0;
				tracer_lib(soy_fn,"no_en_area = "+no_en_area);
				if( no_en_area ){
					area = fn_fichas_area_continua({
						ficha_ini: proximo_paso,
						valor_vacia: valor_vacia,
						inverso: inverso,
						incluye: incluye,
						perimetro: perimetro,
						direccion: direccion,
						area: area,
						tablero: tablero,
						columnas: columnas,
						filas: filas,
						especial: especial
					});
				}//<<< if no_en_area
					
			} else {//<<< if ficha_vacia
				if(incluye && tablero[proximo_paso]!=undefined){
					area.push(proximo_paso);
					return area;
				}
			}
			
		direccion++;
	}//<<< for pp
	tracer_lib(soy_fn," return area = "+ver(area));
	return area;
	
}// <<< fn_fichas_area_continua