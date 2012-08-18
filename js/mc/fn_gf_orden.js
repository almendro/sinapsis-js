function fn_gf_orden (mc:String,  cantidad:Number, posicion:Array, tamanio:Array, azar, fts:Array ) {
	var soy_fn="fn_gf_orden";

	

	
	/*
		mc: nombre del MClip que se quiere ordenar, tiene que ser nominal "Nombre0"..."NombreX"
		Cantidad: N cantidad de Mclip a asignar
		posicion: [x,y,x1,y1] rango de posisiones con los que se trabaja
		tamanio: [alto, ancho] Solo se usa para en el caso de que sea ordinal
		azar: Si es verdadero entonces ordena de forma azarosa
		escala: Similar a fn_ani_pop pero sin los datos de x e y
		fts: identico a fn_ani_pop
*/
	
	rx = Math.round((posicion[2] - posicion[0]) / tamanio[0]);
	ry = Math.round((posicion[3] - posicion[1]) / tamanio[1]);
	
	tracer_lib(soy_fn, "Cuantos entran ---> " + rx * ry);
	
	if (azar==true) {
	
		n=0;
		rn = fn_azar([0, cantidad*100])/100;
		
		for (y=0; y <= ry; y++) {
			for (x=0; x <= rx; x++) {
					MClip = eval(mc+n);	
			
				  lx = ((posicion[2] + posicion[0]) /2) - (tamanio[0]/2) - posicion[0] ; // largo de x
					X  =  fn_azar([lx/1.5,lx]) * Math.cos((Math.PI/cantidad*2)* n + rn) + ((posicion[2] + posicion[0]) /2);

					ly = ((posicion[3] + posicion[1]) /2) - (tamanio[1]/2) - posicion[1] 
					Y =  fn_azar([ly/1.5,ly]) * Math.sin((Math.PI/cantidad*2) * n + rn ) + ((posicion[3] + posicion[1]) /2);
					
					fn_ani_pop (mc+n, [X-MClip._x, Y-MClip._y], fts); 
					
					if ( n > cantidad ) return; 
					n ++;
			}
		}	

		
		
			
	} else {
	 
		n=0;
		for (y=0; y <= ry; y++) {
			for (x=0; x <= rx; x++) {
					MClip = eval(mc+n);	
					X = (x *  tamanio[0]) +  (tamanio[0]/2) +  posicion[0];
					Y =  (y *  tamanio[1]) +  (tamanio[1]/2) +  posicion[1];
					fn_ani_pop (mc+n, [X-MClip._x, Y-MClip._y], fts); 
					
					if ( n > cantidad ) return; 
					n ++;
			}
		}	
	}
	
}