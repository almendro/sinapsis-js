function fn_copiar_array ( e ) {
	var soy_fn="fn_copiar_array";
	/*
	Devuelve una matriz identica a la entrada rompiendo el enlace que produce Flash al asignar una matriz entera. Ver ma's abajo
	Esta funcion copia recursivamente si un nodo tiene como valor una matriz.
	
	Sintaxis:
	
		fn_copiar_array({matriz: Array}); // compatibilidad vieja
		fn_copiar_array(array);
		
	Esta funcion es necesaria para evitar que Flash haga de las suyas con las matrices. Cuando se asigna a una variable con el signo = a una matriz entera*, al cambiar la matriz original, tambie'n cambia la variable. Esto puede traer problemas si se quieren realizar cambios en una copia y mantener la original.
	
	* Nota: si la asignacio'n se hace a un elemento de la matriz distinto de una matriz entera, entonce no se produce el enlazamiento.
	
	Ej:
	
		tablero = [1,2,3,4,[11,22,33,[444,555]]];
		tablero_copia1 = tablero;											// <--- COPIA enlazada
		tablero_copia2 = fn_copiar_array (tablero); 	// <--- COPIA auto'noma.
		
		tablero_tmp = [0,0,0,0];
		tablero_tmp [0] = tablero [4][3][0]; // <--- so'lo copia un nodo especi'fico.
		
		// AQUI VA EL CAMBIO en la matriz original
		tablero [0] = 5;
		tablero [2] = 7;
		tablero [4][3][0] = "4x4";
		tablero [4][3][1] = ["5x5",55555];
		
		trace (ver(tablero)); 			// -> [5,2,7,4,[11,22,33,['4x4',['5x5',55555]]]]
		trace (ver(tablero_copia1));// -> [5,2,7,4,[11,22,33,['4x4',['5x5',55555]]]] <--- esta copia cambio'
		trace (ver(tablero_copia2));// -> [1,2,3,4,[11,22,33,[444,555]]]						 <--- esta copia NO cambio'
		trace (ver(tablero_tmp));	 	// -> [444,0,0,0] <--- el nodo [0] no cambio'
		
	*/
	var matriz = e.matriz==undefined ? e : e.matriz; // compatibilidad vieja
	var salida = [];
	var tmp;
	for ( var k=0; k<matriz.length; k++ ) {
		tmp = matriz[k];
		if(typeof(tmp)=="object" && tmp.length) {
			salida[k]=fn_copiar_array(tmp);
		} else {
			salida[k]=tmp;
		}
	}
	return salida;
}