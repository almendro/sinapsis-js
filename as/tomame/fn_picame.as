_root.sostiene = false; // esta puede interferir con el drag realizado con programacion, comprobar
function fn_picame (p){
	/*
		funcion para convertir a los objetos en arrastrables

		Esta funcion es un FREAK de tomame
		
	*/
	if (!p) {
		trace ("Funcion para convertir a los objetos en arrastrables");
		trace ("-----------------------------------------------------------");
		trace ("uso:");
		trace ("	nombre_base: nombre base de las fichas ");	
		trace ("	cantidad: 0 a X");
		trace ("	arrastrable: se mueve o es infinito (false)");
	}

	for (nnn=0; nnn < p.cantidad ;nnn++) {	 
	// un foreach a una serie de elementos para hacerlo generico
	
		mc_picame_tmp = eval(p.nombre_base + nnn);
		mc_picame_tmp.mueve = p.mueve?true:false; // para ser interpretada por acierto, x 
		mc_picame_tmp.arrastrable = p.arrastrable;
		mc_picame_tmp.infinito = p.infinito;
		mc_picame_tmp.oculta_mouse = p.oculta_mouse;
		
		_root.mc_tomado = eval(p.mc_tomado); // pieza que toma en lugar de la actual
			
		mc_picame_tmp.onRelease = function () {

			trace ( "Picame: "+this+" txt = "+this.txt);

			// comprueba si esta sosteniendo antes otro mc, y lo vuelva a visualizar
			if(!(_root.sostiene==undefined)) _root.sostiene._visible=true;
			
			_root.sostiene = this;
			
			trace ("_root.sostiene = "+_root.sostiene);
			
			removeMovieClip(_root.mc_drag);		

			if( _root.mc_tomado == undefined) { // no puede solucionarlo de una manera elegante
				//fn_root.sostiene_drag(this);
				duplicateMovieClip(this,"mc_drag",_root.getNextHighestDepth());
			} else {
				//fn_root.sostiene_drag( _root.mc_tomado);
				duplicateMovieClip(	_root.mc_tomado,"mc_drag",_root.getNextHighestDepth());
			}
			
			
			fn_mimo_mc (this, mc_drag);
			if (this.arrastrable) this._visible = false;
			//mc_drag.onRelease = null;
			
			mc_drag.startDrag(true);
			mc_drag.sombra._visible=false;
			if (this.oculta_mouse)  Mouse.hide();

			fn_picame_definir_respuestas (this.txt);
		}//<<< onPress
		
	}//<<< for
}
function  fn_picame_definir_respuestas(p){
	// meter fn_fichas ACA
	
}