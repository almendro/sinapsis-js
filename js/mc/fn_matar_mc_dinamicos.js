// borra los movieclips dinamicos
// se le podria pasar el parametro en que mc en vez del root
/*
function fn_matar_mc_dinamicos(e){

	if (!(e)) return null;
	var salida = [];
	for (var mc in eval(e.mc) ) {
		if (typeof(eval(mc)) == "movieclip") {
				salida [salida.length] = String(eval(mc));
				eval(mc).removeMovieClip();
			}
	}
	return salida;
	//trace ("salida = "+ver(salida));
}*/

function fn_matar_mc_dinamicos(){
	var soy_fn="fn_matar_mc_dinamicos";
	tracer_fi(soy_fn,param);
	
	var salida = [];
	for (var mc in _root ) {
		if (typeof(eval(mc)) == "movieclip") {
				salida [salida.length] = String(eval(mc));
				eval(mc).removeMovieClip();
			}
	}
	
	tracer_ff(soy_fn,salida);
	
	return salida;
}