function coord_a_num_lineal(param){
	var soy_fn="coord_a_num_lineal";
	/*
	Convierte una coordenada X,Y en su equivalente de posicion lineal.
	Sirve para saber el nro de una ficha, esta basado en cero.
	
	coord_a_num_lineal({
		x:Number, 
		y:Number,
		columnas:Number,
	});
	
	*/
	tracer_fi("coord_a_num_lineal",param);
	
	var x = param.x;
	var y = param.y;
	
	var salida = param.x + param.y*param.columnas;
	
	tracer_ff("coord_a_num_lineal",salida);
	return Number(salida);
}