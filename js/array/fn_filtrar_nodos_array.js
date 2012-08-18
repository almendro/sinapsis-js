include ("../meta_eval.js");

function fn_filtrar_nodos_array (e) {
	/*
	fn_filtrar_nodos_array ({
		array: Array,
		valor: Number,
		condicion: String
	});
	*/
	var salida = [];
	for ( var ppp = 0 ; ppp < e.array.length ; ppp ++ ) {
		//if ( e.array [ ppp ].length > 4 ) salida[salida.length] = e.array [ ppp ];
		if ( fn_compara ( e.array [ ppp ].length+e.condicion+e.valor ) ) salida[salida.length] = e.array [ ppp ];
	}
	return salida;
}