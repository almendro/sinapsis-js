function fn_array_coincidencias (e) {
	var soy_fn="fn_array_coincidencias";
	/*
	fn_array_coincidencias({
		array_a: Array,
		array_b: Array
	});
	*/
	var array_a = e.array_a;
	var array_b = e.array_b;
	
	var salida = [];
	
	for (var n = 0; n<array_a.length; n++) {
		if ( fn_cual_contiene ( array_b, array_a[n] , true) > 0 ) salida[ salida.length] = array_a[n];
	}
	
	return salida;
}