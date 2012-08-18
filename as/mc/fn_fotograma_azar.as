fn_fotograma_azar = function (param){
	var soy_fn="fn_fotograma_azar";
	/*
	// selecciona un fotograma al azar en el movieclip indicado y salta el cabezal hacia este.
	
	fn_fotograma_azar({
		mc: Movieclip,
		rango: [min,max]
		});
		
	Si no se define rango toma todos los fotogramas del movieclip
	
	*/
	var rango = param.rango;
	var mc = param.mc;
	
	if (rango==undefined || rango == null){
		rango[0] = 1;
		rango[1] = mc._totalframes;
	}
	mc.gotoAndStop(fn_azar([rango[0],rango[1]])); //fn_azar esta en array.as
}