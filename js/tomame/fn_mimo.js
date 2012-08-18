function fn_mimo_mc (mc1, mc2) {
	var soy_lib = "fn_mimo_mc";
	// promover a libs
	/*
		esta funcion clona las caracteristicas internas de un Mclip con otro, 
		Se usa para el drag grafico, intentar no usar para soluciones visuales.
	*/
	tracer_lib (soy_lib,"obj: "+mc1 + " -> " + mc2);
	
	// --------propiedades que imita-----------
	mc2.gotoAndStop (mc1._currentframe);
	mc2._visible =  mc1._visible;
	mc2.txt = mc1.txt;
	
	//-------- aplica esta misma funcion de modo recursivo solo a MClips---------
	//for (obj in mc1) if (eval("mc1."+obj)._currentframe) fn_mimo_mc (eval("mc1."+obj), eval("mc2."+obj)); else mc2.obj = mc1.obj;

} 
