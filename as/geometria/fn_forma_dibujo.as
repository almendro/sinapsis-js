function fn_forma_dibujo (MC:String, nombre:String , puntas:Number, largo:Number, caracteristicas:Array) {
	var soy_fn="fn_forma_dibujo";
		/* 
			Por ahora esta funcion solo sirve a la funcion anterior no usar en las peliculas 
			
		*/
		MClip = eval(MC);

		triangle_mc = MClip.createEmptyMovieClip(nombre, MClip.getNextHighestDepth()); //se pueden crear ilimitadas formas sobre un MClip
		
		if (w==0) { 
			triangle_mc.lineStyle(8, caracteristicas[0], 100);
		} else {
			triangle_mc.beginFill(colores[caracteristicas[1]], caracteristicas[1]==null?0:100);
			triangle_mc.lineStyle(4, colores[caracteristicas[0]], caracteristicas[0]==null?0:100);
		}
		
		estrella = puntas > 8?2:1 //es estrella?
		puntas += (puntas > 8?-4:0) + (puntas==8?60:0) // arama estrellas y circulos		
		grados = Math.round(360/puntas) / estrella; // grados y estrella
			
		inicio = puntas==4?45: puntas==2?90:0 //inicio
		
		r=0; div=1;
		
		for (n=inicio; n < (360  + inicio) ; n += grados ) {
			r++;			
			div = Math.round(r/2)==(r/2) && estrella == 2?2:1 // forma las estrellas de ser necesario
			rd = fn_array_a_numero (caracteristicas[2]) * 5;
			ri = fn_array_a_numero (caracteristicas[3]) * 5; 
			x= (largo / div ) * Math.cos(((n+rd)-90)*PIX);
			y= (largo / div) * Math.sin(((n+ri)-90)*PIX) + (puntas==3?largo/6:0 ); //corrije la altura para el triangulo
			if (n==inicio ) {triangle_mc.moveTo(x, y); x1=x; y1=y; } else triangle_mc.lineTo(x, y);
		}
		triangle_mc.lineTo(x1, y1);
		triangle_mc.endFill();
}
