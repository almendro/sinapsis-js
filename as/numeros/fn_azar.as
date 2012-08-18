function fn_azar (rango:Array) {
	var soy_fn="fn_azar";
	//El rango determina el numero minimo al maximo posible para Aleatorio
	return Math.round((Math.random()*(rango[1]-rango[0])) + rango[0]);
}

// este es mi parche de azar para el de martin >>>
function azar(min:Number, max:Number):Number {
    return fn_azar ([min, max]); 
}
