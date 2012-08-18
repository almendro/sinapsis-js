tracer_lib(soy_fn,'     FUNCIONES MOVIE CLIP v1');
tracer_lib(soy_fn,'------------------------------------');
tracer_lib(soy_fn,'');
/*
La idea es incluir todas las funciones que tengan que ver con movieclips.

Seguramenta vamos a tener que mover varias
que se encuentran en funciones_tableros.as
*/

include ("meta_eval.js");

include ("mc/fotograma_azar.js");
include ("mc/fn_fotograma_azar.js");
include ("mc/fn_mc_ganar.js");
include ("mc/fn_btn_activar.js");
include ("mc/fn_propiedades_mc.js");
include ("mc/fn_mezclar_mc.js");
include ("mc/fn_limpiar_eventos_mc.js");
include ("mc/fn_limpiar_eventos.js");
include ("mc/fn_gf_orden.js");
include ("mc/fn_fade_ronda.js");
include ("mc/fn_gf_tiempo_fin.js");
include ("mc/fn_fotograma_dispara_funcion.js");
include ("mc/fn_matar_mc_dinamicos.js");
include ("mc/fn_al_cielo.js");
include ("mc/fn_mc_titila.js");
include ("mc/fn_al_fondo.js");

// 24/05/2011
include ("mc/fn_matar_mc.js");

/* HISTORICO

creada el 26/5/2010


4/6/2010
Se copio de 'funciones_tableros.as' la función 'fn_propiedades_mc'.

2010-08-06: 'fn_gf_orden' movido de categoria, tambien lo carga mc

2010-12-14:
agregada:
'fn_fotograma_dispara_funcion'
'fn_matar_mc_dinamicos'

2011-02-09:
fn_al_cielo

2011-04-26
fn_mc_titila
*/