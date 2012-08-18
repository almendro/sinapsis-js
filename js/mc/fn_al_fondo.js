function fn_al_fondo (e){
	var soy_fn="fn_al_fondo";
	/*
	Manda un movieclip a su nivel Z ma's bajo
		
	fn_al_fondo (String);

	*/
	tracer_fi(soy,e);
	/*
	var tmp = e.split(".");
	trace("tmp "+tmp);
	var mc;
	if(tmp.length > 1){
		mc = eval(tmp[mc.length-1]);
	} else {
	 mc = eval(e);
	}
	*/
	mc = eval(e);
	
	var objetos = [];
	
	for (var obj in mc._parent ){
		trace (typeof(eval(obj)));
		trace (soy_fn+": mc = "+obj+" "+fn_tipo_dato(eval(obj)));
		if (
			fn_tipo_dato(eval(obj))=="mov"
			&&
			eval(obj) != mc
		) objetos.unshift(eval(obj));
	}
	
	objetos.unshift(mc);
	
	for( var n  = 0 ; n < objetos.length ; n++ ){
			fn_al_cielo(String(objetos[n]));
	}
	
	return objetos;
}