function fn_manesillas (MC:String, txt:Number) {
	var soy_fn="fn_manesillas";
	actualizar_hora = null;
	MClip = eval(MC);

	/* 
		El objeto reloj solo sitene que tener dos MClip
		manesilla_hora
		manesilla_minutos
		
		la funcion se llama desde la lina principal
			 fn_manesillas (reloj, hora entre 1 y 144) 
			
	*/ 

	hora = n_a_hora (txt, false);

	MClip.dibu.minutero._rotation = Math.round(360/12*(txt-(12 * Math.floor(hora[0]/12) )));
	MClip.dibu.hora._rotation = 360/12*hora[0] + (360/12/60*hora[1]); // la hora tiene un leve desplazamiento por los minutos pasadas emulando un reloj analogo
	
}
