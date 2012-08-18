function fn_aplicar_fn (e){

	var soy_fn="fn_aplicar_fn";
	tracer_fi("fn_aplicar_fn",e);

	/*
	Aplica a todos los elementos del array una funcion para convertir los valores
	
	fn_aplicar_fn ({
		array: Array,
		funcion: String | Array de funciones,
	});

	*/

	var array = e.array;
	var funcion = e.funcion;
	var e = e.e; // parametros
	var clave = e.clave;
	
	var salida = [];
	var param;
	
	// recorremos los elementos de la matriz y aplicamos a cada uno la funcion
	for(var n = 0; n < array.length; n++){

		// verificamos si la funcion lleva multiples parametros
		if (e == undefined ) {
			param = array[n];
		} else {
			param = e;
			for (var p in e ) {
				//trace ("p");
				if (p==clave) param[p] = array[n];
			}
		}
		
		salida [n] = funcion(param) || eval(funcion)(param);
		
	}//<<< for
	
	return salida;

}