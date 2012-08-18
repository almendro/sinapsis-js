function cosenico(param):Object {
	var soy_fn="cosenico";
	// Obtiene las longitudes de los lados opuestos a la hipotenusa
	// en un triangulo dados el radio (hipotenusa) y angulo
	// tomando como referencia el sistema de coordenadas
	
	// Devuelve los valores a través de un objeto
	// el modo de llamarla es: 

	// objeto = cosenico({angulo:Number, radio:Number});
	
	// entonces el objeto contendrá los valores
	// en sus propiedades:
	
	// objeto.dx_cos
	// objeto.dy_sen

	var angulo:Number = param.angulo;
	var radio:Number = param.radio;
	
	tracer_lib(soy_fn,"cosenico ("+angulo+","+radio+")");


	var valores = new Object();
	valores.dx_cos = Math.floor(Math.cos(ang_rad({angGrados:angulo}))*radio);
	valores.dy_sen = Math.floor(Math.sin(ang_rad({angGrados:angulo}))*radio);
	tracer_lib(soy_fn,"valores.dx_cos = "+valores.dx_cos);
	tracer_lib(soy_fn,"valores.dy_sen = "+valores.dy_sen);
	return (valores);
}
