tracer_lib(soy_fn,'     FUNCIONES TABLEROS v1');
tracer_lib(soy_fn,'------------------------------------');
tracer_lib(soy_fn,'');

tracer_lib(soy_fn,"// requeridos ->");
include ("numeros.js");
include ("trigonometria.js");
include ("meta_eval.js");
tracer_lib(soy_fn,"// <- requeridos");

tracer_lib(soy_fn,"// especificos >>>");
include ("funciones_tableros/fn_anti_fichas.js");
include ("funciones_tableros/examinar_fichas.js");
include ("funciones_tableros/lineal_a_coord.js");
include ("funciones_tableros/coord_a_num_lineal.js");
include ("funciones_tableros/valor_fichas_listado.js");
include ("funciones_tableros/marcar_fichas.js");
include ("funciones_tableros/crear_tablero.js");
include ("funciones_tableros/codificar_tablero.js");
include ("funciones_tableros/decodificar_tablero.js");
include ("funciones_tableros/fn_fichas_recorrer_camino.js");
include ("funciones_tableros/fn_fichas_area_continua.js");
include ("funciones_tableros/fn_pos_xy.js");
include ("funciones_tableros/fn_recolectar_perimetro.js");
include ("funciones_tableros/fn_fichas_salto.js");
include ("funciones_tableros/fn_comprobar_fichas_figuras.js");
include ("funciones_tableros/fn_perimetro_maximo.js");
include ("funciones_tableros/fn_ficha_movimientos_posibles.js");
tracer_lib(soy_fn,"// <<< especificos");

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
tracer_lib(soy_fn,"// compatibilidad hacia atras ->");
include ("mc/fn_propiedades_mc.js");
include ("mc/fn_mezclar_mc.js");
include ("mc/fn_limpiar_eventos_mc.js");
include ("mc/fn_limpiar_eventos.js");
tracer_lib(soy_fn,"// <- compatibilidad hacia atras ");
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*
Historial

2010-04-25
Agregadas funciones para manejar posiciones y coordenadas

2010-04-26
Agregada la funcion 'valor_fichas_listado'

2010-04-27
Agregada 'marcar_fichas' y 'crear_tablero'

2010-05-02
funcion 'crear_tablero': Corregida la linea en la que se verifica el numero de 
ficha actual para evitar que sobrepase el total de fichas. Cuando se pasaba el
parametro 'base_nro_fichas' igual a 1 se cortaba la ultima ficha.
Ahora le sumamos esa base al final

if (nro_ficha<cantidad_fichas+ base_nro_fichas) {

2010-05-04
Retoque funcion lineal_a_coord en param.filas && param.columnas

2010-05-12
Agregadas
	codificar_tablero
	decodificar_tablero
	fn_propiedades_mc
	fn_mezclar_mc
	fn_limpiar_eventos_mc
	fn_limpiar_eventos
	
2010-06-08
se simplificaron un poco las funciones de coordenadas a posicion
y se crearon unas versiones con parametros mejorados: fn_pos_xy.as

2010-06-15

Agrege margenes en el triangulo de crear_tablero (respetando los que se usaban para el resto de las figuras)
La funcion todavia tiene muchos errores (fantasmas) cuando se trata de crear 2 o mas tablero, sobre el mismo escenario

2010-12-02
Agregada fn_fichas_salto
Actualizada:
valor_fichas_listado - se le agrego un parametro para que devuelva una matriz completa con null en los valores que se escapan del tablero

2010-12-19
Actualizada:
fn_fichas_area_continua.as
ahora tienen un par de parametros mas, por defecto busca en tableros hexagonales, hay que enviar el parametro tablero.especial segun el caso.
Tambien puede verificar el inverso de ficha_vacia para determinar los bordes.

2010-12-20
Agregada
fn_comprobar_fichas_figuras
Esta funcion es una modificacion de la originaria del SIX para comprobar figuras con las fichas, ranquear
MEJORAR 21/6/2010
Hay que cambiar el modo de indexar el ranking
de manera tal que el indice de cada elemento apunte a la ficha

2011-03-28
valor_ficha_listado.as
Modificada: correccion de la comprobacio'n de fuera de tablero no era efectiva en tableros chicos cuando se solicitaba una ficha relativa a grandes distancias. Se agrego' una comprobacio'n de coordenadas antes de definir la ficha objetivo. En teoria sigue siendo compatible con los juegos anteriores.

2011-04-01
nuevas:
fn_perimetro_maximo.as
fn_ficha_movimientos_posibles.as (esta ya estaba en 4 en fila)
*/
