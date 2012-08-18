function angulo_arco(param):Number {
	var soy_fn="angulo_arco";
	// Obtienen un angulo en función del arco y radio.
	
	
	var arco:Number = param.arco;
	var radio:Number = param.radio;
	var anguloA:Number = Math.round(ang_gra({angRadianes:arco/radio}));
	return anguloA;
}
