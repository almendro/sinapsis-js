/*---------------- ARRAY ------------------*/
// *** neuronas ***
#include "array/fn_unir.as"
#include "array/fn_cual_contiene.as"
#include "array/fn_cual_contiene_array.as"
#include "array/fn_array_a_numero.as"
#include "array/fn_array_simple_ordenada.as"
#include "array/fn_array_seccion.as"
#include "array/fn_array_variacion.as"

// esto es para mantener compatibilidad hacia atra's en proyectos viejos como NEURONAS 1 y 2
#include "numeros/fn_azar.as"
#include "mc/fotograma_azar.as"

// *** NUEVAS ***
// 2010-04-26
#include "array/fn_array_recolectar_indices.as"
#include "array/fn_extraer_valores.as"
// 2010-04-28 
#include "array/fn_establecer_en_nodos.as"
#include "array/fn_mezclar_array.as"
#include "array/fn_copiar_array.as"
#include "array/fn_sumar_nodos.as"

#include "array/fn_array_lineal.as"
#include "array/fn_array_reemplazar.as"
#include "array/fn_quitar_nodo_por_valor.as"
#include "array/fn_filtrar_nodos_array.as"
#include "array/fn_array_coincidencias.as"
// 2011-04-18
#include "array/fn_repartir_en_grupos_al_azar.as"
// 2011-04-25
#include "array/fn_array_comparar.as"
// 2011-10-04
#include "array/fn_aplicar_fn.as"






/*
Historial
2010-12-02
actualizada: fn_array_recolectar_indices.as - se agrego la posibilidad de obtener una salida completa

2010-12-07
Se agrego fn_filtrar_nodos_array

2010-12-20
Agregada: fn_array_coincidencias

2011-04-18
Agregada: fn_repartir_en_grupos_al_azar
modificada: fn_copiar_array. Se agrego' como alternativa pasar como parametro una matriz en vez de un objeto para simplificar la escritura. Ver documentacion.
*/