function n_a_hora (numero:Number, texto:Boolean, real:Boolean) {
	var soy_fn="n_a_hora";
	/*
		Pasa un numero entre 1, 144 a horas y minutos 
		real da todos los numeros, no tan solo de 5  en 5
	*/
		numero_h = Number(Math.floor(12/144*numero));
	if (!real) { 
		numero_m = 5 * Math.floor(numero - (12*numero_h));
	} else {
		numero_m = Math.floor(5 * (numero - (12*numero_h)));
	}
	// si se desea desplegar la hora en texto
		salida = (numero_h<10?"0"+numero_h:numero_h)+":"+(numero_m<10?"0"+numero_m:numero_m); 
		if (numero_h < 0) salida="00:00";
		if (texto) return salida
	//------------------
	return [numero_h, numero_m]; //hora en rango
}
