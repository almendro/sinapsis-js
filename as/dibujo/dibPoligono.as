
function dibPoligono(mc:MovieClip, x:Number, y:Number, r:Number, l:Number, c:Number, a:Number, g:Number, e:Number):Void {
	var soy_fn="dibPoligono";
	tracer_lib(soy_fn,"Dibujar poligono");
	/*
	dibuja un polígono dentro de un MC indicando:
	mc - el movie clip
	x,y - coordenada
	r - radio
	l - cantidad de lados
	c - color
	a - alfa
	g - grosor línea
	e - estilo
	0 = sólo relleno
	1 = sólo borde
	3 = rellenos y borde
	*/
	if (e == 0) {
		mc.beginFill(c, a);
	} else if (e == 1) {
		mc.lineStyle(g, c, a);
	} else {
		mc.beginFill(c, a);
		mc.lineStyle(g, c, a);
	}
	//
	mc.moveTo(x+r, y);
	//convertimos a radianes el ángulo para la cantidad de lados
	var ang:Number = and_rad(360/l);
	for (var i = 1; i<=l; i++) {
		mc.lineTo(x+Math.cos(ang*i)*r, y+Math.sin(ang*i)*r);
	}
	//
	if (e == 0 || e == 2) {
		mc.endFill();
	}
}
