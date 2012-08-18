function fn_establecer_en_nodos (param){
	var soy_fn="fn_establecer_en_nodos";
	/*
	Recibe una matriz y coloca en los nodos indicados por listado el valor.
	Devuelve la matriz actualizada
	
	fn_establecer_en_nodos({
		matriz: Array,
		listado_nodos: Array,
		valor: cualquiera cosa
	});
	
	
	Ejemplo:
	
		Supongamos que en un tablero de 5 fichas el jugador "a" captura fichas 
		en las posiciones 1, 4 y 5.
		
		tablero = [0,0,0,0,0];
		listado = [0,3,4];
		
		tablero = fn_establecer_en_nodos({
			matriz:tablero,
			listado: listado,
			valor: "a"
		});
		
		tracer_lib(soy_fn,tablero) // => a,0,0,a,a
	*/

	tracer_fi("fn_establecer_en_nodos",param);
	
	var matriz = param.matriz;
	var listado_nodos = param.listado_nodos;
	var valor = param.valor;
	
	for(var ii in listado_nodos){
		matriz[listado_nodos[ii]] = valor;
	}
	
	tracer_ff("fn_establecer_en_nodos",matriz);
	return matriz;
}