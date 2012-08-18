function fn_mc_ganar () {
	var soy_fn="fn_mc_ganar";
	 fn_mc_ganar_matar ();
	// crea el MovieClip de festo de victoria
	_level0.createEmptyMovieClip('gf_ganar', _level0.getNextHighestDepth()); 
	loadMovie("graficos/ganar.swf", _level0.gf_ganar);
}

function fn_mc_ganar_matar () {
	var soy_fn="fn_mc_ganar_matar";
	removeMovieClip('_level0.gf_ganar');
}
function fn_parche_ayuda (){
	/* oculta el cartel de ganar si ponemos la ayuda en los juegos donde esta todo contenido en un movieclip. Ej.: tangram, mr_sabio, rush_hour, domino */
	this.createEmptyMovieClip("parche_ayuda_mc",this.getNextHighestDepth());
	parche_ayuda_mc.onEnterFrame = function(){
		if(ayuda._currentframe!=1){
			_level0.gf_ganar._visible = false;
		} else {
			_level0.gf_ganar._visible = true;
		}
	}
}
/*
30/5/2010
Actualizada fn_mc_ganar_matar agregando _level0 porque en ocaciones no lo mata
si el juego esta dentro de otro mc.

*/