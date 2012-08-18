function fn_cual_contiene (arraya:Array, resultado, cantidad:Boolean ) {
	var soy_fn="fn_cual_contiene";
	cantidad_n = 0;
	// resultado puede ser texto o numeros
	if (resultado == null) return null;
	// Busca que nodo es el que contiene el numero de nodo
	// tambien se puede usar para saber si el resultado esta en un nodo (¿esta contenido en?)
	for (nnn=0; nnn < arraya.length ; nnn++) if (resultado.toString() == arraya[nnn].toString()) if(cantidad) cantidad_n ++; else return nnn;
	if(cantidad) return cantidad_n;
	return null;
}