function distancia_2puntos(param):Number {
	var soy_fn="distancia_2puntos";
	// Calcula la distancia entre 2 puntos
	// (teorema de Pitagoras)

	var x1:Number = param.pto1.x;
	var y1:Number = param.pto1.y;
	var x2:Number = param.pto2.x;
	var y2:Number = param.pto2.y;

	var dpx:Number = x2-x1;
	var dpy:Number = y2-y1;

	var distanciaPuntos:Number = Math.round(Math.sqrt((dpx*dpx)+(dpy*dpy)));
	return distanciaPuntos;
}