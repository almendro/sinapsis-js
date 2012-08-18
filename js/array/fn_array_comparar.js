//fn_array_comparar.as
function fn_array_comparar (e) {
	var soy_fn="fn_array_comparar";
	/*
	Que hace:
	Compara 2 array si los mismos nodos tienen el mismo valor.
	Devuelve false si encuentra una diferencia
	
	Si se especifica el parametro 'todos' en true (por defecto es false) entonces devuelve una matriz con los nodos no coincidente.
	
	fn_array_comparar({
		array_a: Array,
		array_b: Array,
		todos: Boolean
	});
	*/
	var array_a = e.array_a;
	var array_b = e.array_b;
	var todos = (e.todos==undefined)?false:e.todos;
	// recorremos de la que tiene mas elementos.
	if (array_a.length < array_b.length) {
		array_a = e.array_b;
		array_b = e.array_a;
	}
	
	var salida = [];
	
	for (var n = 0; n<array_a.length; n++) {
		// comparamos si son desiguales
		if ( array_a[n] != array_b[n] ) {
			// si hay que revisar todos, almacenamos la salida
			if ( todos == true ) {
				salida[salida.length]=n;
			} else {
			// si no, cortamos y salimos con false
				return false;
			}
		}
	}
	return (todos==true && salida.length>0)?salida:true;
}