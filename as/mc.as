tracer_lib(soy_fn,'     FUNCIONES MOVIE CLIP v1');
tracer_lib(soy_fn,'------------------------------------');
tracer_lib(soy_fn,'');
/*
La idea es incluir todas las funciones que tengan que ver con movieclips.

Seguramenta vamos a tener que mover varias
que se encuentran en funciones_tableros.as
*/

#include "meta_eval.as"

#include "mc/fotograma_azar.as"
#include "mc/fn_fotograma_azar.as"
#include "mc/fn_mc_ganar.as"
#include "mc/fn_btn_activar.as"
#include "mc/fn_propiedades_mc.as"
#include "mc/fn_mezclar_mc.as"
#include "mc/fn_limpiar_eventos_mc.as"
#include "mc/fn_limpiar_eventos.as"
#include "mc/fn_gf_orden.as"
#include "mc/fn_fade_ronda.as"
#include "mc/fn_gf_tiempo_fin.as"
#include "mc/fn_fotograma_dispara_funcion.as"
#include "mc/fn_matar_mc_dinamicos.as"
#include "mc/fn_al_cielo.as"
#include "mc/fn_mc_titila.as"
#include "mc/fn_al_fondo.as"

// 24/05/2011
#include "mc/fn_matar_mc.as"

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