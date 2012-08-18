function fn_tipo_dato(e){
	var salida = [];
	
	// CONVERSION PARA ACTION SCRIPT
	var tipo = typeof(e);
	salida['string']="str";
	salida['number']="num";
	salida['object']="obj";
	salida['array']="arr";
	salida['boolean']="boo";
	salida['movieclip']="mov";
	salida['function']="fun";
	
	// en AS las matrices son tratadas como objetos.
	if(e.length && tipo=="object") tipo = "array";
	// <<< AS
	
	return salida[tipo] ;
}

/*
trace ("tipo 1 "+fn_tipo_dato(1));
trace ("tipo '1' "+fn_tipo_dato('1'));
trace ("tipo [1,2] "+fn_tipo_dato([1,2]));
trace ("tipo {a:2} "+fn_tipo_dato({a:2}));
trace ("tipo true "+fn_tipo_dato(true));
*/