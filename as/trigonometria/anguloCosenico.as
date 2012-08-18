function anguloCosenico(param):Number {
	var soy_fn="anguloCosenico";
	// Obtiene un angulo en función del coseno y seno.
	var xdif:Number = param.xdif;
	var ydif:Number = param.ydif;
	var anguloC:Number = Math.round(ang_gra({angRadianes:Math.atan2(xdif, ydif)}));
	return anguloC;
}
