function fn_mc_titila (e){
	/*
	Genera un loop de X vueltas y pinta alternando un MC
	
	fn_mc_titila({
		mc_nombre: String,
		listado: Array,
		color_transforma: {
			ra: 100, rb: 10, 
			ga: 70, gb: 0, 
			ba: 70, bb: 0, 
			aa: 100, ab: 0
		},
		tiempo: Number,
		vueltas: Number,
		ini: Boolean,
		funcion: Function,
		e: Cualquiera
	});
	
	*/
	if(e.ini==false) e.vueltas--;
	if(e.vueltas > 0){
		var que_color = fn_es_par(e.vueltas)?{ra:100,rb:0,ga:100,gb:0,ba:100,bb:0,aa:100,ab:0}:e.color_transforma;
		marcar_fichas({
			mc_nombre:e.mc_nombre,
			listado: e.listado,
			color_transforma: que_color
		});
		fn_tiemp_dispara (e.tiempo , fn_mc_titila , {
				mc_nombre:e.mc_nombre,
				listado: e.listado,
				color_transforma: e.color_transforma,
				tiempo: e.tiempo,
				vueltas: e.vueltas,
				ini: false,
				funcion: e.funcion,
				e: e.e
			}
		);
	} else {
		e.funcion(e.e);
	}

}