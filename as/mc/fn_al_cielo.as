function fn_al_cielo (e){
	var soy_fn="fn_al_cielo";
	/*
	Manda un movieclip a su nivel Z ma's alto
		
	fn_al_cielo (String);

	*/
	tracer_fi(soy,e);
	var mc = eval(e);
	tracer_lib (soy_fn,"mc = "+mc);
	mc.swapDepths(mc._parent.getNextHighestDepth());
}