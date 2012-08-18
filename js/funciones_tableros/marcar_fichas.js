function marcar_fichas(param){
	var soy_fn="marcar_fichas";
	// Pinta de un color (con transformacion de los componentes RGB)
	// un listado de movieclips basados en el nombre mc_nombre+nro
	
	// Viene a ser la misma que esta en funciones.as pero con multiples elementos
	
	// tambien puede servir para llevar una salida de las funciones
	// que comprueban fichas para saber que esta pasando
	// o algun efecto vistoso de cuando la maquina 'piensa'
	
	/*
	marcar_fichas({
		listado: Array,
		color_transforma: color_normal={
			ra: 100, rb: 0, 
			ga: 100, gb: 0, 
			ba: 100, bb: 0, 
			aa: 100, ab: 0},
			tono:1 a 360 -> rotacion de tonalidad (propuesta)	
			mc_nombre: String
	});
	*/
	tracer_fi("marcar_fichas",param);

	var listado = param.listado;
	color_transforma = param.color_transforma
	var mc_nombre = param.mc_nombre;

	for(var ff in listado){
		mi_color = new Color( eval(mc_nombre + listado[ff]));
		mi_color.setTransform(color_transforma);
	}
	
	tracer_ff("marcar_fichas");
	/*

		Propongo que en este script los valores NULL sean tomados por defecto
		y un parametro para definir con respecto al TONO y no con ese escript HORRIBLE de flash

	*/

};

