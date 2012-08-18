function fn_str_replace(e) {
	/*
	fn_str_replace( { 
		buscar[String/Number]: palabra a buscar, 
		replazar[String/Number]: palabra a remplazar, 
		texto[String/Number]: texto general
	});
	*/

	if(typeof(e.buscar)=='object'){
		for (n=0; n < e.buscar.length; n++) e.texto = e.texto.split(e.buscar[n]).join(e.replazar);
		return e.texto;
	} else {
		array = e.texto.split(e.buscar);
	}
	
	return array.join(e.replazar)
} 

