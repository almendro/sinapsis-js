


function fn_gf_bien () {
	var soy_fn="fn_gf_bien";
	removeMovieClip('gf_acierto');
	_root._xmouse 
	_root._ymouse
	gf_acierto_mc = _root.createEmptyMovieClip('gf_acierto', _root.getNextHighestDepth()); //se pueden crear ilimitadas formas sobre un 

	_root.gf_acierto._x = _xmouse;
	_root.gf_acierto._y = _ymouse;
	
	if(!(_root.gf_acierto1x == null)) { 
		_root.gf_acierto._x = _root.gf_acierto1x; 	
		_root.gf_acierto._y = _root.gf_acierto1y; 
	}
	loadMovie("graficos/bien.swf", _root.gf_acierto);
}
