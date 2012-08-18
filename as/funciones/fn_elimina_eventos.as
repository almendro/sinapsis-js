function fn_elimina_eventos () {
		var soy_fn="fn_elimina_eventos";
	for (var name in this) { 
		if (typeof (this[name]) == "movieclip") { 
			this[name].onPress = null;
			this[name].onRollOut = null;		
			this[name].onRollOver = null;
			this[name].onRelease = null;	
		}
	}
	
}
