function fn_strtolower(e) {
	/*
	Devuelve una cadena en MINUSCULAS (LOWERCASE)
	
	fn_strtolower (String);
	
	*/
trace("fn_strtolower");
	if(typeof(e)=='string'){
		return e.toLowerCase();
	} else {
		return e;
	}
}