tracer_lib(soy_fn,'     ANIMACION DEV');
tracer_lib(soy_fn,'------------------------------------');

#include "../../BD/color.as"

function fn_ani_linea_tiempo (mc:String, escala:Array, fts:Array,  tipo:String) {
	var soy_fn="fn_ani_linea_tiempo";
		if (dev == false) return; 
		MClip = eval(mc);
					tracer_lib(soy_fn,'dev ' + dev);
		if(!MClip.linea_tiempo) linea_tiempo_var = MClip.createEmptyMovieClip('linea_tiempo', MClip.getNextHighestDepth()); 
		if(!MClip.pos) MClip.pos = new Array()

		for (e=0; e < escala.length; e++) { 

			// vector
			linea_tiempo_var.lineStyle(0, colores[e+1], 30, true, "none");
			linea_tiempo_var.moveTo(fts[0]*10, (e*20));
			linea_tiempo_var.lineTo((fts[0]+fts[1])*10, (e*20));
			linea_tiempo_var.endFill();
			
			linea_tiempo_var.lineStyle(2, colores[e+1], 100, true, "none"); // linea de animacion 
		
			if(MClip.pos[e]==undefined) { MClip.pos[e] = 0; tracer_lib(soy_fn,'volivo a 0  POST' + e)} 
			for (t=fts[0]; t < fts[0]+fts[1]; t ++) { 
				if (t==fts[0]) {
					linea_tiempo_var.moveTo(t*10,  (e*20) + (MClip.pos[e]/10));
				} else {
					MClip.pos[e] += (escala[e]/fts[1]);
					linea_tiempo_var.lineTo(t*10, (e*20) + (MClip.pos[e]/10));
				}
			}

			tracer_lib(soy_fn,'POST ---> '+ MClip.pos[e]);
			linea_tiempo_var.endFill();
		
	}

}

function fn_ani_linea_tiempo_posicion (obj:Object) {
	var soy_fn="fn_ani_linea_tiempo_posicion";
	tracer_lib(soy_fn,'dev ' + dev);
		if (dev == false) return; 
	obj.t = obj.fts[0] + obj.fts_actual;
	for (e=0; e < obj.escala.length ; e++) {
		if (obj.escala[e]) { 
			obj._parent.linea_tiempo.lineStyle(2, colores[e+1], 100); // linea de animacion
			obj._parent.linea_tiempo.moveTo(obj.t*10, (e*20) + -5);
			obj._parent.linea_tiempo.lineTo(obj.t*10, (e*20) + +5);
			obj._parent.linea_tiempo.endFill();
		}

	}		
	obj._parent.linea_tiempo._rotation = obj._parent._rotation * -1;
}