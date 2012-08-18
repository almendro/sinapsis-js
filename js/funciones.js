include ("array.js");
include ("sonido.js");
include ("int/fn_tiemp_dispara.js");
include ("texto.js");

tracer_lib(soy_fn,'------------------------------------');
tracer_lib(soy_fn,'     Funciones para juegos PC3');
tracer_lib(soy_fn,'------------------------------------');

//----variables globales----

var mostrar_fondo_btn = false ; // esta es una variable global que sirve para mostar el fondo de los botones
_lockroot = true;
var dev = false;
_root.gf_acierto1x = null;
_level0.juego_lento = false;
_root.comenzo_juego = true;

//-----------contador de rondas >>>>>>>>

_level0.tiempo_ronda = this._totalframes / 24;  //largo del MClip de juego dividido los Frames x segundo
if (!_level0.rondas) _level0.rondas = 0;
_level0.rondas ++;

//-------------<<<<<<<<<< contador de rondas


include ("funciones/fn_GC.js");
include ("funciones/fn_fichas.js");
include ("funciones/fn_progresion.js");

include ("funciones/fn_elimina_eventos.js"); 

include ("funciones/acierto.js");         
include ("funciones/desacierto.js");         

include ("funciones/acierto_custom.js");  
include ("funciones/desacierto_custom.js");  

include ("funciones/fn_gf_mal.js");    
include ("funciones/fn_gf_bien.js");  

include ("funciones/marcar_MC.js");
