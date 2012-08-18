function fn_fichas (mc:String, opciones:Array, respuesta:Array, icognita:Array) {
	var soy_fn="fn_fichas";

	/*--------- IDEA----------
		
			Se podria hacer q ademas de definir TXT esta funcion haga:
						-Que el MClip salte hasta el fotograma de la opcion correspondiente
						-Que si el opcion es 0 se torne invisible
						-
				*** Esto seria muy util en la balanza y las caras ***
					
	
	*/
	/*
		La funcion opciones determina dentro de un MovieClip la funcion Oclick y la variable TXT
		Nuevamente esta funcion es doble, puede crear el tablero de fichas o las opciones de respuesta
		Si la array de icognita es null, considera que esta determinando opciones de respuesta
		
		fn_fichas (
			mc: Numbre en string del MovieClip - este por difinicion debe esta refereciado desde el root
			opciones: para marcar un rango se coloca [min,max], o se introduce una array mayora a 2 para tomar valores de esa array
			respuesta: Array arma las opciones se coloca el valor de respuesta, de los contrario colocar null
			icognita: Array que contiene los nodos que tienen que ser cambiados por incognitas
		)
		
		¿Para que sirve?: 
		
			-Vuelca los valores en MovieClip
			-Crea la variable txt y los OnPress

	*/
#include "../mc/fn_limpiar_eventos_mc.as"
		
	for (n=0; n < opciones.length; n++) {

		MClip = eval(mc+n);
		/*
		fn_limpiar_eventos_mc ({
				nombre_mc: mc+n,
				ruta: ""
		});	
		*/
		
		if(opciones[n] == undefined) MClip._visible = false; 

		tracer_lib(soy_fn," fn_fichas ---> "	+ MClip + " - " + mc+n);

		esicognita =false;
		
		if (icognita.length > 0 ) for (i=0; i < icognita.length; i++) if (n == icognita[i]) { esicognita = true;  break; }
		
		// este tal vez requiera una predifinicion
		MClip.txt = fn_unicode (opciones[n].toString());
		tracer_lib(soy_fn,"GOTO ----> " + opciones[n].toString())
		
		
		MClip.gotoAndStop(Number(opciones[n].toString())+1); // el MC salta hasta el frame correspondiente
	
		if (esicognita) MClip.gotoAndStop(1);
		// mostrar_fondo_btn es una variable global
		MClip.fondo._visible = !mostrar_fondo_btn;
		if (!(respuesta == null )) {
			// parchin
			MClip.onRollOver = function () {
				this.halo._visible = true;
				fn_rollover_custom(this);
			}
			MClip.onRollOut = function () {
				this.halo._visible = false;
				fn_rollout_custom(this);
			}
		}
		
		MClip.halo._visible = false;	// oculta el halo del Mclip
		if (!(respuesta == null ) && esicognita) {	// solo entra si es una incognita y esta definida la respuesta
			MClip.onRollOver = function () {
				this.halo._visible = true;
				fn_rollover_custom(this);
				if (!(respuesta == null) && !(_root.sostiene == false) && mc_drag._visible == true) {
					if ( _root.sostiene.txt == this.txt ) { 
						if (_root.sostiene.oculta_mouse) Mouse.show();
						_root.sostiene.sombra._visible = false;
						acierto_evento(this); 
						_root.sostiene._visible = true;
						_root.sostiene.sombra._visible = true;
						fn_mimo_mc (_root.sostiene, this); // imita la ficha tomada
						
						if (_root.sostiene.arrastrable) { 
							_root.sostiene._visible = false;
							_root.sostiene.sombra._visible = false;
							
						}//mata el original si es arrastrable
						if (_root.sostiene.infinito)  { 
							_root.sostiene._visible = true; 
							_root.sostiene.sombra._visible = true;
						} 
							
						
						//mata el original si es arrastrable
					}	else desacierto_evento(this);
					_root.sostiene = false;	// le saca el evento al sostener
				}
			}
			MClip.onRollOut = function () {
				this.halo._visible = false;
				fn_rollout_custom(this);
			}
			MClip.onDragOut = function () {
				this.halo._visible = false;
			}
		}
			
		
		
		if ((!(respuesta == null) && esicognita) || (!(respuesta == null) && icognita == null)) {	// solo tiene eventos si sabe la respuesta
		
			tracer_lib(soy_fn,"RESPUESTA ----> "+fn_cual_contiene(respuesta, opciones[n]))
			if (!(fn_cual_contiene(respuesta, opciones[n]) == null)) { 
				MClip.onPress = MClip.click = function () { 
				 	acierto_evento (this)
				}
			} else {
				MClip.onPress = MClip.click = function () { 
						/*mal*/
					 desacierto_evento (this)
				}
			}
			
			
		}
	}
	return opciones; // devuelve las opciones esto siver para creaciones implicitas 'opciones = fn_fichas (null, fn_GC(....'
}




/*------------------- RESPUESTA ------------*/


function acierto_evento (mc) {
		if (_root.comenzo_juego) {
			/*acierto*/
			tracer_lib(soy_fn,"hay!");

			marcar_MC(mc);
			acierto(mc.txt);
			mc.onPress = null;
			mc.onRollOver = null;
									
			acierto_custom (mc);
			
		}
}
function desacierto_evento (mc) {
		if (_root.comenzo_juego) {
			_root.sostiene._visible = true;
			tracer_lib(soy_fn,"hay!");
			fn_elimina_eventos (); // ESTO ESTA MAL, hay que quitarlo, pero verificar en los juegos anteriores al 29/9/2010
			desacierto ();
			mc.onPress = null;
			desacierto_custom (mc);
		}
}
