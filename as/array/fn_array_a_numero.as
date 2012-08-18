// fn_array_a_numero.as

function fn_array_a_numero (numero_a_pasar:Array) {
	var soy_fn="fn_array_a_numero";
	//Convierte un array en un numero
	salida = Number(numero_a_pasar.toString());
	if (!salida ) salida = 0;
	return salida;
}
