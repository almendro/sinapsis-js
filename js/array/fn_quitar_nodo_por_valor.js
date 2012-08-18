function fn_quitar_nodo_por_valor (e) {
	soy_fn = "fn_quitar_nodo_por_valor";
	/*
		Quita un nodo que lleve el valor indicado
		ejemplo:
			fn_quitar_nodo_por_valor ({array:[1,2,3,4,5], valor: 3 }) --resultado--> [1,2,4,5]

	*/
	salida = [];
	if (typeof(e.valor) == 'array' ) {
		salida = e.array;
		for( n=0; n < e.valor.length; n++) salida = fn_quitar_nodo_por_valor ({array:salida, valor: e.valor[n] });
	} else {
		for(n=0; n < e.array.length; n++) if (!(e.array[n] == e.valor)) salida[salida.length] = e.array[n];	
	}
	return salida
}

