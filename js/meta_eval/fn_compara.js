function fn_compara (e){

	trace (e);
	var comparadores = "<=,>=,==,!=,<,>";
	var BD_comparadores = comparadores.split(",");
	trace (BD_comparadores);
	/* La idea recorres el parametro e y separar los 2 terminos buscando un comparador
	si no encuentra ninguno devuelve NaN
	Si encuentra un comparador sale del bucle y luego realiza la comparacion
	*/
	var error = true;
	for ( var n = 0; n < BD_comparadores.length ; n++) {
		trace (BD_comparadores [n]);
		var tmp_partes = e.split ( BD_comparadores [n] );
		trace (tmp_partes);
		if (tmp_partes.length == 2) {
			error = false;
			var termino_1 = fn_siosi (tmp_partes[0]);
			var el_comparador = BD_comparadores [n];
			var termino_2 = fn_siosi(tmp_partes[1]);
			trace ("termino_1 = "+termino_1);
			trace ("el_comparador = "+el_comparador);
			trace ("termino_2 = "+termino_2);
			break;
		}
	}
	
	if (error==true) return NaN;
	
	var salida = false;
	switch (el_comparador) {
		case "<": salida = termino_1 < termino_2;break;
		case "<=": salida = termino_1 <= termino_2;break;
		case ">": salida = termino_1 > termino_2;break;
		case ">=": salida = termino_1 >= termino_2;break;
		case "==": salida = termino_1 == termino_2;break;
		case "!=": salida = termino_1 != termino_2;break;
	}
	return salida;
}