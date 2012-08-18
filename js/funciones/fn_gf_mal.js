
function fn_gf_mal () {
	var soy_fn="fn_gf_mal";
	removeMovieClip('gf_acierto');
	_root._xmouse 
	_root._ymouse
	gf_acierto_mc = _root.createEmptyMovieClip('gf_acierto', _root.getNextHighestDepth()); 
	
	_root.gf_acierto._x = _xmouse;
	_root.gf_acierto._y = _ymouse;
	
	if(!(_root.gf_acierto1x == null)) { 
		_root.gf_acierto._x = _root.gf_acierto1x; 	
		_root.gf_acierto._y = _root.gf_acierto1y; 
	}

	loadMovie("graficos/mal.swf", _root.gf_acierto);
}

