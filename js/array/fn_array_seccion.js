function fn_array_seccion (array:Array, rango:Array) {
	var soy_fn="fn_array_seccion";
	if (rango[0] > rango[1])  { 
		tmp = rango[1];
		rango[1] = rango[0];
		rango[0] = tmp
	}
	var salida:Array = new Array(); 
	for (w=rango[0]; w < rango[1]; w++) salida[salida.length] = array[w];// devuelve solo los nodos dentro del rango
	return salida;
}