//-----------------promocionar como meta funcion



function fn_array_variacion (array:Array, rango:Array) {
	var soy_fn="fn_array_variacion";
	/// ===== ADVERTENCIA ==== la array debe ser lo suficientemente larga!!!!!!!!
	inicio = rango[0] ; // se toma de 2 a 3 nodos
	fin = array.length - rango[1]// el largo menos 2 a 3 nodos
	
	a = fn_array_seccion(array, [0, inicio]);
	do {
		b = fn_GC(null, fn_array_seccion(array, [inicio,fin]), fin-inicio);
		c = fn_array_seccion(array, [fin, array.length]);	
		salida = fn_unir(fn_unir(a , b), c);
	} while (salida == array)
	
	return salida
}