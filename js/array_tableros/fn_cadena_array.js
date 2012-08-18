
function fn_cadena_array (param){
	var soy_fn="fn_cadena_array";

/*
	fn_cadena_array({
		cadena:String || Array,
		columnas:Number
	})
	
	Toma una cadena o una matriz lineal y coloca cada caracter en una matriz bidimensional
	tomando el ancho en columnas y rellenando con ceros los espacios vacios
*/
	tracer_fi("fn_cadena_array",param);
	
	// obtenemos los parametros
	var cadena = param.cadena;
	var columnas = param.columnas;
	
	
	// calculamos
	if(typeof(cadena)=='string') cadena = cadena.split("");
	
	var filas = Math.ceil (cadena.length / columnas);
	var salida:Array = new Array();
	
	for (var yy = 0; yy < filas; yy++)  {
		salida[yy] = [];
		for (var xx=0; xx < columnas; xx++) {
			salida[yy][xx] = cadena[xx+yy*columnas];
			if ( salida[yy][xx]==null || salida[yy][xx]==undefined ) salida[yy][xx]=0;
		}
	} 	
				
 	tracer_ff("fn_cadena_array",salida);
	return salida;
}
