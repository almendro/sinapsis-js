function fn_unir (arraya:Array, arrayb:Array) {
	var soy_fn="fn_unir";
	// une dos array
	var salida:Array = new Array(); 
	for (n=0; n < arraya.length ; n++) salida[n] = arraya[n];
	for (i=0; i < arrayb.length ; i++) salida[i+(arraya.length)] = arrayb[i];
	return salida;
}