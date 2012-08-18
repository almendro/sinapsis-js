function fn_cual_contiene_array (arraya:Array, arrayb:Array) {
	var soy_fn="fn_cual_contiene_array";
	cantidad_n = 0;
	for (nnn=0; nnn < arraya.length ; nnn++) cantidad_n += fn_cual_contiene (arrayb, arraya[nnn], true); 
	return cantidad_n;
}