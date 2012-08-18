// fn_array_simple_ordenada
function fn_array_simple_ordenada (arraya:Array) {
	var soy_fn="fn_array_simple_ordenada";
	// Quita los nodos duplicados y casa la array en orden acendente
	arraya = arraya.sort(Array.DESCENDING | Array.NUMERIC); 	
	var salida:Array = new Array();
	for (n=0; n < arraya.length; n++) if (!(arraya[n] == salida[salida.length-1]) && !arraya[n]==0) salida[salida.length]=arraya[n];
	return salida;
}