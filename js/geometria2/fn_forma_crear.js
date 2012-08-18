function fn_forma_crear(param){
	var soy_fn="fn_forma_crear";
	/*
	Modo de uso
	
	param = {
		mc:String,					-> nombre del MovieClip
		puntas:Number,				-> ver formas_txt en BD/geometria.as
		radio:Number,				-> longitud del radio en pixeles
		caracteristicas:Object{		-> otras caracteristicas del dibujo
			color_linea:Number,				null | 0..8, -> color* de linea o borde
			color_relleno:Number,			null | 0..8, -> color* de relleno
			distorcion_horizontal:Number,
			distorcion_vertical:Number,
			grosor_linea:Number,			null | n	 -> grosor de la linea en pixeles ***
			dibuja_mal:Boleam,				No se esmera al dibujar
		},
		halo:Boolean				-> indica si debe o no dibujarse un halo para efecto de rollover **
	}
	
	* color:
		ver BD/color.as
	
	** halo:
		para hacerlo compatible con las versiones anteriores
		en el caso de poner false o null lo que hacemos es crearlo
		para que la funcion vieja vea que existe y no lo cree.
				
	*** grosor_linea:
		para hacerlo compatible con la versión vieja si esta funcion recibe
		un null lo transforma en cero para evitar que en los juegos viejos
		al no estar definida (null) lo haga desaparecer.
		-1 indica una linea muy fina
	
	*/

if(param.halo==false || param.halo == undefined || param.halo==null){
	var mc = eval(param.mc);
	mc.createEmptyMovieClip("halo",getNextHighestDepth());
}

// Mudamos la nueva notacion al sistema anterior
var caracteristicas = new Array(param.caracteristicas.color_linea, param.caracteristicas.color_relleno, param.caracteristicas.distorcion_horizontal, param.caracteristicas.distorcion_vertical, param.caracteristicas.grosor_linea)
caracteristicas[-1] = param.dibuja_mal;

// Llamamos a la funcion vieja
fn_forma(param.mc, param.puntas, param.radio, caracteristicas);

}
