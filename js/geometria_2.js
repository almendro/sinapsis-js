tracer_lib(soy_fn,'     GEOMETRIA v2');
tracer_lib(soy_fn,'------------------------------------');

include ("geometria.js");

include ("geometria2/fn_forma_crear.js");
include ("geometria2/fn_forma_dibujo.js");

/*
Historial

2010-04-24
creacion de la libreria.
Esta libreria reemplaza la funcion 'fn_forma_dibujo' usada en su antecesora 'geometria.as'
compatibilizando los parametros y agregando uno nuevo.

2010-04-25
incluimos la libreria original para evitar tener que linkear librerias en los juegos nuevos

?fecha?
fn_forma_crear
inclusion del parametro 'dibuja_mal

13/06/10
	Simplifique 'Case', if, var, que podian llegar a relentizar al ejecucion
*/
