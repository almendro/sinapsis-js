_root.sostiene = false; // esta puede interferir con el drag realizado con programacion, comprobar
function fn_tomame (p){
	/*
		funcion para convertir a los objetos en arrastrables


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
			eval(p.nombre_base + nnn).mueve = p.mueve?true:false; // para ser interpretada por acierto, x 
			eval(p.nombre_base + nnn).arrastrable = p.arrastrable;
			eval(p.nombre_base + nnn).infinito = p.infinito;
			eval(p.nombre_base + nnn).oculta_mouse = p.oculta_mouse;
			_root.mc_tomado = eval(p.mc_tomado); // pieza que toma en lugar de la actual
	
			eval(p.nombre_base + nnn).onPress = eval(p.nombre_base + nnn).onDragOut = function () {
			
				removeMovieClip(_root.mc_drag);		
					
				if( _root.mc_tomado == undefined) { // no puede solucionarlo de una manera elegante
					fn_root.sostiene_drag(this);
					duplicateMovieClip(this,"mc_drag",_root.getNextHighestDepth());
					
				} else {
					fn_root.sostiene_drag( _root.mc_tomado);
					duplicateMovieClip(	_root.mc_tomado,"mc_drag",_root.getNextHighestDepth());
				}
				
				
				fn_mimo_mc (this, mc_drag);
				if (this.arrastrable) this._visible = false;
				
				mc_drag.startDrag(true);
				mc_drag.sombra._visible=false;
				if (this.oculta_mouse)  Mouse.hide();
				// _root.mc_drag.gotoAndStop(this._currentframe);
				_root.mc_drag.onRelease = function() {
					// larga el objeto
					_root.sostiene = false;
		
				
			}
			this.onReleaseOutside  = function () {
				_root.sostiene = this;
				removeMovieClip(_root.mc_drag);		
				if (this.oculta_mouse)  Mouse.show();
			
				_root.fn_tiemp_dispara ( 3, function () { 
					_root.sostiene._visible = true; // transicion de vuelta
			
					_root.sostiene = false;
						
					});
			
				/*
					genera una variable que dura un 1/4 de segundo
							que nutre a la funcion de tiradero.
				*/
			}
			this.onMouseUp = function() {
				if (!(_root.sostiene == this)) return;
				this._visible = true;
				
				_root.sostiene = false;
				if (this.oculta_mouse) Mouse.show();
				stopDrag();
				removeMovieClip(_root.mc_drag);	
			}

		}
	}
}
