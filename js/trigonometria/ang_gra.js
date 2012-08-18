function ang_gra(param):Number {
	var soy_fn="ang_gra";
	// Convierte radianes en grados.

	var angRadianes:Number = param.angRadianes;
	tracer_lib(soy_fn,"angGrados(angRadianes:"+angRadianes+")");
	var angGrados:Number = angRadianes*(180/Math.PI);
	tracer_lib(soy_fn,"angGrados = "+angGrados);
	return angGrados;
}