//fn_array_reemplazar.as

function fn_array_reemplazar (param){
	var soy_fn="fn_array_reemplazar";
	
	/*
	Busca y reemplaza un valor dentro de toda la matriz
	
	fn_array_reemplazar({
		array: Array,
		valor_buscar: cualquiera*,
		valor_poner: cualquiera
	});
	
	* Tambien reemplaza undefined y null !!!
	
	*/
	var array 				= param.array;
	var valor_buscar	=	param.valor_buscar;
	var valor_poner		=	param.valor_poner;
	
	for(var n=0;n < array.length; n++){
		if( array[n] == valor_buscar ) array[n]=valor_poner;
	}
	
	return array;
} //<<< fn_array_reemplazar