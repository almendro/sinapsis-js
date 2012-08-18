function ang_rad(param):Number {
	var soy_fn="ang_rad";
	// Convierte grados en radianes.
	
	var angGrados:Number = param.angGrados;
	tracer_lib(soy_fn,"angRadianes (angGrados:"+angGrados+")");
	var angRadianes:Number = angGrados*(Math.PI/180);
	tracer_lib(soy_fn,"angRadianes = "+angRadianes);
	return angRadianes;
}

