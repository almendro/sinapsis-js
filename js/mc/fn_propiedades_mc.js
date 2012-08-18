function fn_propiedades_mc(param){
		var soy_fn="fn_propiedades_mc";
	/*
	Devuelve una matriz con las propiedades 
	o
	establece las propiedades
	de un rango de MovieClips
	
	fn_propiedades_mc ({
		nombre_mc: String,
		rango: Array,
		listado: Array,
		ruta: ruta
		accion: String 'tomar' || 'poner'
		poner_propiedades: Array
	})
	
	salida = [ {propiedades} ]
	
	
	PARAMETROS
	
	nombre_mc: texto con el nombre base de los MovieClips a mezclar
	
	rango: matriz con el min y max
	listado: matriz con los valores de los numeros de mc a intercambiar
	
	accion: 'tomar' || 'poner' indica QUE debe hacerse con las propiedades
		de los MovieClips, si tomar los valores y devolver una
		
	poner_propiedades: una matriz combinada con objetos para establecer las
		propiedades cuando se usa la accion 'poner'

		
	FUNCIONES MULTIPLES
	
	rango y listado se pueden usar solos o combinados
	
	solo rango
		recorre todos los MovieClips desde min a max, incluidas las puntas
		
			for n rango[min,max]
			_root[ nombre_mc + n ]
			
		ej:
			rango = [2,4]
			_root[ nombre_mc + 2 ]
			...
			_root[ nombre_mc + 4 ]
	
	solo listado
		recorre todos los MovieClips utilizando los valores
		contenidos en la matriz como indices
			
			for n listado.length
			_root[ nombre_mc + listado[n] ]
		ej:
			listado = [1,11,5,42,7,3]
			_root[ nombre_mc + 1 ]
			_root[ nombre_mc + 11]
			...
			_root[ nombre_mc + 3 ]
	
	combinados
		recorre todos los valores de listado entre los indices min y max
		
		ej:
			listado=[ 1,11, 5,42, 7, 3]
			          0  1  2  3  4  5
			                |_____|
			rango = [2,4] ---->|
			
			_root[ nombre_mc + 5 ]
			_root[ nombre_mc + 42]
			_root[ nombre_mc + 7 ]
			
	*/
	
	tracer_fi("fn_propiedades_mc",param);
	
	var nombre_mc = param.nombre_mc;
	var rango = param.rango;
	var listado = param.listado;
	var ruta = param.ruta;
	var accion = param.accion;
	var poner_propiedades = param.poner_propiedades;
	
	if(listado && rango==undefined){
		tracer_lib(soy_fn,"Solo listado");
		rango = [ 0, listado.length-1]
	}
	
	if(ruta==undefined || ruta == null) ruta=_root;
	
	var salida = [];
	var ss = 0;
	for(var n = rango[0]; n < rango[1]+1; n++){
	
		var nro = n;
		
		if(listado) nro = listado[n]
		
		var mc = ruta[nombre_mc+nro];
		
		if(accion == 'poner'){
			tracer_lib(soy_fn,"ponemos propiedad");
			
			mc._x = poner_propiedades[ss].x;
			mc._y = poner_propiedades[ss].y;
			
			/* PODRIAN IR OTRAS PROPIEDADES */
		}
		
		tracer_lib(soy_fn,"mc = "+mc+" x = "+mc._x+" y = "+mc._y);
		
		salida[ss]= new Object();
		salida[ss].x = mc._x;
		salida[ss].y = mc._y;
		
		tracer_lib(soy_fn,"salida [ "+ss+" ]= "+ver(salida[ss]) );
		
		ss++;
	}
	
	tracer_ff("fn_propiedades_mc",salida);
	return salida;
}