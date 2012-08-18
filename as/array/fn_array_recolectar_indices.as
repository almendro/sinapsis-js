function fn_array_recolectar_indices(param){
	var soy_fn="fn_array_recolectar_indices";
	/*
	Devuelve una matriz con todos los indices donde aparece el valor indicado
	
	fn_array_recolectar_indices({
		matriz: array,
		valor: cualquier cosas simple String, Boolean, Number. No objetos (Array u Object) ,
		salida_completa: boolean (por defecto false) ,
		inverso: boolean (por defecto false)
	});
	
	Ej:
		// nodo    0 1 2 3 4 5 6 7
		tablero = [0,3,2,3,3,2,0,0]
		
		mis_fichas = fn_array_recolectar_indices({
			matriz: tablero,
			valor: 3,
		});
		
		tracer_lib(soy_fn,mis_fichas); // => 1,3,4
	*/
	

	tracer_fi("fn_array_recolectar_indices",param);
	
	var matriz = param.matriz;
	var valor = param.valor;
	var salida_completa = param.salida_completa;
	var inverso = param.inverso;
	
	// por defecto filtra las fichas fuera del tablero
	if (salida_completa == undefined || salida_completa == null ) salida_completa = false;
	if (inverso == undefined || inverso == null ) inverso = false;
	
	trace("inverso = "+inverso);
	
	var salida = [];

	tracer_fi("fn_array_recolectar_indices","AAAAAA");
	
	for(var indice=0; indice < matriz.length; indice++){
	trace("indice "+indice);
	trace("(matriz[indice] == valor && inverso==false) "+(matriz[indice] == valor && inverso==false));
	trace("(matriz[indice] != valor && inverso==true) "+(matriz[indice] != valor && inverso==true));
		if ( (matriz[indice] == valor && inverso==false) || (matriz[indice] != valor && inverso==true) ) {
			salida.push(indice);
		} else if (salida_completa) {
			salida.push(undefined);
		}
	}
	tracer_ff("fn_array_recolectar_indices",salida);
	return salida;
}