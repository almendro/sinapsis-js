function fn_matar_mc (e){

	/*
	Elimina una serie de moviclips basado en nombre+n
	Devuelve el listado de objetos al terminar
	
	fn_matar_mc ({
		nombre: String || Array,
		rango: Array,
		listado: Array
	});
	
	Ej.:
	
	// eliminas las fichas del 1 al 9 (este es un error que hay que corregir)
	fn_matar_mc ({
		nombre: "ficha",
		rango: [1,10],
	});
	
	// elimina las fichas 1,4,5,6
	fn_matar_mc ({
		nombre: "ficha",
		listado: [1,4,5,6],
	});
	
	*/

	var soy_fn = "fn_matar_mc";
	tracer_fi ( soy_fn,e );
	
	var rango = e.rango;
	var nombre = e.nombre;
	var listado = e.listado;
	
	tracer_lib(soy_fn,"fn_tipo_dato(nombre) "+fn_tipo_dato(nombre));
	
	if ( fn_tipo_dato(nombre)=="str" ) nombre = [ nombre ];
	if ( listado==undefined ) listado = fn_array_lineal ( { rango: [ rango [ 0 ] , rango [ 1 ] ] } );
	
	tracer_lib(soy_fn,"nombre "+ver(nombre));
	tracer_lib(soy_fn,"listado "+ver(listado));
	
	var salida = [];
	var mc;
	for (var n=0; n<listado.length; n++) {
		for (var m=0; m<nombre.length; m++) {
		
			tracer_lib(soy_fn,"nombre["+m+"] "+nombre[m]);
			tracer_lib(soy_fn,"listado["+n+"] "+listado[n]);
			
			mc = eval(nombre[m]+listado[n]);
			
			tracer_lib(soy_fn,"mc "+mc);
			
			salida[salida.length] = nombre[m]+listado[n];
			mc.removeMovieClip();
		}
	}
	
	tracer_ff(soy_fn,salida);
	return salida;
}