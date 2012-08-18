function fn_strtoupper(e) {
	/*
	Devuelve una cadena en MAYUSCULAS (UPPERCASE)
	
	fn_strtoupper (String);
	
	*/
trace("fn_strtoupper");
	if(typeof(e)=='string'){
		return e.toUpperCase();
	} else {
		return e;
	}
} 

