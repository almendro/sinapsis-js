/*
function fn_ani_pop (mc, escala, fts, tipo, funcion) {
	var soy_fn="fn_ani_pop";

//		mc: MovieClip en string
//		escala:[ x, y , w, h, alfa ,... ]
//		fts: [0, 0] 
//		0- Delay
//		1- largo de la animacion en fotogramas 
			

	
	MClip = eval(mc);
	if(fts == undefined) fts = [0,1];
	
	anima_nombre = "animacion" +fn_azar([1,100000000]);
	
	MClip.createEmptyMovieClip(anima_nombre, MClip.getNextHighestDepth()); 

	MClip[anima_nombre].escala =  escala;
	tracer_lib(soy_fn,"Posiciones finales ----> " +anima_nombre + " - "+  escala);
	MClip[anima_nombre].fts = fts;
	MClip[anima_nombre].fts_actual = 0;
	MClip[anima_nombre].fts_delay_actual= 0;
	MClip[anima_nombre].tipo= tipo;


	
	// funcion global para desarrollo
	 fn_ani_linea_tiempo (mc, escala, fts, tipo);
	 

	
	MClip[anima_nombre].onEnterFrame = function () {
		if (this.fts[0] == this.fts_delay_actual) {
			this.rt = 1 / this.fts[1];
			if(this.tipo == 'cos')	this.rt = (1 - Math.cos( 3.14 / this.fts[1]   *  this.fts_actual)) / this.fts[1] ;
			
			this._parent._x +=  this.escala[0]  * this.rt ;
			this._parent._y += this.escala[1] * this.rt ;
			this._parent._xscale += this.escala[2]  * this.rt ;
			this._parent._yscale += this.escala[3] * this.rt;
			this._parent._alpha += this.escala[4]  *this.rt ;
			this._parent._rotation += this.escala[5]  *this.rt ;
			this.fts_actual ++;
			
			tracer_lib(soy_fn,this._parent._y)
			
			// funcion global para desarrollo
			 fn_ani_linea_tiempo_posicion (this);
			
			if (this.fts[1] == this.fts_actual) {
				funcion();
				this.removeMovieClip();
				//this = undefined;
			}
		} else {
				this.fts_delay_actual  ++ ;
		}
		
	}
	return MClip[anima_nombre]
}
*/

function fn_animacion_guia (p) {
        /*
                Esta funcion clona las posiciones de Mclips contenidos en el MC "animacion_guia" con sus clones en el plano que se incluya la funcion
                NOTA: siempre tiene que existir un MC que se llame "animaion_guia" que contenga a los movieclip clones
                cantidad: cantidad de MC
                nombre: nombre base del MC
								
								completo: true para clonar rotacion y escala.
        */

        for (n=0; n < p.cantidad; n++){
                trace (n);
                MC = eval('animacion_guia.'+p.nombre+n);
                if (!_root.dev) MC._visible = false;
                MC.txt = n;
								MC.completo = p.completo;
                MC.onEnterFrame = function () {
                        this._parent._parent[this._name]._x = this._x;
                        this._parent._parent[this._name]._y = this._y;
												if(this.completo){
													this._parent._parent[this._name]._yscale = this._yscale;
													this._parent._parent[this._name]._xscale = this._xscale;
													this._parent._parent[this._name]._rotation = this._rotation; 	
												}
                }
        }

}

function fn_aplicar_fn (e){

	var soy_fn="fn_aplicar_fn";
	tracer_fi("fn_aplicar_fn",e);

	/*
	Aplica a todos los elementos del array una funcion para convertir los valores
	
	fn_aplicar_fn ({
		array: Array,
		funcion: String | Array de funciones,
	});

	*/

	var array = e.array;
	var funcion = e.funcion;
	var e = e.e; // parametros
	var clave = e.clave;
	
	var salida = [];
	var param;
	
	// recorremos los elementos de la matriz y aplicamos a cada uno la funcion
	for(var n = 0; n < array.length; n++){

		// verificamos si la funcion lleva multiples parametros
		if (e == undefined ) {
			param = array[n];
		} else {
			param = e;
			for (var p in e ) {
				//trace ("p");
				if (p==clave) param[p] = array[n];
			}
		}
		
		salida [n] = funcion(param) || eval(funcion)(param);
		
	}//<<< for
	
	return salida

}// fn_array_a_numero.as

function fn_array_a_numero (numero_a_pasar) {
	var soy_fn="fn_array_a_numero";
	//Convierte un array en un numero
	salida = Number(numero_a_pasar.toString());
	if (!salida ) salida = 0;
	return salida
}

function fn_array_coincidencias (e) {
	var soy_fn="fn_array_coincidencias";
	/*
	fn_array_coincidencias({
		array_a: Array,
		array_b: Array
	});
	*/
	var array_a = e.array_a;
	var array_b = e.array_b;
	
	var salida = [];
	
	for (var n = 0; n<array_a.length; n++) {
		if ( fn_cual_contiene ( array_b, array_a[n] , true) > 0 ) salida[ salida.length] = array_a[n];
	}
	
	return salida
}//fn_array_comparar.as
function fn_array_comparar (e) {
	var soy_fn="fn_array_comparar";
	/*
	Que hace:
	Compara 2 array si los mismos nodos tienen el mismo valor.
	Devuelve false si encuentra una diferencia
	
	Si se especifica el parametro 'todos' en true (por defecto es false) entonces devuelve una matriz con los nodos no coincidente.
	
	fn_array_comparar({
		array_a: Array,
		array_b: Array,
		todos: Boolean
	});
	*/
	var array_a = e.array_a;
	var array_b = e.array_b;
	var todos = (e.todos==undefined)?false:e.todos;
	// recorremos de la que tiene mas elementos.
	if (array_a.length < array_b.length) {
		array_a = e.array_b;
		array_b = e.array_a;
	}
	
	var salida = [];
	
	for (var n = 0; n<array_a.length; n++) {
		// comparamos si son desiguales
		if ( array_a[n] != array_b[n] ) {
			// si hay que revisar todos, almacenamos la salida
			if ( todos == true ) {
				salida[salida.length]=n;
			} else {
			// si no, cortamos y salimos con false
				return false;
			}
		}
	}
	return (todos==true && salida.length>0)?salida:true;
}//fn_array_lineal.as
function fn_array_lineal(param){
	var soy_fn="fn_array_lineal";
	/*
	Devuelve una matriz desde rango[0] a rango[1]
	donde cada nodo tiene por valor el numero de nodo
	
	fn_array_lineal({
		rango:[min,max]
	});
	
	Ej: 
	
	matriz = fn_array_lineal({
		rango:[0,10]
	});
	
	tracer_lib(soy_fn, matriz[0] ); 	// -> 0
	tracer_lib(soy_fn, matriz[1] ); 	// -> 1
	tracer_lib(soy_fn, matriz[10] ); 	// -> 10
	*/
	salida = [];
	for(var n = param.rango[0]; n < param.rango[1]; n++){
		salida[n]=n;
	}
	return salida
}
function fn_array_recolectar_indices(param){
	var soy_fn="fn_array_recolectar_indices";
	/*
	Devuelve una matriz con todos los indices donde aparece el valor indicado
	
	fn_array_recolectar_indices({
		matriz: array,
		valor: cualquier cosas simple String, Boolean, Number. No objetos (Array u Object) ,
		salida_completa: boolean (por defecto false) ,
		inverso: boolean (por defecto false)
	});
	
	Ej:
		// nodo    0 1 2 3 4 5 6 7
		tablero = [0,3,2,3,3,2,0,0]
		
		mis_fichas = fn_array_recolectar_indices({
			matriz: tablero,
			valor: 3,
		});
		
		tracer_lib(soy_fn,mis_fichas); // => 1,3,4
	*/
	

	tracer_fi("fn_array_recolectar_indices",param);
	
	var matriz = param.matriz;
	var valor = param.valor;
	var salida_completa = param.salida_completa;
	var inverso = param.inverso;
	
	// por defecto filtra las fichas fuera del tablero
	if (salida_completa == undefined || salida_completa == null ) salida_completa = false;
	if (inverso == undefined || inverso == null ) inverso = false;
	
	trace("inverso = "+inverso);
	
	var salida = [];

	tracer_fi("fn_array_recolectar_indices","AAAAAA");
	
	for(var indice=0; indice < matriz.length; indice++){
	trace("indice "+indice);
	trace("(matriz[indice] == valor && inverso==false) "+(matriz[indice] == valor && inverso==false));
	trace("(matriz[indice] != valor && inverso==true) "+(matriz[indice] != valor && inverso==true));
		if ( (matriz[indice] == valor && inverso==false) || (matriz[indice] != valor && inverso==true) ) {
			salida.push(indice);
		} else if (salida_completa) {
			salida.push(undefined);
		}
	}
	tracer_ff("fn_array_recolectar_indices",salida);
	return salida
}//fn_array_reemplazar.as

function fn_array_reemplazar (param){
	var soy_fn="fn_array_reemplazar";
	
	/*
	Busca y reemplaza un valor dentro de toda la matriz
	
	fn_array_reemplazar({
		array: Array,
		valor_buscar: cualquiera*,
		valor_poner: cualquiera
	});
	
	* Tambien reemplaza undefined y null !!!
	
	*/
	var array 				= param.array;
	var valor_buscar	=	param.valor_buscar;
	var valor_poner		=	param.valor_poner;
	
	for(var n=0;n < array.length; n++){
		if( array[n] == valor_buscar ) array[n]=valor_poner;
	}
	
	return array;
} 

function fn_array_seccion (array, rango) {
	var soy_fn="fn_array_seccion";
	if (rango[0] > rango[1])  { 
		tmp = rango[1];
		rango[1] = rango[0];
		rango[0] = tmp
	}
	var salida = new Array(); 
	for (w=rango[0]; w < rango[1]; w++) salida[salida.length] = array[w];
	// devuelve solo los nodos dentro del rango
	return salida
}// fn_array_simple_ordenada

function fn_array_simple_ordenada (arraya) {
	var soy_fn="fn_array_simple_ordenada";
	// Quita los nodos duplicados y casa la array en orden acendente
	arraya = arraya.sort(Array.DESCENDING | Array.NUMERIC); 	
	var salida = new Array();
	for (n=0; n < arraya.length; n++) if (!(arraya[n] == salida[salida.length-1]) && !arraya[n]==0) salida[salida.length]=arraya[n];
	return salida
}//-----------------promocionar como meta funcion



function fn_array_variacion (array, rango) {
	var soy_fn="fn_array_variacion";
	/// ===== ADVERTENCIA ==== la array debe ser lo suficientemente larga!!!!!!!!
	inicio = rango[0] ; // se toma de 2 a 3 nodos
	fin = array.length - rango[1]// el largo menos 2 a 3 nodos
	
	a = fn_array_seccion(array, [0, inicio]);
	do {
		b = fn_GC(null, fn_array_seccion(array, [inicio,fin]), fin-inicio);
		c = fn_array_seccion(array, [fin, array.length]);	
		salida = fn_unir(fn_unir(a , b), c);
	} while (salida == array)
	
	return salida
}
function fn_copiar_array ( e ) {
	var soy_fn="fn_copiar_array";
	/*
	Devuelve una matriz identica a la entrada rompiendo el enlace que produce Flash al asignar una matriz entera. Ver ma's abajo
	Esta funcion copia recursivamente si un nodo tiene como valor una matriz.
	
	Sintaxis:
	
		fn_copiar_array({matriz: Array}); // compatibilidad vieja
		fn_copiar_array(array);
		
	Esta funcion es necesaria para evitar que Flash haga de las suyas con las matrices. Cuando se asigna a una variable con el signo = a una matriz entera*, al cambiar la matriz original, tambie'n cambia la variable. Esto puede traer problemas si se quieren realizar cambios en una copia y mantener la original.
	
	* Nota: si la asignacio'n se hace a un elemento de la matriz distinto de una matriz entera, entonce no se produce el enlazamiento.
	
	Ej:
	
		tablero = [1,2,3,4,[11,22,33,[444,555]]];
		tablero_copia1 = tablero;											// <--- COPIA enlazada
		tablero_copia2 = fn_copiar_array (tablero); 	// <--- COPIA auto'noma.
		
		tablero_tmp = [0,0,0,0];
		tablero_tmp [0] = tablero [4][3][0]; // <--- so'lo copia un nodo especi'fico.
		
		// AQUI VA EL CAMBIO en la matriz original
		tablero [0] = 5;
		tablero [2] = 7;
		tablero [4][3][0] = "4x4";
		tablero [4][3][1] = ["5x5",55555];
		
		trace (ver(tablero)); 			// -> [5,2,7,4,[11,22,33,['4x4',['5x5',55555]]]]
		trace (ver(tablero_copia1));// -> [5,2,7,4,[11,22,33,['4x4',['5x5',55555]]]] <--- esta copia cambio'
		trace (ver(tablero_copia2));// -> [1,2,3,4,[11,22,33,[444,555]]]						 <--- esta copia NO cambio'
		trace (ver(tablero_tmp));	 	// -> [444,0,0,0] <--- el nodo [0] no cambio'
		
	*/
	var matriz = e.matriz==undefined ? e : e.matriz; // compatibilidad vieja
	var salida = [];
	var tmp;
	for ( var k=0; k<matriz.length; k++ ) {
		tmp = matriz[k];
		if(typeof(tmp)=="object" && tmp.length) {
			salida[k]=fn_copiar_array(tmp);
		} else {
			salida[k]=tmp;
		}
	}
	return salida
}
function fn_cual_contiene (arraya, resultado, cantidad ) {
	var soy_fn="fn_cual_contiene";
	cantidad_n = 0;
	// resultado puede ser texto o numeros
	if (resultado == null) return null;
	// Busca que nodo es el que contiene el numero de nodo
	// tambien se puede usar para saber si el resultado esta en un nodo (¿esta contenido en?)
	for (nnn=0; nnn < arraya.length ; nnn++) if (resultado.toString() == arraya[nnn].toString()) if(cantidad) cantidad_n ++; else return nnn;
	if(cantidad) return cantidad_n;
	return null;
}
function fn_cual_contiene_array (arraya, arrayb) {
	var soy_fn="fn_cual_contiene_array";
	cantidad_n = 0;
	for (nnn=0; nnn < arraya.length ; nnn++) cantidad_n += fn_cual_contiene (arrayb, arraya[nnn], true); 
	return cantidad_n;
}
function fn_establecer_en_nodos (param){
	var soy_fn="fn_establecer_en_nodos";
	/*
	Recibe una matriz y coloca en los nodos indicados por listado el valor.
	Devuelve la matriz actualizada
	
	fn_establecer_en_nodos({
		matriz: Array,
		listado_nodos: Array,
		valor: cualquiera cosa
	});
	
	
	Ejemplo:
	
		Supongamos que en un tablero de 5 fichas el jugador "a" captura fichas 
		en las posiciones 1, 4 y 5.
		
		tablero = [0,0,0,0,0];
		listado = [0,3,4];
		
		tablero = fn_establecer_en_nodos({
			matriz:tablero,
			listado: listado,
			valor: "a"
		});
		
		tracer_lib(soy_fn,tablero) // => a,0,0,a,a
	*/

	tracer_fi("fn_establecer_en_nodos",param);
	
	var matriz = param.matriz;
	var listado_nodos = param.listado_nodos;
	var valor = param.valor;
	
	for(var ii in listado_nodos){
		matriz[listado_nodos[ii]] = valor;
	}
	
	tracer_ff("fn_establecer_en_nodos",matriz);
	return matriz;
}// fn_extraer_valores

function fn_extraer_valores (param){
	var soy_fn="fn_extraer_valores";
	/*
	Extrae los valores de la matriz A usando como indices los valores de la matriz B
	Devuelve una matriz con los valores
	
	fn_extraer_valores({
		matriz_a,
		matriz_b
	});
	
	ej: Supongamos que nos interesa extraer los valores de unas fichas para
	hacer alguna comprobacion.
	
	tablero = [0,3,3,0,3,2,0];
	indices = [0,2,4,5];
	
	porcion = fn_extraer_valores({
		matriz_a: tablero
		matriz_b: indices
	});
	
	tracer_lib(soy_fn,porcion); // => [0,3,3,2]
	
	*/
	tracer_fi("fn_extraer_valores",param);
	
	var matriz_a = param.matriz_a;
	var matriz_b = param.matriz_b;
	
	var salida = [];
	
	for(var indice=0; indice < matriz_b.length; indice++){

		var indexar = matriz_b[indice];
		salida.push( matriz_a[indexar] );

	}
	tracer_fi("fn_extraer_valores",salida);
	return salida
}
//include ("../meta_eval.js");

function fn_filtrar_nodos_array (e) {
	/*
	fn_filtrar_nodos_array ({
		array: Array,
		valor: Number,
		condicion: String
	});
	*/
	var salida = [];
	for ( var ppp = 0 ; ppp < e.array.length ; ppp ++ ) {
		//if ( e.array [ ppp ].length > 4 ) salida[salida.length] = e.array [ ppp ];
		if ( fn_compara ( e.array [ ppp ].length+e.condicion+e.valor ) ) salida[salida.length] = e.array [ ppp ];
	}
	return salida
}
function fn_mezclar_array(param){
	var soy_fn="fn_mezclar_array";
	
	tracer_fi("fn_mezclar_array",param);
	
	if ( !(param.matriz) ) {
		var matriz = param;
	} else {
		var matriz = param.matriz;
	}
	
	var salida = [];
	
	
	// generamos un listado de indices desordenado
	var rango_min = 0;
	var rango_max = matriz.length;
	
	var mezclada = fn_GC(null,[rango_min,rango_max-1],rango_max,false);
	
	salida = fn_extraer_valores({
		matriz_a: matriz,
		matriz_b: mezclada
	});
	
	tracer_ff("fn_mezclar_array",salida);
	return salida
}
function fn_quitar_nodo_por_valor (e) {
	soy_fn = "fn_quitar_nodo_por_valor";
	/*
		Quita un nodo que lleve el valor indicado
		ejemplo:
			fn_quitar_nodo_por_valor ({array:[1,2,3,4,5], valor: 3 }) --resultado--> [1,2,4,5]

	*/
	salida = [];
	if (typeof(e.valor) == 'array' ) {
		salida = e.array;
		for( n=0; n < e.valor.length; n++) salida = fn_quitar_nodo_por_valor ({array:salida, valor: e.valor[n] });
	} else {
		for(n=0; n < e.array.length; n++) if (!(e.array[n] == e.valor)) salida[salida.length] = e.array[n];	
	}
	return salida
}


function fn_repartir_en_grupos_al_azar (e){
	/*
	
	Reparte X cantidad en G grupos, y devuelve una matriz con la cantidad de elementos que le corresponde a cada grupo.
	
	Sintaxis:
	
	fn_repartir_en_grupos_al_azar ({
		cantidad: Number,
		grupos: Number
	});
	
	Nota: si la cantidad a repartir es menor al numero de grupos entonces devuelve un solo grupo con toda la cantidad.
	
	Ejemplo:
	
		piedras = 10;
		hoyos = 3;
		
		grupos = fn_repartir_en_grupos_al_azar ({
			cantidad: piedras,
			grupos: hoyos
		});
	
		trace (grupos); // 3,2,5   --- 3+2+5 = 10
		
	*/
	
	// DEV >>>
	var soy_fn="fn_repartir_en_grupos_al_azar";
	tracer_fi(soy_fn,param);
	// <<< DEV
	
	var cantidad = e.cantidad;
	var grupos = e.grupos;
	
	var salida = [];
	
	if(cantidad<grupos) return [cantidad]; // si la cantidad es menor, salimos con un solo grupo.
	
	var cantidad_por_grupo = Math.floor(cantidad/grupos); // redondeamos para abajo. Importante no cambiar esto.
	
	for ( var g = 0 ; g < grupos ; g ++ ) {
		salida [ g ] = fn_azar ( [ 1 , cantidad_por_grupo ] ); // seleccionamos al azar la cantidad dentro del limite por grupo.
		cantidad -= salida [ g ]; // vamos dejando el resto para el u'ltimo grupo.
	}
	salida[salida.length-1] += cantidad; // en el u'ltimo tramo juntamos lo que haya sobrado
	
	salida = fn_mezclar_array(salida); // mezclamos todo
	
	// DEV >>>
	tracer_ff(soy_fn,salida);
	// <<< DEV
	
	return salida
}
function fn_sumar_nodos(param){
	var soy_fn="fn_sumar_nodos";
	/*
	Devuelve la suma del valor de todos los nodos en diferentes formas
		fn_sumar_nodos({
			matriz:mis_puntos,
			tipo_salida:"string" || "number"
			});
		
	si no se especifica 'tipo_salida' suma todo tal cual lo encuentra,
	si hay algun null o undefined devolvera NaN (chequear)
	
	Si se espeficia 'tipo_salida="string" ' devuelve una cadena [4,6] => "46"
	Si se espeficia 'tipo_salida="number" ' devuelve un numero [4,6] => 10
	*/
	
	var matriz = param.matriz;
	var tipo_salida = param.tipo_salida; // String, Number o por defecto lo que sea, puede devolver Nan.
	
	var salida = 0;
	if (tipo_salida=="string") salida = "";
	
	for(var a=0; a<matriz.length; a++){
		if(tipo_salida==null || tipo_salida==undefined){
			salida+=matriz[a];
		} else {
			if(matriz[a]!=null && matriz[a]!=undefined){
				if(tipo_salida=="string"){
					salida+=String(matriz[a]);
				} else {
					salida+=Number(matriz[a]);
				}
			}
		}
	}
	return salida
}
function fn_unir (arraya, arrayb) {
	var soy_fn="fn_unir";
	// une dos array
	var salida = new Array(); 
	for (n=0; n < arraya.length ; n++) salida[n] = arraya[n];
	for (i=0; i < arrayb.length ; i++) salida[i+(arraya.length)] = arrayb[i];
	return salida
}
function fn_cadena_array (param){
	var soy_fn="fn_cadena_array";

/*
	fn_cadena_array({
		cadena || Array,
		columnas
	})
	
	Toma una cadena o una matriz lineal y coloca cada caracter en una matriz bidimensional
	tomando el ancho en columnas y rellenando con ceros los espacios vacios
*/
	tracer_fi("fn_cadena_array",param);
	
	// obtenemos los parametros
	var cadena = param.cadena;
	var columnas = param.columnas;
	
	
	// calculamos
	if(typeof(cadena)=='string') cadena = cadena.split("");
	
	var filas = Math.ceil (cadena.length / columnas);
	var salida = new Array();
	
	for (var yy = 0; yy < filas; yy++)  {
		salida[yy] = [];
		for (var xx=0; xx < columnas; xx++) {
			salida[yy][xx] = cadena[xx+yy*columnas];
			if ( salida[yy][xx]==null || salida[yy][xx]==undefined ) salida[yy][xx]=0;
		}
	} 	
				
 	tracer_ff("fn_cadena_array",salida);
	return salida
}
function fn_generar_matriz_grafica (entrada) {
	var soy_fn="fn_generar_matriz_grafica";
	
	tracer_lib(soy_fn," DIBUJAR MATRIZ GRAFICA ");
	
//	if (!dev_graficar_matriz) return
	// tamanio=[ancho,alto] (elementos)
	// tamanio_casilla=[ancho,alto] (pixels)
	
	/*		
	fn_sumar_matriz ({	
							ancho: numero, 
							alto: numero, 
							tablero:tablero_array, 
							tamanio_casilla:pixels, 
						})
*/
	// tamanio = [entrada.ancho, entrada.alto];
	tamanio_casilla = entrada.tamanio_casilla;
	nnn = 0;
	removeMovieClip("mc_tablero"); // genera el tablero dentro de un MClip
	this.createEmptyMovieClip("mc_tablero", this.getNextHighestDepth());
	
	for (yy=0; yy < entrada.alto; yy++) {
		for (xx=0; xx < entrada.ancho; xx++) {
			
			if (!(entrada.tablero[xx][yy] == 0)) {
				mc_tablero.createEmptyMovieClip("mc"+nnn, mc_tablero.getNextHighestDepth()); 
				MClip = eval("mc_tablero.mc"+nnn);
				MClip._x = (xx*tamanio_casilla) + (tamanio_casilla/2);
				MClip._y = (yy*tamanio_casilla) + (tamanio_casilla/2);
				MClip._alpha = 100;
				
				fn_forma_crear({
								mc:"mc_tablero.mc"+nnn,
								puntas:1,
								radio:tamanio_casilla*.5,
								caracteristicas: {
									grosor_linea: 1,
									color_linea:(entrada.tablero[xx][yy]),
									color_relleno:null,
									dibuja_mal: true
								}})
				
				nnn++;
			}
		}
	}
}
function fn_matriz  (entrada) {
	var soy_fn="fn_matriz";
		/*
			entrada: 
						ancho:	cantidad de elementos de ancho
						alto:	cantidad de elementos de alto
						elemento: con el que llenar la matriz
			salida:
						devuelve una matriz de ancho y alto determinado		
		*/
		
		salida = [];
		for (yy = 0; yy < entrada.alto; yy++)  {
			salida[yy] = [];
			for (xx = 0; xx < entrada.ancho; xx++) salida[yy][xx] = entrada.elemento;
		}
		return salida
}
function fn_matriz_a_cadena (entrada) {
	var soy_fn="fn_matriz_a_cadena";
	// entra una matriz 2 entrada y sale una cadena (array)
	salida = []
	for (nn = 0; nn < entrada.length; nn++) for (ii = 0; ii < entrada[nn].length; ii++) salida[salida.length] = entrada[nn][ii];
	return salida
}
function fn_matriz_a_posicion  (entrada)  {
	var soy_fn="fn_matriz_a_posicion";

	MClip = eval(entrada.mc); // Pieza
	//----------------calculos de posicion	
	MClip._x = Math.round(entrada.x*entrada.tamanio_casilla);
	MClip._y = Math.round(entrada.y*entrada.tamanio_casilla);
	
}
function fn_matriz_a_string (entrada) {
	var soy_fn="fn_matriz_a_string";
	// entra una matriz (entrada) sale una cadena (array)
	salida="";	
	for (nn = 0; nn < entrada.length; nn++) salida  += entrada[nn];
	return salida
}
function fn_matriz_columna (entrada) {
	var soy_fn="fn_matriz_columna";
	/*
		entrada:
			columna: numero de columna
			array: donde quitar la columna
		salida:
			Array de forma de cadena
	*/
	// extrae una columna de una matriz 
	var salida = new Array(); 
	for (i=0; i < entrada.array.length ; i++) salida[salida.length] = entrada.array[i][entrada.columna];
	return salida
}
function fn_matriz_flip (entrada) {
	var soy_fn="fn_matriz_flip";
	salida=[];
	for (n=0; n < entrada.length ; n++) {
		salida[n]=[];
		for (i=0; i < entrada[0].length ; i++) {
			// rota la matriz y ademas remplaza 2 x 1 y 1 x 2
			salida[n][i] = entrada[n][entrada[0].length-i-1]==1?2:entrada[n][entrada[0].length-i-1]==2?1:entrada[n][entrada[0].length-i-1]; // if comparativo
		}
	}
	tracer_lib(soy_fn,'rotando matriz');
	return salida
}
function fn_matriz_flop (entrada) {
	var soy_fn="fn_matriz_flop";
	salida=[];
	for (n=0; n < entrada.length ; n++) {
		salida[n]=[];
		for (i=0; i < entrada[0].length ; i++) {
			// rota la matriz y ademas remplaza 2 x 1 y 1 x 2
			salida[n][i] = entrada[entrada.length-n-1][i]==1?2:entrada[entrada.length-n-1][i]==2?1:entrada[entrada.length-n-1][i]; // if comparativo
		}
	}
	tracer_lib(soy_fn,'rotando matriz');
	return salida
}// fn_matriz_rotar_90

function fn_matriz_rotar_90 (entrada) {
	var soy_fn="fn_matriz_rotar_90";
	salida=[];
	for (var n=0; n < entrada[0].length ; n++) {
		salida[n]=[];
		for (var i=0; i < entrada.length ; i++) {
			// rota la matriz y ademas remplaza 2 x 1 y 1 x 2
			salida[n][i] = entrada[i][n]; // if comparativo
		}
	}
	tracer_lib(soy_fn,'rotando matriz');
	return salida
}//---------->>>>>>

function fn_piezas_a_matriz_tablero () {
	var soy_fn="fn_piezas_a_matriz_tablero";
	tracer_lib(soy_fn,"MATRIZ !!!!!!");
	/*
			esta funcion pasa todas las piezas a la matriz de tablero, ecepto las que se esta moviendo.
			
	*/
	// crea una matriz en blanco
	tablero_array = fn_matriz ({ ancho: tamanio_matriz[0], alto: tamanio_matriz[1], elemento: 0 }); // matriz del tablero toda vacia
	//------------------------------------------------
	for (n = 1; n < fichas_cantidad; n++) {
		tracer_lib(soy_fn,"ficha "+n);
		//------------ loop para todas las casilla -------------
		if (!(eval('ficha'+n).sostiene)) { // si la pieza es sostenida no se incorpora a la matriz
			pieza = fn_posicion_en_matriz ({tamanio_casilla: tamanio_casilla, mc: 'ficha'+n }); 
			// calcula la posicion del MClip en la matriz de tablero
			// suma la PIEZA al TABLERO
			tablero_array = fn_sumar_matriz ({	
								tablero: tablero_array, 
								pieza: pieza.array, 
								x:pieza.x, 
								y:pieza.y
							});
			// si la matriz o cantida de piezas es grande, esto accelera mucho el proceso
			if (!tablero_array) return false;
		}
	}
	
	// ------------- genera la matriz del tablero grafica -------------
	fn_generar_matriz_grafica ({	
					ancho: tamanio_matriz[0], 
					alto: tamanio_matriz[1], 
					tamanio_casilla: tamanio_casilla, 
					tablero:tablero_array 
				});	
	
	// devuelve el tablero esto puede servir para ahorar tiempo
	tracer_lib(soy_fn,"MATRIZ >>>> salida = "+ver(tablero_array));
	return tablero_array
}

function fn_posicion_en_matriz (entrada) {
	var soy_fn="fn_posicion_en_matriz";
	/*
		entrada:
			tamanio_casilla:	40
			mc:		nombre del MClip pieza
			tablero:	
	
		salida:
			x:		en la matriz
			y:		en la matriz
			array:	matriz de la pieza
		
	*/
	MClip = eval(entrada.mc); // Pieza
	//----------------calculos de posicion
	salida = {};	
	salida.x = Math.round(MClip._x/entrada.tamanio_casilla);
	salida.y = Math.round(MClip._y/entrada.tamanio_casilla);
	
	//------ propiedades del MClip-------------
	salida.array = MClip.array;
	salida.sostiene = MClip.sostiene;
	salida.id = MClip._name;
	salida.valor = MClip.valor; // para compatibilizarlo con el viejo juego
	
	// si la pieza se sobre sale da un error

/*	
	//---------trace-------------
	tracer_lib(soy_fn,"=============");
	tracer_lib(soy_fn,MClip.array);
	tracer_lib(soy_fn,"x: " + salida.x);
	tracer_lib(soy_fn,"y: " + salida.y);
	tracer_lib(soy_fn,"array: " + salida.array);
*/
	return salida

}
function fn_sumar_matriz (entrada) {
	var soy_fn="fn_sumar_matriz";
/*		
	fn_sumar_matriz ({	
							tablero:tablero_array, 
							pieza_pieza, 
							x:nx, 
							y:ny, 
						})
*/
	//tracer_fi("fn_sumar_matriz",entrada);
	// tracer_lib(soy_fn,"entrada tablero " + entrada.tablero);	
	
	salida.tablero = entrada.tablero; // copia la matriz pieza en la de tablero


	// comprueba que la pieza y posicion no sobre pasen el tablero
	if ( entrada.pieza.length +  entrada.y >  entrada.tablero.length ) return false
	if ( entrada.pieza[0].length +  entrada.x >  entrada.tablero[0].length ) return false
	if ( entrada.x < 0 ) return false
	if ( entrada.y < 0 ) return false
	//------------------------

	
	for (yy=0; yy < entrada.pieza.length; yy++)  {
		for (xx=0; xx < entrada.pieza[yy].length; xx++)  {		
						// suma la matriz de entrada a la matriz del tablero (tambien puede usarse para otras cosas)
			//tracer_lib(soy_fn,"piezas: " + xx +" - " + entrada.pieza[yy][xx]);
			if (entrada.tablero[entrada.x+xx][entrada.y+yy] == 'x' && entrada.pieza[yy][xx] != 0 ) { 
					// no suma nunca dos 'x' en la misma posicion
					// devuelve el mismo tablero que en la entrada (esta pieza no existe)
				return false
			} else {
				if (entrada.tablero[entrada.x+xx][entrada.y+yy] == entrada.pieza[yy][xx] || entrada.tablero[entrada.x+xx][entrada.y+yy] == 0 ||0 == entrada.pieza[yy][xx]) { 
					if (!(0 == entrada.pieza[yy][xx])) {
						salida.tablero[entrada.x+xx][entrada.y+yy] = entrada.pieza[yy][xx];
					}
				} else {
					return false
				}
		}
		}
	}

			/*
				falta hacer las reglas para union de matrices de piezas de difrentes formas
					ID piezas:	[3-9]
					Fijas:		x
					Uniones:	[1-2]
					vacio:		0
			
			*/

	//tracer_ff("fn_sumar_matriz",salida.tablero);
	return 	salida.tablero
}

//tracer_lib(soy_fn,'     ANIMACION DEV');
//tracer_lib(soy_fn,'------------------------------------');


function fn_ani_linea_tiempo (mc, escala, fts,  tipo) {
	var soy_fn="fn_ani_linea_tiempo";
		if (dev == false) return; 
		MClip = eval(mc);
					tracer_lib(soy_fn,'dev ' + dev);
		if(!MClip.linea_tiempo) linea_tiempo_var = MClip.createEmptyMovieClip('linea_tiempo', MClip.getNextHighestDepth()); 
		if(!MClip.pos) MClip.pos = new Array()

		for (e=0; e < escala.length; e++) { 

			// vector
			linea_tiempo_var.lineStyle(0, colores[e+1], 30, true, "none");
			linea_tiempo_var.moveTo(fts[0]*10, (e*20));
			linea_tiempo_var.lineTo((fts[0]+fts[1])*10, (e*20));
			linea_tiempo_var.endFill();
			
			linea_tiempo_var.lineStyle(2, colores[e+1], 100, true, "none"); // linea de animacion 
		
			if(MClip.pos[e]==undefined) { MClip.pos[e] = 0; tracer_lib(soy_fn,'volivo a 0  POST' + e)} 
			for (t=fts[0]; t < fts[0]+fts[1]; t ++) { 
				if (t==fts[0]) {
					linea_tiempo_var.moveTo(t*10,  (e*20) + (MClip.pos[e]/10));
				} else {
					MClip.pos[e] += (escala[e]/fts[1]);
					linea_tiempo_var.lineTo(t*10, (e*20) + (MClip.pos[e]/10));
				}
			}

			tracer_lib(soy_fn,'POST ---> '+ MClip.pos[e]);
			linea_tiempo_var.endFill();
		
	}

}

function fn_ani_linea_tiempo_posicion (obj) {
	var soy_fn="fn_ani_linea_tiempo_posicion";
	tracer_lib(soy_fn,'dev ' + dev);
		if (dev == false) return; 
	obj.t = obj.fts[0] + obj.fts_actual;
	for (e=0; e < obj.escala.length ; e++) {
		if (obj.escala[e]) { 
			obj._parent.linea_tiempo.lineStyle(2, colores[e+1], 100); // linea de animacion
			obj._parent.linea_tiempo.moveTo(obj.t*10, (e*20) + -5);
			obj._parent.linea_tiempo.lineTo(obj.t*10, (e*20) + +5);
			obj._parent.linea_tiempo.endFill();
		}

	}		
	obj._parent.linea_tiempo._rotation = obj._parent._rotation * -1;
}// DEV >>>
//opcionales



function tracer ( a ) { trace ( a )  }

dev_filtro = {
	activo: false,
	mostrar:[],
	inverso: false
}

/* MOVER A DEV */
function tracer_fi(n,param){
	tracer_lib(n,"( "+ver(param)+" ) { ");
}
function tracer_ff(n,salida){
	tracer_lib(n,"    salida -> "+ver(salida));
	tracer_lib(n," } // <<< ");
}
// <<< DEV


function tracer_lib(soy_fn,salida){
  var mostrar = true;
	if(soy_fn==undefined)soy_fn="";
	if(dev_filtro.activo){
		mostrar = dev_filtro.inverso;
		for(var fn in dev_filtro.mostrar){
			if(dev_filtro.mostrar[fn] == soy_fn){
				mostrar=!(mostrar);
				break;
			}
		}
	}
	if(mostrar) tracer (soy_fn+" : "+ salida );
}

function tracer_fotograma(salida){
	tracer("");
	tracer("--------------");
	tracer("o o o o o o o ");
	tracer("--------------");
	tracer("");
	tracer("fotograma ("+this._currentframe+") : "+salida);
	tracer("");
	tracer("--------------");
	tracer("o o o o o o o ");
	tracer("--------------");
	tracer("");
}
function ver(param,nivel){

	var tabular,tabulacion,nro_elementos,tipo,salida,nro_actual,p,elemento,tipo_p,tabular_cierre,nivel;	
	
	if(nivel!=Number) var nivel=1;
	
	if(typeof(param)=='object'){
	/* 	Devuelve una cadena (String)
		de un 'trace' especialmente formateado para objetos y arrays
	
	param: 	puede ser cualquier tipo objeto (Objecto, Array, MovieClip, Button)
	
	nivel: 	indica el nivel de anidamiento actual, necesario
			para para las tabulaciones cuando hay m�s de un nivel de profundidad
			de los datos.
	*/
	

	// tabulacion inicial segun el nivel de profundidad
	tabular ="";
	for(tabulacion=0;tabulacion<nivel+1;tabulacion++){
		// trace(tabular+"tabulacion "+tabulacion);
		tabular+="    ";
	}
	
	//trace(tabular+'function ver(param = '+param+")");
	//trace(tabular+'nivel = '+nivel);
	
	// Contamos el numero de elementos del parametro
	nro_elementos = contar_elementos(param);
	// trace(tabular+"LONGITUD "+nro_elementos);
	
	
	// Obtenesmos el tipo de datos para saber
	// si hay que poner llaves {} o corchetes {}
	
	tipo = typeof(param);
	
	// Los Array devuelven 'object' por lo tanto para diferenciarlos
	// de los objetos consultamos el propiedad .length
	// que solamente funciona con Arrays

	// colocamos las llaves de apertura { o [
	if(param.length){
		// Corregimos el tipo si es un array
		tipo='array';
		salida = " [ ";
		
		// prueba
		// salida += "\n";
		
	}
	if(tipo=='object'){
		salida = " { ";
	}
	
	// trace(tabular+"Tipo = "+tipo);
	
	if(tipo=='object') salida += "\n";
	// En el caso de los objetos bajamos una linea despues de abrir la llave {
	

	// Iniciamos el recorrido de los objetos dentro del parametro.
	// y llevamos una referencia numerica del actual para dos cosas:
	// 1) Mostrar en orden correcto los Array
	// 2) Saber cuando es el ultimo elemento para no poner la coma al final
	
	nro_actual = 0;
	for(p in param){

		// Tomtamos el valor del elemento actual
		elemento = param[p];
		
		if(tipo=='array'){
			// En el caso de los array el metodo anterior devuelte en orden
			// inverso los elementos, por eso accedemos con el indice numerico
			elemento = param[nro_actual];
		}
		
		// trace(tabular+nro_actual + "    param."+p+" = "+elemento);
		
		// En el caso de los objetos imprimimos el nombre
		// del identificador y los dos puntos.
		if(tipo=='object') {
			salida += tabular + p + " : ";
		} else if (tipo!='array'){
			salida += tabular;
		}
		
		// Obtenemos el tipo de dato del elemento para saber si
		// es un objeto al cual hay que recorrer internamente
		// llamando de manera recursiva a la funcion ver
		tipo_p = typeof(elemento);
		

		// imprimimos el valor de elemento segun el caso correspondiente
		if (tipo_p == 'object'){
		 
			// trace(tabular+"llamamos a RERCURSIVA desde el nivel "+nivel);

			// llamamos nuevamente a la funcion y subimos un nivel
			salida += ver(elemento,nivel+1);
			
			//trace(tabular+"volvemos de la recursiva al nivel "+nivel);
			
		} else if (tipo_p == 'string'){
			salida += "'"+elemento+"'";
		} else {
			salida += elemento;
		}
		
		//trace(tabular+nro_actual+" / "+nro_elementos);
		
		// Si el elemento actual no es el ultimo
		if (nro_actual < nro_elementos-1){
			// agregamos la coma para separar
			salida +=" , ";
			// y ponemos en nueva linea en el caso de los objetos
			if(tipo=='object') salida += "\n";
		}
		
		
		nro_actual++;
	} // for in
	
	
	// tabular cierre
	tabular_cierre ="";
	
	// contamos uno menos que el tabular anterior
	for(tabulacion=0;tabulacion<nivel;tabulacion++){
		//trace(tabular+"tabulacion "+tabulacion);
		tabular_cierre+="    ";
	}
	
	// cerramos la llave de objeto o array
	
	if(tipo=='object'){
		salida += "\n";
		if(nro_actual==nro_elementos && nivel!=0){
			salida += tabular_cierre;
		}
		salida += "} ";
	} else if(tipo=='array'){
		salida += " ] ";
	}
	

	if(nivel==0) salida += "\n";
	
	// trace(tabular+"VOLVER");	
	
	// devolvemos la cadena formateada
	return salida
	
	} else {
		//return "ERROR: el parametro no es un objeto";
		return String(param);
	}
}
function contar_elementos(param){
	var nro_elementos = 0;
	for(var p in param){
			nro_elementos++;
	}
	return nro_elementos;
}



function fn_guardar_php(entrada) {
	/*
		entrada:
			datos: Array o datos a grabar en php
			alto: altura de la array (si es de dos entrada)
			piezas: Array con datos a almacenar, destinados a las piezas
	*/

	DIR="http://127.0.0.1/dev/guardar_post.php"; // este nombre tiene que cambiar
	
	this.createEmptyMovieClip("loader_mc", this.getNextHighestDepth());
	loader_mc.matriz = entrada.datos;
	loader_mc.piezas = entrada.piezas;
	loader_mc.alto = entrada.alto;
	loader_mc.getURL(DIR, "conexion", "POST");
	
}


function dibPoligono(mc, x, y, r, l, c, a, g, e) {
	var soy_fn="dibPoligono";
	tracer_lib(soy_fn,"Dibujar poligono");
	/*
	dibuja un polígono dentro de un MC indicando:
	mc - el movie clip
	x,y - coordenada
	r - radio
	l - cantidad de lados
	c - color
	a - alfa
	g - grosor línea
	e - estilo
	0 = sólo relleno
	1 = sólo borde
	3 = rellenos y borde
	*/
	if (e == 0) {
		mc.beginFill(c, a);
	} else if (e == 1) {
		mc.lineStyle(g, c, a);
	} else {
		mc.beginFill(c, a);
		mc.lineStyle(g, c, a);
	}
	//
	mc.moveTo(x+r, y);
	//convertimos a radianes el ángulo para la cantidad de lados
	var ang = and_rad(360/l);
	for (var i = 1; i<=l; i++) {
		mc.lineTo(x+Math.cos(ang*i)*r, y+Math.sin(ang*i)*r);
	}
	//
	if (e == 0 || e == 2) {
		mc.endFill();
	}
}
function triangulo_array (param){
	var soy_fn="triangulo_array";
	/*
	Crea una matriz para representar un triangulo rectangulo
	
	Parametros:
		lado - tiene que ser el lado corto (no la hipotenusa)
		
		(por ahora un numero par)*
		
	Salida:
		un objeto con 2 arrays. El triangulo a 0 grados (con la hipotenusa a 45)
		el vertice recto en la esquina superior izquierda, y a 45 grados
		(con la hipotenusa a 90) el vertice recto a la izquierda.
		
	salida.triangulo1
						XXX1
						XX1
						X1
						1
	salida.triangulo2
						   1
						  1X
						 1XX
						 2XX
						  2X
						   2

   * En el caso de los numeros pares el segundo triangulo no es tan preciso
     ya que se falsea un poco el tamano del mismo para que encaje en la grilla
	 y respete el sistema de figuras con arrays
	 Los lados con numeros impares encajan perfectos en las grillas pero no
	 graficamente en la union de las puntas
	*/
	
	var lado = param.lado;
	var par = es_par(lado);	
	var columnas,filas,fil,col,valor,limite;
	var salida = new Object();
	salida.triangulo1 = new Array();
	salida.triangulo2 = new Array();
	
	tracer_lib(soy_fn,"triangulo_array(param.lado="+lado+")");
	tracer_lib(soy_fn,"par = "+par);
	
//	if(par){
		
		tracer_lib(soy_fn,"Triangulo 1");
		
		columnas	=lado; // anchura
		filas		=lado; // altura
		for(fil=0;fil<filas;fil++){
			
			salida.triangulo1[fil] = new Array();
			
			limite = columnas-fil-1;
			// Achicamos el ancho del limite asi vamos haciendo la diagonal
			
			for(col=0;col<columnas;col++){
			
				valor="x";
				
				// Verificamos si es el ultimo elemento
				if(col == limite) valor="1";
				if(col >  limite) valor="0";
				salida.triangulo1[fil][col]=valor;
			}
		}
		
		tracer_lib(soy_fn,"Triangulo 2");
		
		// Calculamos dimensiones rotadas 45 grados
		
		columnas = Math.floor(Math.cos(45*Math.PI/180)*lado);
		filas = columnas*2;
		tracer_lib(soy_fn,columnas+" x "+filas);
		
		for(fil=0;fil<filas;fil++){
			
			salida.triangulo2[fil] = new Array();
			
			limite = columnas-1-fil;
			if(fil>=columnas){
				limite = fil-columnas;
			}
			// Achicamos el ancho del limite asi vamos haciendo la diagonal
			
			for(col=0;col<columnas;col++){
			
				valor="0";
				
				// Verificamos si es el ultimo elemento
				if(col == limite) {
					valor="1";
					if(fil>=columnas){
						valor="2";
					}
				}
				if(col >  limite) valor="x";
				salida.triangulo2[fil][col]=valor;
			}
		}	
		
		return salida
/*	} else {
		tracer_lib(soy_fn,"impar no implementado");
		return false
	}*/
}
function acierto (eleccion) {
	var soy_fn="acierto";
	/* 
		Funcion que determina que hubo 1 acierto 
		ADVERTENCIA: NO USAR COMO FUNCION DE FINAL DEL JUEGO
		Esta funcion PUEDE SER REMPLAZADA POR EL JUEGO!
	*/
	
	this.play();
	tracer_lib(soy_fn,'gano');
	fn_gf_bien ();
	fn_elimina_eventos ()
}
function acierto_custom (obj) {
	var soy_fn="acierto_custom";
	fn_sonido_bien()
}
function desacierto () {
	var soy_fn="desacierto";
	/* 
		Funcion que determina que hubo 1 desacerto
		ADVERTENCIA: NO USAR COMO FUNCION DE FINAL DEL JUEGO
		Esta funcion PUEDE SER REMPLAZADA POR EL JUEGO!
	*/

	_root.play();
	tracer_lib(soy_fn,'perdio');
	fn_gf_mal ();
	fn_elimina_eventos ()
}
function desacierto_custom (obj) {
	var soy_fn="desacierto_custom";
	fn_sonido_mal()
}

function fn_GC (respuesta, elementos, cantidad, repite) {
	var soy_fn="fn_GC";

	/*	
		Esta funcion tan solo crea una cadena de salida, esta puede contener numeros al azar entre un rango [min, max] 
		o un valor contendio en una array de X cantidad mayor a 2 [n0,n1,n2....nx]. 
		
		fn_GC ( 
			respuesta: Si se trata de armar respuestas para opciones se coloca el valor de respuesta, de los contrario colocar null
			elementos: para marcar un rango se coloca [min,max], o se introduce una array mayora a 2 para tomar valores de esa array
			cantidad: Cantidad de elementos de salida
			repite(solo sirve con Rango!): Se indica si se pueden o no repetir elementos (para opciones debe ser siempre false) 
		) 		
			
		ejemplo:
				progresion=fn_progresion (10, [-50,50], [2,1,2,1], true); // ver mas abajo
				fn_fichas ("fichas", progresion, null, [3, 6]); 
				traslada los valores de una progresion a los MovieClip: fichas0, fichas1, fichas2....fichasN
				

				
		¿Para que sirve?: 
			
			-Crea los los valores de las las fichas o la opciones
				
	*/
	
	
			
	var salida = new Array(); 
	
	


	if (elementos.length == 2) { // SOLO PARA RANGO
		// Genera una array que contiene todos los elementos desde elementos[0] a elementos[1] 
		var elementos1 = new Array(); 
		i=0;
		for (n=elementos[0]; n < (elementos[1]+1); n++) {
		 elementos1[i]=n;
		 i++;
		}

		elementos = elementos1;

	}
		
	
	var usados = new Array(); 
		
	for (n=0; n < cantidad; n++) {
	
		while (true) {

			i = fn_azar ([0, (elementos.length-.5)]);	// elije elemento de la array al Azar	
	
			if (salida[n] == undefined  && !(usados[i] == 1 ) && !( elementos[i] == respuesta) ) { // el elemento no tiene que estar definido o tiene que permitirse repetir
				
				
				salida[n] = elementos[i]; 
				tracer_lib(soy_fn,"fn_GC definicion  ---> "+ salida[n] + " - " + elementos[i]); 
				if (!repite) usados[i] = 1;
				break;
			}
	
		}
	
	}
	
	// esto se utiliza, prinicipalmente,cuando se crean las opciones
	
	if (respuesta != null) if (!fn_cual_contiene (salida, respuesta)) salida[fn_azar ([0, (cantidad-1)])] = respuesta;
	
	return salida
} 

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
function fn_fichas (mc, opciones, respuesta, icognita) {
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
		
	for (n=0; n < opciones.length; n++) {


		MClip = eval(mc+n);
		//alert("Mclip "+MClip+ " = "+mc+n+"");

		//return;
    // sinapsis-js vvvv
    //$("."+mc+n).append(MClip.txt);


		/*
		fn_limpiar_eventos_mc ({
				nombre_mc: mc+n,
				ruta: ""
		});	
		*/
		
		if(opciones[n] == undefined) MClip._visible = false; 

		tracer_lib(soy_fn," fn_fichas ---> "	+ MClip + " - " + mc+n);

		esicognita =false;
		
		if (icognita) if (icognita.length > 0 ) for (i=0; i < icognita.length; i++) if (n == icognita[i]) { esicognita = true;  break; }
		
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
		
		MClip.halo._visible = false;// oculta el halo del Mclip
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
				MClip.onPress = function () {
					alert("clic para acierto");
				 	acierto_evento (MClip);
				}
			} else {
				MClip.onPress = function () { 
					//mal
					alert("clic para DESacierto");
				 desacierto_evento (MClip);
				}
			}			
		}
	}
// devuelve las opciones esto siver para creaciones implicitas 'opciones = fn_fichas (null, fn_GC(....'
	return opciones; 
}




/*------------------- RESPUESTA ------------*/


function acierto_evento (mc) {
                alert("Acierto");
		if (_root.comenzo_juego) {
			/*acierto*/
			//tracer_lib(soy_fn,"hay!");

			marcar_MC(mc);
			acierto(mc.txt);
			mc.onPress = null;
			mc.onRollOver = null;
									
			acierto_custom (mc);
			
		}
}
function desacierto_evento (mc) {
                alert("Desacierto");
		if (_root.comenzo_juego) {
			_root.sostiene._visible = true;
			//tracer_lib(soy_fn,"hay!");
			fn_elimina_eventos (); // ESTO ESTA MAL, hay que quitarlo, pero verificar en los juegos anteriores al 29/9/2010
			desacierto ();
			mc.onPress = null;
			desacierto_custom (mc);
		}
}



function fn_gf_bien () {
	var soy_fn="fn_gf_bien";
	removeMovieClip('gf_acierto');
	_root._xmouse 
	_root._ymouse
	gf_acierto_mc = _root.createEmptyMovieClip('gf_acierto', _root.getNextHighestDepth()); //se pueden crear ilimitadas formas sobre un 

	_root.gf_acierto._x = _xmouse;
	_root.gf_acierto._y = _ymouse;
	
	if(!(_root.gf_acierto1x == null)) { 
		_root.gf_acierto._x = _root.gf_acierto1x; 	
		_root.gf_acierto._y = _root.gf_acierto1y; 
	}
	loadMovie("graficos/bien.swf", _root.gf_acierto);
}

function fn_gf_mal () {
	var soy_fn="fn_gf_mal";
	removeMovieClip('gf_acierto');
	_root._xmouse 
	_root._ymouse
	gf_acierto_mc = _root.createEmptyMovieClip('gf_acierto', _root.getNextHighestDepth()); 
	
	_root.gf_acierto._x = _xmouse;
	_root.gf_acierto._y = _ymouse;
	
	if(!(_root.gf_acierto1x == null)) { 
		_root.gf_acierto._x = _root.gf_acierto1x; 	
		_root.gf_acierto._y = _root.gf_acierto1y; 
	}

	loadMovie("graficos/mal.swf", _root.gf_acierto);
}



function fn_progresion (cantidad, rango, progresion, negativo) {
	var soy_fn="fn_progresion";
	/*
		Esta funcion genera una cadena de elementos con una progresion determinada principal mente por la Array progresion.
		fn_progresion (
			cantidad:  Cantidad de elementos de salida
			rango: Define el primer valor, para marcar un rango se coloca [min,max]
			progresion: Array de 4 nodos: 
											1 y 3 una suma (remplazar por 0 para no usar), 
											2 y 4 multiplicacion (remplazar por 1 para no usar).
						Tambien se puede definir como dos numeros iguales eso determinar el nodo 0
								
			negativo: En caso de ser true, se usan tambien numero negativos.
		)		
		
		Ejemplo: tracer_lib(soy_fn,"--> "+fn_progresion (5, [-50,50], [1,1,0,1], false));
						 --> 49,50,51,52,53
			Un resultado inicial entre 1 y 50 y una suma de 1 determinado por la array [1,...].
					 tracer_lib(soy_fn,"--> "+fn_progresion (4, [1,1], [1,1,0,1], true));
						--> 1,2,3,4
						
		¿Para que sirve?: 
			
			-Genera progresiones (logicas)

	*/

	//nivel puede ser considerando nivel de dificultad
	var salida = new Array(); 

	salida[0] =  fn_azar ([rango[0],rango[1]]);  //esta ecuacion aparece anteriormente en GC
	if (rango[1]== rango[0]) salida[0] =rango[0] // esto sive para definir  progresiones concretas
	salida[0] = salida[0]==0?1:salida[0];

	for (n=1; n < cantidad ; n++) {
		salida[n] = ((salida[n-1] + progresion[0]) * progresion[1] )+ progresion[2] * progresion[3];
		tracer_lib(soy_fn,"Progresion ---> "+salida[n]);
	}
  
	return salida //devuelve una cadena progresiva

}


function marcar_MC (obj) {
	var soy_fn="marcar_MC";

	var my_color = new Color(obj);
	var myColorTransform = { ra: 100, rb: 0, ga: 100, gb: 96, ba: 100, bb: 0, aa: 100, ab: 0};
	my_color.setTransform(myColorTransform);

}
function codificar_tablero (param){
	var soy_fn="codificar_tablero";
	/*
	codificar_tablero ({
		matriz_columnas: Array,
		matriz_filas: Array,
		tabla_ancho_alto: [Number,Number]
	})
	*/
	tracer_fi("codificar_tablero",param);
	
	var matriz_columnas = param.matriz_columnas;
	var matriz_filas = param.matriz_filas;
	var ancho = param.tabla_ancho_alto[0];
	var alto = param.tabla_ancho_alto[1];
	
	var salida = [];
	
	for ( var f = 0; f < matriz_columnas.length; f++ ){
		salida.push (coord_a_num_lineal({
			x: matriz_columnas[f], 
			y: matriz_filas[f],
			columnas: ancho,
			filas: alto
		}) +1);// el +1 es para corregir
	}
	
	tracer_ff("codificar_tablero",salida);
	return salida
}
function coord_a_num_lineal(param){
	var soy_fn="coord_a_num_lineal";
	/*
	Convierte una coordenada X,Y en su equivalente de posicion lineal.
	Sirve para saber el nro de una ficha, esta basado en cero.
	
	coord_a_num_lineal({
		x, 
		y,
		columnas,
	});
	
	*/
	tracer_fi("coord_a_num_lineal",param);
	
	var x = param.x;
	var y = param.y;
	
	var salida = param.x + param.y*param.columnas;
	
	tracer_ff("coord_a_num_lineal",salida);
	return Number(salida);
}
function crear_tablero(param){
	var soy_fn="crear_tablero";

	/*
	Arma una grilla de movieclips duplicando a partir de uno base en el escenario
	La grilla supone fichas rectangulares pero se puede especificar si
	la forma de las misma es especial (se agregara el tratamiento en futuras versiones)

	Bazza: ahora tiene valores por defecto, en todos los que rompian el script

		mc_nombre: String, 		// nombre base
		ruta: MovieClip,		// por defecto: _root (lamentablemente)
		
		filas: Number,
		columnas: Number,
		
		ficha_ancho: Number,	// por defecto: ancho del MC
		ficha_alto: Number,		// por defecto: alto del MC
		ajustar_mc: Boolean,	// indica si debe o no ajustar el tamanio del mc
		pos_x_ini: Number,		// por defecto: x del MC
		pos_y_ini: Number,		// por defecto: y del MC
		
		
		cantidad_fichas, 
		base_nro_fichas,	// indica desde donde comienza a contar las fichas, por defecto es "0"
	
		especial 		// en el caso de tableros con fichas no rectangulares
	});
	
	
	*/
	tracer_fi("crear_tablero",param);


	var mc_nombre = param.mc_nombre;
	var ruta = !param.ruta?_root:param.ruta; // preferia cambiarla por this, pero es por defecto _root
	
	var filas = param.filas;
	var columnas = param.columnas;
	

	var ficha_ancho = !param.ficha_ancho?eval(mc_nombre)._width: param.ficha_ancho;
	var ficha_alto = !param.ficha_alto?eval(mc_nombre)._height: param.ficha_alto;


	var pos_x_ini = !param.pos_x_ini?eval(mc_nombre)._x:param.pos_x_ini;
	var pos_y_ini = !param.pos_y_ini?eval(mc_nombre)._y:param.pos_y_ini;

	var ajustar_mc = !param.ajustar_mc?true:param.ajustar_mc;	// QUE ES?!!
    var margen_ancho = !param.margen_ancho?0:param.margen_ancho;
	var margen_alto = !param.margen_alto?0:param.margen_alto;

	var cantidad_fichas = param.cantidad_fichas;
	// este valor puede diferir del total de la grilla,
	//en ese caso se recalcula las filas o las columnas y se centra
	// la ultima fila si el numero es menor.
	
	var base_nro_fichas = !param.base_nro_fichas?0:param.base_nro_fichas; 
	var especial = param.especial;
	
		
	// Calculos adicionales
	
	var cantidad_grilla = filas * columnas;
	var diferencia_fichas = cantidad_grilla - cantidad_fichas;
	
	var pos_x_final = (diferencia_fichas*ficha_ancho)/2;
	// para centrar la posicion X de la ultima fila.
	var pos_x, pos_y;

	/*

		Yo sacaria todas estas definiciones,
		las con un for in y un eval se podrian redefinir en este nivel
		bazza
	*/
	
	if(especial.tipo == "triangular"){
		// calculamos distancias internas del triangulo equilatero
		var dif_tmp = cosenico({angulo:60,radio:ficha_ancho});
		var altura = dif_tmp.dy_sen;
		var dx = ficha_ancho/2;
		var dy = dif_tmp.dy_sen/3;
		var radio = dif_tmp.dy_sen * 2; // este dato por ahora no lo usamos.
		var angulo_base = especial.angulo;
	}
	
	for (var fil=0 ; fil < filas ; fil++){
		
		if (fil == filas-1){
			//tracer_lib(soy_fn,"Conpensamos la diferencia de la ultima fila.");
			pos_x_ini += pos_x_final; // Conpensamos la diferencia de la ultima fila.
		}
		
		if(especial.tipo == "triangular"){
			if(es_par(fil)){
				angulo_ficha=angulo_base+180;
			} else {
				angulo_ficha=angulo_base;
			}
		}
		
		for(col=0 ; col < columnas ; col++){
			
			nro_ficha = col + fil*columnas + base_nro_fichas;
			tracer_lib(soy_fn,"nro_ficha = "+nro_ficha);

			if ( nro_ficha < cantidad_fichas + base_nro_fichas ) {
				
				removeMovieClip(ruta[mc_nombre+nro_ficha]);
				duplicateMovieClip(ruta[mc_nombre],mc_nombre+nro_ficha,ruta.getNextHighestDepth());
				var nueva_ficha = ruta[mc_nombre+nro_ficha];
				
				tracer_lib(soy_fn,"mc -> "+nueva_ficha);
				
				// calcula posicion
				pos_x = pos_x_ini + col * (ficha_ancho+margen_ancho) ;
				pos_y = pos_y_ini + fil * (ficha_alto+margen_alto) ;
				
				
				if(especial.tipo == "triangular"){
					pos_x = pos_x_ini + col * (dx +margen_ancho);
					pos_y = pos_y_ini + fil * (altura +margen_alto);

					// ajustamos si es columna impar
					
					if(es_par(fil)==true && es_par(col)==false){
						nueva_ficha.figura._y -=altura*(100/nueva_ficha._yscale); 
						nueva_ficha.figura._x -=ficha_ancho*(100/nueva_ficha._xscale); 
					}
					if(es_par(fil)==false && es_par(col)==true){ 
						nueva_ficha.figura._y -=altura*(100/nueva_ficha._yscale); 
						nueva_ficha.figura._x -=ficha_ancho*(100/nueva_ficha._xscale); 
					}
					// y ajustamos el angulo
					angulo_ficha+=180;
				}
				
				
				// posiciona el movieclip
				nueva_ficha._x = pos_x;
				nueva_ficha._y = pos_y;
				
				if(angulo_ficha!=undefined && angulo_ficha!=null) nueva_ficha._rotation = angulo_ficha;
				if(ajustar_mc){
					nueva_ficha._width = ficha_ancho;
					nueva_ficha._height = ficha_alto;
				}
				nueva_ficha.soy_n = nro_ficha;
				nueva_ficha.nombre_base = mc_nombre;
				
			}
		} // <<< for col
	} // <<< for fil
}; // <<< function crear_tablero
function decodificar_tablero(param){
	var soy_fn="decodificar_tablero";
	/*
	decodificar_tablero({
		tablero: Array,
		tabla_ancho_alto: [Number,Number]
	})
	*/
	
	tracer_fi("decodificar_tablero",param);
		
	var tablero = param.tablero;
	var ancho = param.tabla_ancho_alto[0];
	var alto = param.tabla_ancho_alto[1];
	
	var salida = {filas:[],columnas:[]};
	var coord;
	for ( var f = 0; f < tablero.length; f++ ){
		coord = lineal_a_coord({
			nro_ficha: tablero[f]-1,
			columnas: ancho,
			filas: alto
		});
		// tablero[f]-1 es para corregir la base de inicio de las fichas
		// ya que estan en base 1 y las coordenadas usan base en 0
		
		salida.filas.push(coord.y); // corresponde al codigo de figura
		salida.columnas.push(coord.x); // corresponde al codigo de color
	}
	
	tracer_ff("decodificar_tablero",salida);
	return salida
}

function examinar_fichas(param){
	return valor_fichas_listado(param);
}
function fn_anti_fichas (entrada) {
	var soy_fn="fn_anti_fichas";
	/*
		esta funcion toma los valores de las fichas y los devuelve en una cadena
			entrada:
					objetos: nombre sin numeros
					cantidad: cantidad de objetos

	*/
	salida = [];
	for (n=0; n < entrada.cantidad; n++) {
		MClip = eval(entrada.objetos + n);
		salida[n] = MClip.txt;
		tracer_lib(soy_fn,MClip + ' - '+ salida[n])
	}
	
	return salida
}

function fn_comprobar_fichas_figuras (param) {
	var soy_fn="fn_comprobar_fichas_figuras";
	/*
	
	Revisa si una ficha ha formado una figura ganadora
	
	Esta funcion es para uso doble: nos permite obtener un ranking de fichas segun las figuras ganadoras y saber si alguna alcanzo el valor.
	
	Devuelve un objeto de cuatro propiedades, cada una es un Array con la posicion lineal de cada ficha en la pila, el ranking (cantidad de fichas que estan a punto de formar una figura ganadora) y la figura correspondiente.
	El cuato objeto es un booleano si alguna alcanzo el valor especial.
	
	Si alguna ficha alcanza el ranking del parametro valor especial entonces devuelve gano = true y en nodo 0
	de las otras 3 propiedades la ficha y la figura correspondiente. De esta manera podemos marcar graficamente la figura.
		
		salida.pos[] 	// nro de ficha
		salida.rank[]	// ranking
		salida.figu[]	// ID de la figura ganadora
		salida.gano		// true si se alcanzo el valor especial;
		
	fn_comprobar_fichas_figuras({
		valor_ficha: Number, 		
		pila: Array,
		patron: Array,
		valor_especial: Number,
		datos_tablero: {
			tablero: Array,
			filas: Number,
			columnas: Number,
			especial: String
		}
	)};
	
	valor_ficha: un numero con el valor a buscar dentro de las fichas.
	
	pila: Matriz con la posicion lineas de las casillas a verificar, en este caso el registro de las fichas de cada jugador.
	
	patron: Matriz con las figuras que deben formar las fichas. Cada elemento tiene una matriz con las posiciones relativas.
	
	valor_especial: un numero ganador de coincidencia que debe alcanzar el ranking de cada ficha.
	
	datos_tablero: la matriz lineas que hace de tablero y sus caracteristicas
	
	
	FALTA: mejorar forma de busqueda, toma mucho tiempo cuando las figuras ganadoras son muchas y el flash queda paralizado un poco.
	*/

	tracer_fi("fn_comprobar_fichas_figuras",param);

	var valor_ficha = param.valor_ficha; 
	var pila = param.pila;
	var patron = param.patron;
	var valor_especial = param.valor_especial;
	var datos_tablero = param.datos_tablero;
	
	var salida = {pos:[],rank:[],figu:[],gano:false};

	
	// recorremos la pila de fichas indicadas
	for (var c=0; c<pila.length; c++){
		
		tracer_int("pila [ "+c+" ] = "+pila[c]);
		
		var top_rank = 0; // filtra el ranking mas alto para cada figura
		
		// cotejamos las figuras de victoria
		for (var fig=0; fig<patron.length; fig++){
			tracer_int("FIGURA "+fig);
			
			// obtenemos los valores de las casillas segun el patron
			var listado_valores = valor_fichas_listado({
				ficha_ini: pila[c], 
				rel: patron[fig], 
				tablero:datos_tablero.tablero, 
				columnas: datos_tablero.columnas,
				filas: datos_tablero.filas,
				especial:datos_tablero.especial
			});
			
			// revisamos cuantas tienen el valor buscado
			// este valor nos sirve de ranking
			// ranking = numero de casillas propias - nro de casillas ocupadas por otra cosa
			
			var ranking = fn_cual_contiene(listado_valores, valor_ficha, true);
			var nro_vacias = fn_cual_contiene(listado_valores, 1, true);
			var resto = valor_especial-ranking-nro_vacias;
			
			tracer_int("numero de fichas validas = "+ranking);
			tracer_int("numero de fichas VACIAS = "+nro_vacias);
			tracer_int("resto = "+resto);
			
			// comprobamos tener algo rankeado
			if(ranking!=undefined && ranking!=null){
			
				ranking-=resto; // bajamos el ranking si hay otras fichas ocupando parte del patron de figura ganadora
		
				tracer_int("comprobamos valor especial para ficha "+pila[c]+" = "+ranking);
				if(valor_especial==ranking){
					tracer_int("��� ALCANZO !!!");
					
					// almacenamos la salida
					salida.pos[0] = pila[c];
					salida.rank[0]=ranking;
					salida.figu[0]=fig;
					salida.gano = true;
					
					tracer_ff("fn_comprobar_fichas_figuras",salida);
					return salida // salimos
					break;
				
				} else if(ranking>=top_rank){
					// si esta figura tiene mejor ranking que las anteriores la actualizamos
					
					top_rank=ranking;
					tracer_int("almacenamos el ranking para ficha "+pila[c]+" = "+ranking+" para la figura = "+fig);

					salida.pos[c]=pila[c];
					salida.rank[c]=ranking;
					salida.figu[c]=fig;
				} // <<< if valor_especial
			} // <<< if ranking!=null
		} // <<< for fig
	} // <<< for c

	tracer_ff("fn_comprobar_fichas_figuras",salida);
	return salida
}
function fn_ficha_movimientos_posibles (e){
	var soy_fn = "fn_ficha_movimientos_posibles";
	/*
	Devuelve los numeros de las fichas validas para hacer un movimiento lineal y continuo una distancia determinada y en las direcciones indicadas por el perimetro.
	
	fn_ficha_movimientos_posibles ({
		ficha: Number || Array ,
		valor_vacia: Number || String,
		datos_tablero: {
			tablero: Array,
			columnas: Number,
			filas: Number,
			especial: String
		},
		perimetro: Array,
		distancia: Number
	})
	*/
	var ficha = e.ficha;
	var valor_vacia = e.valor_vacia;
	var datos_tablero = e.datos_tablero;
	var perimetro = e.perimetro;
	var distancia = e.distancia;
	var inverso = e.inverso;
	var incluye = e.incluye;
	
	if(!(inverso)) inverso = true;
	
	tracer_fi(soy_fn,e);
	
	var salida = [];

	if (typeof(ficha)=='number') ficha = [ficha];  // permite pasar 1 o varias fichas
	
	tracer_lib(soy_fn,"ficha = "+ver(ficha));
	
	for ( var f = 0 ; f < ficha.length; f++) {
		for ( var p = 0 ; p < perimetro.length ; p++) {
			tracer_lib(soy_fn, " perimetro ["+p+"]"+perimetro[p]);
			var area = [];
			area = fn_fichas_area_continua({
				ficha_ini: ficha[f],
				valor_vacia: valor_vacia,
				inverso: inverso,
				incluye: incluye,
				perimetro: [perimetro[p]],
				direccion: 0,
				area: [],
				tablero: datos_tablero.tablero,
				columnas: datos_tablero.columnas,
				filas: datos_tablero.filas,
				especial: datos_tablero.especial
			});
			tracer_lib(soy_fn," area "+area);
			if (distancia!=undefined) {
				if(distancia<area.length){
					area = fn_array_seccion (area,[0,distancia+1]);
				}
				tracer_lib(soy_fn," area + distancia = "+area);
			}
			
			salida = fn_unir (salida,area);

		}//<<< for p
		// limpiamos la salida eliminando la ficha de inicio
		salida = fn_quitar_nodo_por_valor ({
			array: salida,
			valor: ficha[f]
		});
	}//<<< for f
	

	salida.sort();
	tracer_ff(soy_fn,salida);
	return salida
}//<<<fn_ficha_movimientos_posibles

function fn_fichas_area_continua(param){
	var soy_fn="fn_fichas_area_continua";
	/*
	Recorre un area de fichas continuas y la devuelve
	
	fn_fichas_area_continua({
		ficha_ini: Number
		valor_vacia: Number,
		inverso: Boolean
		perimetro: [[y0,x0],[yN,xN],
		direccion: Number,
		area: Array,1
		tablero: Array,
		columnas: Number,
		filas: Number,
		especial: especial,
	})
	*/
	tracer_lib(soy_fn," param = "+ver(param));
	
	var ficha_ini = param.ficha_ini;
	var valor_vacia = param.valor_vacia;
	var inverso = param.inverso;
	var incluye = param.incluye;
	var perimetro = param.perimetro;
	var area = param.area;
	var tablero = param.tablero;
	var columnas = param.columnas;
	var filas = param.filas;
	var especial = param.especial;
	var direccion=param.direccion;// direccion en la que se mueve hacia la proxima ficha, apuntamos al elemento de la matriz que contiene el perimetro. Y mantenemos esa direccion hasta encontrarnos con una ficha ocupada, entonces pasamos a la proxima direccion. Siempre que encontramos un obstaculo sumamos 1 a esa ficha. Si alcanza el limite de vuelta es que hemos terminado. Es importante que el perimetro este definido en posiciones relativas y las fichas este en continuidad, o sea, sentido horario o antihorario
	//Ej:   7 0 1
	//      6 X 2
	//			5 4 3	
	
	var limite_vuelta = perimetro.length;
	
	if ( especial == undefined ) especial = "hex"; // compatibilidad con el SIX
	if ( inverso == undefined ) inverso = false;
	if ( incluye == undefined ) incluye = false;
	
	
	var fichas_perimetro = valor_fichas_listado ({
		ficha_ini: ficha_ini,
		rel: perimetro,
		tablero: tablero,
		columnas: columnas,
		filas: filas,
		especial: especial,
		salida_tipo: 'pos'
	});
	
	direccion--;
	if(direccion<0) direccion=limite_vuelta+direccion;
	tracer_lib(soy_fn,"direccion anterior = "+direccion);
	
	area.push(ficha_ini);
	tracer_lib(soy_fn," area = "+ver(area));
	
	// recorremos alrededor de la ficha buscando el proximo paso
	for(var pp=0; pp<limite_vuelta; pp++){
		// verificamos si dimos la vuelta en la direccion
		tracer_lib(soy_fn,"pp = "+pp);
		if(direccion==limite_vuelta) direccion=0;
			tracer_lib(soy_fn,"direccion = "+direccion);
			// tomamos la posicion del proximo paso
			var proximo_paso = fichas_perimetro[direccion];
			tracer_lib(soy_fn,"proximo_paso = "+proximo_paso);
			// verificamos si esa proxima ficha no esta vacia
			// y si no esta registrada en el area
			
			var ficha_no_vacia = tablero[proximo_paso] != valor_vacia;
			
			ficha_no_vacia = inverso?!ficha_no_vacia:ficha_no_vacia;
			
			tracer_lib(soy_fn,"ficha_no_vacia = "+ficha_no_vacia);
			
			if( ficha_no_vacia ) {
				var no_en_area = fn_cual_contiene(area,proximo_paso,true)==0;
				tracer_lib(soy_fn,"no_en_area = "+no_en_area);
				if( no_en_area ){
					area = fn_fichas_area_continua({
						ficha_ini: proximo_paso,
						valor_vacia: valor_vacia,
						inverso: inverso,
						incluye: incluye,
						perimetro: perimetro,
						direccion: direccion,
						area: area,
						tablero: tablero,
						columnas: columnas,
						filas: filas,
						especial: especial
					});
				}//<<< if no_en_area
					
			} else {//<<< if ficha_vacia
				if(incluye && tablero[proximo_paso]!=undefined){
					area.push(proximo_paso);
					return area;
				}
			}
			
		direccion++;
	}//<<< for pp
	tracer_lib(soy_fn," return area = "+ver(area));
	return area;
	
}// <<< fn_fichas_area_continua

function fn_fichas_recorrer_camino(param){
	var soy_fn="fn_fichas_recorrer_camino";
	/*
	Recorre un camino de ficha continuas y cuenta
	cuantos pasos dio y registra las fichas involucradas.
	
	recorrer_camino({
		ficha_ini: Number
		valor_vacia: Number,
		perimetro: [[y0,x0],[yN,xN],
		camino: Array,
		tablero: Array,
		columnas: Number,
		filas: Number
	})
	*/
	/*
	var ficha_ini = param.ficha_ini;
	var valor_vacia = param.valor_vacia;
	var perimetro = param.perimetro;
	var camino = param.camino; // 
	var tablero = param.tablero;
	var columnas = param.columnas;
	var filas = param.filas;
	
	
	
	var salida={pasos:[],ficha:[]};
	
	var limite_vuelta = perimetro.length;
	
	var direccion=0; // direccion en la que se mueve hacia la proxima ficha, apuntamos al elemento de la matriz que contiene el perimetro. Y mantenemos esa direccion hasta encontrarnos con una ficha ocupada, entonces pasamos a la proxima direccion. Siempre que encontramos un obstaculo sumamos 1 a esa ficha. Si alcanza el limite de vuelta es que hemos terminado. Es importante que el perimetro este definido en posiciones relativas y las fichas este en continuidad, o sea, sentido horario o antihorario
	
	//Ej:   7 0 1
	//      6 X 2
	//			5 4 3
	
	
	
	var fichas_perimetro = valor_fichas_listado ({
		ficha: ficha_ini,
		rel: perimetro,
		tablero: tablero,
		columnas: columnas,
		filas: filas,
		especial: 'hex',
		salida_tipo: 'pos'
	});
	
	var donde_estoy = fn_cual_contiene(camino,ficha_ini,false);
	camino.splice(donde_estoy,1); // quitamos la
	
	// recorremos alrededor de la ficha buscando el proximo paso
	for(var pp=0; pp<limite_vuelta; pp++){
		// verificamos si dimos la vuelta en la direccion
		if(direccion>=limite_vuelta) direccion=0;
			
			// tomamos la posicion del proximo paso
			var proximo_paso = fichas_perimetro[direccion];
			// verificamos si ese paso esta en el camino a seguir
			var en_camino = (fn_cual_contiene(camino,proximo_paso,true)>0);
			if( en_camino ){
				// verificamos si ese paso esta vacio, en ese caso llamamos recursivamente
				var ficha_vacia = (tablero[proximo_paso] == valor_vacia);
				if( ficha_vacia ) {
					
					
				}//<<< if ficha_vacia
			}//<<< if en_camino
			
		direccion++;
	}//<<< for pp
	
	return salida
	*/

}// <<< fn_fichas_recorrer_camino

function fn_fichas_salto (e){

	trace ("fn_fichas_salto");
/*	
	fn_fichas_salto ({
		mi_nro_ficha: Number,
		ficha_a_saltar: Number,
		ficha_destino: Number,
		perimetro_interno: Array,
		perimetro_externo: Array,
		datos_tablero: {
			tablero: Array,
			especial: String,
			columnas: Number,
			filas: Number
		}
	});
	/*
	Obtenemos las posiciones de las fichas adyacentes, luego las posiciones de las fichas destino de salto.
	Recuperamos en un listado el valor de las fichas adyacentes y filtramos quedandonos solamente con las que tienen una ficha no vacia.
	Cruzamos los datos extrayendo del perimetro de salto usando los indices (nodos) de las fichas no vacias.
	*/
	
	trace ("e.mi_nro_ficha "+e.mi_nro_ficha);
	
	var salida = [];
	
	var perimetro_interno = valor_fichas_listado({
		ficha_ini: e.mi_nro_ficha, 
		rel: e.perimetro_interno, 
		tablero: e.datos_tablero.tablero, 
		especial: e.datos_tablero.especial,
		columnas: e.datos_tablero.columnas,
		filas: e.datos_tablero.filas,
		salida_tipo: 'pos',
		salida_completa: true
	});
	
	trace ("perimetro_interno "+perimetro_interno)
	/*
	marcar_fichas({
		listado: perimetro_interno,
		color_transforma: {
			ra: 100, rb: 100, 
			ga: 100, gb: 100, 
			ba: 100, bb: 0, 
			aa: 100, ab: 0},
		mc_nombre: "ficha"
	});
	*/

	var perimetro_externo = valor_fichas_listado({
		ficha_ini: e.mi_nro_ficha, 
		rel: e.perimetro_externo, 
		tablero: e.datos_tablero.tablero, 
		especial: e.datos_tablero.especial,
		columnas: e.datos_tablero.columnas,
		filas: e.datos_tablero.filas,
		salida_tipo: 'pos',
		salida_completa: true
	});
	
	trace ("perimetro_externo "+perimetro_externo);
	/*
	marcar_fichas({
		listado: perimetro_externo,
		color_transforma: {
			ra: 100, rb: 255, 
			ga: 100, gb: 100, 
			ba: 100, bb: 0, 
			aa: 50, ab: 0},
		mc_nombre: "ficha"
	});
	*/


	var perimetro_externo_valores = valor_fichas_listado({
		ficha_ini: e.mi_nro_ficha, 
		rel: e.perimetro_externo, 
		tablero: e.datos_tablero.tablero, 
		especial: e.datos_tablero.especial,
		columnas: e.datos_tablero.columnas,
		filas: e.datos_tablero.filas,
		salida_tipo: 'val',
		salida_completa: true
	});
	var perimetro_interno_valores = valor_fichas_listado({
		ficha_ini: e.mi_nro_ficha, 
		rel: e.perimetro_interno, 
		tablero: e.datos_tablero.tablero, 
		especial: e.datos_tablero.especial,
		columnas: e.datos_tablero.columnas,
		filas: e.datos_tablero.filas,
		salida_tipo: 'val',
		salida_completa: true
	});
	

	trace ("perimetro_interno_valores "+perimetro_interno_valores);
	trace ("perimetro_externo_valores "+perimetro_externo_valores);
	
	// buscamos todas las fichas a saltar
	var fichas_a_saltar = fn_array_recolectar_indices ({
		matriz: perimetro_interno_valores,
		valor: e.ficha_a_saltar,
		salida_completa: true
	});
	
	trace ("fichas_a_saltar = "+fichas_a_saltar);
	
	salida = fn_extraer_valores({
			matriz_a:perimetro_externo,
			matriz_b:fichas_a_saltar
	});

	trace ("salida = "+salida);
	
	var fichas_vacias = fn_array_recolectar_indices ({
			matriz: perimetro_externo_valores,
			valor: e.ficha_destino,
			salida_completa: true
	});
	
	trace ("fichas_vacias "+ fichas_vacias)
	
	salida = fn_extraer_valores({
		matriz_a: salida,
		matriz_b: fichas_vacias
	});
	
	trace ("salida = "+salida);
	return salida
}
function fn_perimetro_maximo (e){
	var soy = "fn_perimetro_maximo";
	tracer_lib(soy,e);
	/*
	Calcula las posiciones relativas a una coordenada posibles de ser alcanzadas en X pasos

	Si el parametro 'e' es un numero calcula en pasos ortogonales
	Ejemplo: 4 pasos
          4
        4 + 4
      4 + + + 4
    4 + + + + + 4
	4 + + + X + + + 4
    4 + + + + + 4
      4 + + + 4
        4 + 4
          4

	Si el parametro 'e' es un objeto, entonces toma la propiedad 'pasos' y calcula con pasos en diagonal
	Ejemplo: 4 pasos
	
	4 4 4 4 4 4 4 4 4
	4 3 + + + + + 3 4
	4 + 2 + + + 2 + 4
	4 + + 1 + 1 + + 4
	4 + + + X + + + 4
	4 + + 1 + 1 + + 4
	4 + 2 + + + 2 + 4
	4 3 + + + + + 3 4
	4 4 4 4 4 4 4 4 4
	
	*/
	var salida = [];
	if(fn_tipo_dato(e)=="num"){
		var pasos = e;
		var dx,dy1,dy2;
		for (var p = pasos; p>= -(pasos) ; p--){
			dx = p;
			dy1 = -pasos + Math.abs(p);
			dy2 = pasos - Math.abs(p);
			salida.push([dy1,dx]);
			if(dy1 != dy2) salida.push([dy2,dx]); // esto es para no repetir las puntas
		}//<<< for p
	} else {
		var pasos = e.pasos;
		var dx,dy;
		for (var p = pasos; p>= -(pasos) ; p--){
			salida.push( [pasos,p] );
			salida.push( [-pasos,-p] );
			salida.push( [p,pasos] );
			salida.push( [-p,-pasos] );
			
			
			
		}//<<< for p
		salida = fn_array_simple_ordenada(salida); // ordenamos y limpiamos repetidos
	}//<<< else if

	return salida
}//<<< fn_perimetro_maximo

function fn_pos_xy(param){
	var soy_fn="fn_pos_xy";
	/*
	Version mejorada de lineal_a_coord() con parametros mas simplificados.
	La idea es que las caracteristicas del tablero esten en un objeto generico a todos los juegos de tablero
	
	datos_tablero: {
			tablero: Array,
			columnas: Number,
			filas: Number,
			especial: String // 'hex', 'tri', etc
	}
	
	fn_pos_xy({
		nro_ficha: Number,
		datos_tablero: {
			columnas: Number,
		}
	});
	
	*/
	
	return lineal_a_coord({
		nro_ficha: param.nro_ficha,
		columnas: param.datos_tablero.columnas
	});
}//<<< 
fn_pos_xy

function fn_xy_pos(param){
	var soy_fn="fn_xy_pos";
	/*
	Es una version mejorada en parametros.
	
	fn_xy_pos({
		xy: { x: Number, y: Number },
		datos_tablero: { columnas: Number }
	});
	
	*/
	return coord_a_num_lineal({
		x: param.xy.x, 
		y: param.xy.y,
		columnas: param.datos_tablero.columnas
	});
}/* requiere array.as */

function fn_recolectar_perimetro(param){
	var soy_fn="fn_recolectar_perimetro";
	/*
	Recolecta todas las fichas vacias
	alrededor de las fichas del jugador X
	

	Devuelve una matriz con los numeros de fichas
	
	fn_recolectar_perimetro({
		jugador: Number,
		valor_vacia: Number,
		pila_fichas: Array,
		perimetro_ficha: [[y0,x0],[yN,xN]],
		datos_tablero: {
			tablero:tablero, 
			especial:'hex','tri' // por ahora solo 'hex'
			columnas: columnas,
			filas: filas
		}
	});
	
	*/
	tracer_fi("fn_recolectar_perimetro",param);
	
	var jugador = param.jugador; // no se usa, pero puede ser util
	var valor_vacia = param.valor_vacia;
	
	var pila_fichas = param.pila_fichas;
	var perimetro_ficha = param.perimetro_ficha;
	var datos_tablero = param.datos_tablero;
	
	var salida=[];
	
	var tmp=[]; // almacen temporal para cada ficha
	
	for(var p=0; p<pila_fichas.length; p++){
	
		if(datos_tablero.especial == 'triangular'){
			
			// en el caso del tablero triangular hay que corregir el perimetro invirtiendo la ficha de arriba o abajo segun se trate de una ficha en columna impar y fila par.
			// ver esquema en chamacos
			var tmp = fn_pos_xy({
				nro_ficha: pila_fichas[p]-1,
				datos_tablero: {
					columnas: datos_tablero.columnas
				}
			});
			tracer_lib(soy_fn,"fn_es_par(tmp.y) = "+ fn_es_par(tmp.y));
			tracer_lib(soy_fn,"fn_es_par(tmp.x) = "+ fn_es_par(tmp.x));
			
			var fil_par_col_imp = fn_es_par(tmp.y) && fn_es_par(tmp.x)==false;
			var fil_imp_col_par = fn_es_par(tmp.y)==false && fn_es_par(tmp.x);
			
			tracer_lib(soy_fn,"tmp = "+ver(tmp)+" | fil_par_col_imp="+fil_par_col_imp+" | fil_imp_col_par="+fil_imp_col_par);
			
			if( fil_par_col_imp || fil_imp_col_par ) perimetro_ficha[1][0]=-1; else perimetro_ficha[1][0]=1;// dy
			// cambiamos solo la relativa a la ficha por debajo o encima
			
		}
		tmp = fn_ficha_perimetro_disponibles({
			ficha_ini: pila_fichas[p],
			perimetro_ficha: perimetro_ficha,
			valor_vacia: valor_vacia,
			datos_tablero: datos_tablero
		});
		salida = fn_unir(salida,tmp); // sumamos a la recoleccion
		
	}// <<< for p
	
	salida = fn_array_simple_ordenada(salida); // ordenamos y limpiamos repeticiones
	
	tracer_ff("fn_recolectar_perimetro",salida);
	return salida
}//<<< recolectar_perimetro


function fn_ficha_perimetro_disponibles(param){
	var soy_fn="fn_ficha_perimetro_disponibles";
	/*
	Nos devuelve una matriz con el listado de las fichas vacias alrededor de la ficha indicada
	
	fn_ficha_perimetro_disponibles({
		ficha_ini: Numer,
		perimetro_ficha: [[y0,x0],[yN,xN]],
		valor_vacia: Number,
		datos_tablero: {
			tablero:tablero, 
			especial:'hex','tri' // por ahora solo 'hex'
			columnas: columnas,
			filas: filas
		}
	});
	
	*/
	tracer_fi("fn_ficha_perimetro_disponibles",param);
	
	var ficha_ini = param.ficha_ini;
	var perimetro_ficha = param.perimetro_ficha;
	var valor_vacia = param.valor_vacia;
	var datos_tablero = param.datos_tablero;
	
	
	var salida = [];
	
	// tomamos los valores de las casillas listadas
	var listado_valores = valor_fichas_listado({
		ficha_ini: ficha_ini, 
		rel: perimetro_ficha, 
		tablero: param.datos_tablero.tablero, 
		especial: param.datos_tablero.especial,
		columnas: param.datos_tablero.columnas,
		filas: param.datos_tablero.filas
	});
	
	// obtenemos los numeros de fichas
	var listado_posiciones = valor_fichas_listado({
		ficha_ini: ficha_ini, 
		rel: perimetro_ficha, 
		tablero: param.datos_tablero.tablero, 
		especial: param.datos_tablero.especial,
		columnas: param.datos_tablero.columnas,
		filas: param.datos_tablero.filas,
		salida_tipo: 'pos'
	});
	
	// buscamos todas las vacias
	var nodos_vacios = fn_array_recolectar_indices({matriz:listado_valores,valor:valor_vacia});
	
	// extraemos del listado relativo a ficha_ini
	// solo las posiciones de la casillas disponibles
	// usando el listado de indices disponibles
	salida = fn_extraer_valores({
			matriz_a:listado_posiciones,
			matriz_b:nodos_vacios
	});
	
	tracer_ff("fn_ficha_perimetro_disponibles",salida);
	
	return salida
}
function lineal_a_coord(param){
	var soy_fn="lineal_a_coord";
	/*
	Convierte una numero de posicion lineal en su equivalente en coordenadas X,Y.
	Sirve para saber la coordenada de una ficha.
	
	tablero = [0,...,15]
	
	representa un tablero de 5x5 (ojo, no confundir con una matriz de doble entrada)
	
	columna     0    1    2    3
	
	tablero = [ 0 ,  1 ,  2 ,  3 ,			0 filas
	            4 ,  5 ,  6 ,  7 ,			1
						  8 ,  9 , 10 , 11 ,			2
						 12 , 13 , 14 , 15 ];			3
	
	
	Devuelve un objeto con propiedades x,y
	
	Importante: El nro. de ficha debe esta basado en cero.
	
	Ej: ficha 9 -> x=1, y=2
	
	lineal_a_coord({
		nro_ficha,
		columnas,
	});
	*/
	
	tracer_fi("lineal_a_coord",param);
	
	var nro_ficha = param.nro_ficha
	var columnas = param.columnas;

	var salida = {};
	salida.y = Math.floor (nro_ficha / columnas); // fila
	salida.x = nro_ficha - (columnas * salida.y); // columna
	
	tracer_ff("lineal_a_coord",salida);
	return salida
}

/*
HISTORIAL

8/6/2010
hay que pasar como parametros obligatorios el numero de columnas (las filas las deduce solo)
Hay unas versiones mejoradas en fn_pos_xy.as
*/

function marcar_fichas(param){
	var soy_fn="marcar_fichas";
	// Pinta de un color (con transformacion de los componentes RGB)
	// un listado de movieclips basados en el nombre mc_nombre+nro
	
	// Viene a ser la misma que esta en funciones.as pero con multiples elementos
	
	// tambien puede servir para llevar una salida de las funciones
	// que comprueban fichas para saber que esta pasando
	// o algun efecto vistoso de cuando la maquina 'piensa'
	
	/*
	marcar_fichas({
		listado: Array,
		color_transforma: color_normal={
			ra: 100, rb: 0, 
			ga: 100, gb: 0, 
			ba: 100, bb: 0, 
			aa: 100, ab: 0},
			tono:1 a 360 -> rotacion de tonalidad (propuesta)	
			mc_nombre: String
	});
	*/
	tracer_fi("marcar_fichas",param);

	var listado = param.listado;
	color_transforma = param.color_transforma
	var mc_nombre = param.mc_nombre;

	for(var ff in listado){
		mi_color = new Color( eval(mc_nombre + listado[ff]));
		mi_color.setTransform(color_transforma);
	}
	
	tracer_ff("marcar_fichas");
	/*

		Propongo que en este script los valores NULL sean tomados por defecto
		y un parametro para definir con respecto al TONO y no con ese escript HORRIBLE de flash

	*/

};

function valor_fichas_listado (param){
	/*
		Yo simplificaria esta funcion haciendo que me devuelva cualquier MovieClip al rededor de una ficha 
		Se que no seria exacto, pero si eficiente, esto es lennnnnttttoooooooo
	*/
	var soy_fn="valor_fichas_listado";
	/* 
	
	funcion triple !!!!
	
	Recorre una serie de fichas listadas en
	coordenadas [y,x] (rel)
	en una matriz lineal (tablero) que representa
	un tablero de 2 dimensiones
	de cierto tamanio (columnas x filas)
	utilizando como partida un nodo (ficha)
	
	y devuelve una matriz con lo indicado (salida_tipo)
	
	Por defecto devuelte los valores de las fichas
	(equivalente a mc.txt)
	
	valor_fichas_listado ({
		ficha_ini 	
		rel: [ [y0,x0],[y1,x1],...[yn,xn] ]
		tablero,
		columnas: Number,
		filas: Number,
		especial: 'hex'
		salida_tipo: 'val'|'pos'|'yx'
		})
	
	
	valor_fichas_listado ({
		ficha_ini, 	
		// La ficha a partir de la cual empieza la busqueda
		rel,		
		// Las posiciones relativas a ficha en formato
		// [ [y0,x0],[y1,x1],...[yn,xn] ]
		tablero	
		// La matriz lineal del tablero
		especial
		// indica una forma de ficha y tablero distinto de rectangular
		// para hacer correcciones en las coordenadas
						'hex' -> hexagona
						'tri' -> triangular (falta hacerlo)
								
		salida_tipo 	
		// indica que tipo de datos debe devolvernos
									'val' 	-> valores de las casillas
									'pos' 	-> posicion lineal de las fichas
									'yx'	-> coordenadas y,y de las casillas
		})
	*/
	
	tracer_fi("valor_fichas_listado",param);
	
	var salida = [];
	
	// referenciamos a los parametros para hacer mas facil la lectura
	var ficha_ini = param.ficha_ini;
	var rel = param.rel;
	var tablero = param.tablero;
	var columnas = param.columnas;
	var filas = param.filas;
	var especial = param.especial;
	var salida_tipo = param.salida_tipo;
	var salida_completa = param.salida_completa;
	
	// por defecto filtra las fichas fuera del tablero
	if (salida_completa == undefined || salida_completa == null ) salida_completa = false;
	
	if (rel){
		tracer_lib(soy_fn,"MODO relativo");
		
		// obtenemos la coordenada actual de la ficha
		// nota:restamos 1 porque estamos usando un sistema basado en 0 para las coord.
		var coord = lineal_a_coord({
			nro_ficha: ficha_ini-1,
			columnas: columnas,
			filas: filas
		});
		
		tracer_lib(soy_fn,"Coordenadas de la ficha_ini = "+ficha_ini);
		tracer_lib(soy_fn,"coord.x = "+coord.x+" | coord.y = "+coord.y);
		tracer_lib(soy_fn,"Recorremos las posiciones relativas a la ficha inicial");

		for(var f in rel){
		
			var dy = rel[f][0];
			var dx = rel[f][1];	
			
			tracer_lib(soy_fn,"f = "+f+"  -> coords -> dy = "+dy+" | dx = "+dx);
				
			if(especial=='hex'){
				// Corregimos el desplazamiento X segun se trate
				// de una ficha por encima o por debajo de la fila de la ficha inicial
				// y tambien en funcion de si es una fila impar
				if(dy!=0 && es_par(coord.y)==false){
					dx+=1;
					tracer_lib(soy_fn,"corregir dx = "+dx);
				}
				// volvemos a ajustar si se trata de una ficha inicial en fila impar
				// y las ficha a verificar esta en una fila distinta a una distancia par
				if(dy!=0 && es_par(coord.y)==false && es_par(dy)){
					dx-=1;
					tracer_lib(soy_fn,"corregir 2 dx = "+dx);
				}
			}
			
			var fuera_de_tablero = coord.y+dy<0 || coord.y+dy>=filas || coord.x+dx<0 || coord.x+dx>=columnas;
			if (fuera_de_tablero) {
				tracer_lib(soy_fn,"Objetivo FUERA DE TABLERO");
			} else {
				// obtenemos su coordenada en formato lineal
				var objetivo = ficha_ini + coord_a_num_lineal({
					x:dx,
					y:dy,
					columnas: columnas,
					filas: filas
				});
				// aqui no hace falta corregir la coordenada linea obtenida porque
				// ficha_ini ya tiene el 1 sumado
				
				var valor = tablero[objetivo];	
				
				tracer_lib(soy_fn,"f = "+f+" -> objetivo = "+objetivo+" -> valor = "+ valor);
				
				
				// Verificamos si estamos en los límites horizontales del tablero
				// porque las fichas en formato lineal toman como validas
				// las de la otra punta del tablero
				
				var coord_tmp = lineal_a_coord({
					nro_ficha: objetivo-1,
					columnas: columnas,
					filas: filas
					});

				
				tracer_lib(soy_fn,"Verificar limites");
				tracer_lib(soy_fn,"dy = "+dy+" | coord_tmp.y = "+coord_tmp.y+" | coord.y = "+coord.y);
				
				var valor_yx = [coord_tmp.x, coord_tmp.y];
				var valor_pos = objetivo;
				var valor_val = tablero[objetivo];
			
			}//<<< else if (fuera_de_tablero)
			
			
			//if (Math.abs(dy) != Math.abs(coord_tmp.y-coord.y) && salida_completa==true ){
			if (fuera_de_tablero && salida_completa==true ){
				// para ello verificamos si el desplazamiento en Y
				// es diferente del que supone entra la original y la temporal
				// basado en sus coordenadas Y de la ficha inicial y la objetivo
				
				tracer_lib(soy_fn,"Advertencia: fuera de limites, pero agregamos");
				valor_yx = null;
				valor_pos = null;
				valor_val = null;
				
			}
			//if (Math.abs(dy) != Math.abs(coord_tmp.y-coord.y) && salida_completa==false ){
			if (fuera_de_tablero && salida_completa==false ){
				tracer_lib(soy_fn,"fuera de limites (bordes del tablero)");
			}	else {
				// ficha valida dentro de los bordes del tablero
				
				// una ultima verificacion porque la anterior no es infalible
				// y en las esquinas falla
				
				
				if((tablero[objetivo]!=null && tablero[objetivo]!=undefined) || salida_completa){
				
					switch(salida_tipo){
						case 'yx' :
							salida.push(valor_yx);
							break;
						case 'pos' :
							salida.push(valor_pos);
							break;
						case 'val' :
						default:
						// 'val' devuelve valores
						salida.push(valor_val);
					} // <<< switch
					
					
				} // <<< valor valido

				
				if(_level0.dev){
					// pruebas >>> de indicadores graficos
					_root["ficha"+objetivo]._xscale=50;
					_root["ficha"+objetivo]._yscale=50;
					// <<< pruebas			
				}
				
				
			} // <<< else
			
			
		} // <<< for in
		
		tracer_ff("valor_fichas_listado",salida);
		return salida
	
	}
} // <<< valor_fichas_listado
function fn_forma(MC, puntas, largo, caracteristicas) {
	var soy_fn="fn_forma";
		MClip = eval(MC);
	/* 
		MC: MovieClip parametrado como String
		puntas: 
				- de 0 y 4 - triangulo, cuadrado, ... (leer la array formas_txt en BD)
				- 5 es un circulo
				- 6 a 10 estrellas
		Largo: largo del radio en pixels
		caracteristicas: Array[null-0...8,null-0...8]  primero color de lina, segundo color de forma, null sin color, luego vien distorcion horizontal, distorcion vertical
		
		este programa tiene que simplificarse!!!!!!
		
	*/
	
	puntas += 3; // se corrije la entrada de cantidad de puntas
	
	
	if (!MClip.halo) fn_forma_dibujo (MC, "halo" , puntas, largo + 5, [0, 0, caracteristicas[2], caracteristicas[3]]) // contruye el halo con respecto a la forma
	MClip.halo._visible=false; //--- hace el halo invisible
	
	fn_forma_dibujo (MC, "forma" , puntas, largo, caracteristicas) //contruye la forma en si
	

	MClip.fondo._visible=false;	//--- hace el fondo invisible

}
function fn_forma_dibujo (MC, nombre , puntas, largo, caracteristicas) {
	var soy_fn="fn_forma_dibujo";
		/* 
			Por ahora esta funcion solo sirve a la funcion anterior no usar en las peliculas 
			
		*/
		MClip = eval(MC);

		triangle_mc = MClip.createEmptyMovieClip(nombre, MClip.getNextHighestDepth()); //se pueden crear ilimitadas formas sobre un MClip
		
		if (w==0) { 
			triangle_mc.lineStyle(8, caracteristicas[0], 100);
		} else {
			triangle_mc.beginFill(colores[caracteristicas[1]], caracteristicas[1]==null?0:100);
			triangle_mc.lineStyle(4, colores[caracteristicas[0]], caracteristicas[0]==null?0:100);
		}
		
		estrella = puntas > 8?2:1 //es estrella?
		puntas += (puntas > 8?-4:0) + (puntas==8?60:0) // arama estrellas y circulos		
		grados = Math.round(360/puntas) / estrella; // grados y estrella
			
		inicio = puntas==4?45: puntas==2?90:0 //inicio
		
		r=0; div=1;
		
		for (n=inicio; n < (360  + inicio) ; n += grados ) {
			r++;			
			div = Math.round(r/2)==(r/2) && estrella == 2?2:1 // forma las estrellas de ser necesario
			rd = fn_array_a_numero (caracteristicas[2]) * 5;
			ri = fn_array_a_numero (caracteristicas[3]) * 5; 
			x= (largo / div ) * Math.cos(((n+rd)-90)*PIX);
			y= (largo / div) * Math.sin(((n+ri)-90)*PIX) + (puntas==3?largo/6:0 ); //corrije la altura para el triangulo
			if (n==inicio ) {triangle_mc.moveTo(x, y); x1=x; y1=y; } else triangle_mc.lineTo(x, y);
		}
		triangle_mc.lineTo(x1, y1);
		triangle_mc.endFill();
}
function fn_forma_crear(param){
	var soy_fn="fn_forma_crear";
	/*
	Modo de uso
	
	param = {
		mc,					-> nombre del MovieClip
		puntas,				-> ver formas_txt en BD/geometria.as
		radio,				-> longitud del radio en pixeles
		caracteristicas{		-> otras caracteristicas del dibujo
			color_linea,				null | 0..8, -> color* de linea o borde
			color_relleno,			null | 0..8, -> color* de relleno
			distorcion_horizontal,
			distorcion_vertical,
			grosor_linea,			null | n	 -> grosor de la linea en pixeles ***
			dibuja_mal:Boleam,				No se esmera al dibujar
		},
		halo				-> indica si debe o no dibujarse un halo para efecto de rollover **
	}
	
	* color:
		ver BD/color.as
	
	** halo:
		para hacerlo compatible con las versiones anteriores
		en el caso de poner false o null lo que hacemos es crearlo
		para que la funcion vieja vea que existe y no lo cree.
				
	*** grosor_linea:
		para hacerlo compatible con la versión vieja si esta funcion recibe
		un null lo transforma en cero para evitar que en los juegos viejos
		al no estar definida (null) lo haga desaparecer.
		-1 indica una linea muy fina
	
	*/

if(param.halo==false || param.halo == undefined || param.halo==null){
	var mc = eval(param.mc);
	mc.createEmptyMovieClip("halo",getNextHighestDepth());
}

// Mudamos la nueva notacion al sistema anterior
var caracteristicas = new Array(param.caracteristicas.color_linea, param.caracteristicas.color_relleno, param.caracteristicas.distorcion_horizontal, param.caracteristicas.distorcion_vertical, param.caracteristicas.grosor_linea)
caracteristicas[-1] = param.dibuja_mal;

// Llamamos a la funcion vieja
fn_forma(param.mc, param.puntas, param.radio, caracteristicas);

}
function fn_forma_dibujo (MC, nombre , puntas, largo, caracteristicas) {
	var soy_fn="fn_forma_dibujo";
		/* 
			Por ahora esta funcion solo sirve a la funcion anterior no usar en las peliculas 
			
		*/
		
		/* Actualizacion 23/04/2010
			Se le ha agregado a caracteristicas la posibilidad de definir el grosor del trazo
			para compatibilizarlo con las veriones anteriores
			al no estar definido (null) entonces se toma el valor por defecto viejo.
			
			caracteristicas[4]=
								null - linea por defecto
								-1 - sin linea
								0 - linea fina
								1-255 grosor en pixeles
								
			
		*/
		MClip = eval(MC);
			//se pueden crear ilimitadas formas sobre un MClip
		triangle_mc = MClip.createEmptyMovieClip(nombre, MClip.getNextHighestDepth()); 

		grosor = caracteristicas[4];		
		grosor = grosor==null?4:grosor==-1?null:grosor;
		
		if (w==0) { 
			triangle_mc.lineStyle(grosor*2, caracteristicas[0], 100);
		} else {
			triangle_mc.beginFill(colores[caracteristicas[1]], caracteristicas[1]==null?0:100);
			triangle_mc.lineStyle(grosor, colores[caracteristicas[0]], caracteristicas[0]==null?0:100);
		}
		
		estrella = puntas > 8?2:1 //es estrella?
		puntas += (puntas > 8?-4:0) + (puntas==8?60:0) // arama estrellas y circulos		
		grados = Math.round(360/puntas) / estrella; // grados y estrella

		inicio = puntas==4?45: puntas==2?90:0 //inicio
		
		r=0; 
		div=1;

		rd = fn_array_a_numero (caracteristicas[2]) * 5;
		ri = fn_array_a_numero (caracteristicas[3]) * 5; 

		for (n=inicio; n < (360  + inicio) ; n += grados ) {
			r++;			
			div = Math.round(r/2)==(r/2) && estrella == 2?2:1 // forma las estrellas de ser necesario
			x= (largo / div) * Math.cos(((n+rd)-90)*PIX);
			y= (largo / div) * Math.sin(((n+ri)-90)*PIX) + (puntas==3?largo/6:0); //corrije la altura para el triangulo
			if (caracteristicas[-1]) { 
				x = Math.round(x);
				y = Math.round(y);
			}
			if (n==inicio ) {triangle_mc.moveTo(x, y); x1=x; y1=y; } else triangle_mc.lineTo(x, y);
		}
		if (caracteristicas[-1]) triangle_mc.lineTo(x1, y1);
		triangle_mc.endFill();
}
function fn_manesillas (MC, txt) {
	var soy_fn="fn_manesillas";
	actualizar_hora = null;
	MClip = eval(MC);

	/* 
		El objeto reloj solo sitene que tener dos MClip
		manesilla_hora
		manesilla_minutos
		
		la funcion se llama desde la lina principal
			 fn_manesillas (reloj, hora entre 1 y 144) 
			
	*/ 

	hora = n_a_hora (txt, false);

	MClip.dibu.minutero._rotation = Math.round(360/12*(txt-(12 * Math.floor(hora[0]/12) )));
	MClip.dibu.hora._rotation = 360/12*hora[0] + (360/12/60*hora[1]); // la hora tiene un leve desplazamiento por los minutos pasadas emulando un reloj analogo
	
}
function fn_pausar_tiempo ( e ) {
	/*
	Pausa o reanuda el cronometro del timer
	
	Si no recibe para'metros se comporta como un switcher on|off
	
	La primera vez que se llame verifica si ya existe la variable de estado, en cuyo caso la primera vez la define pausando el juego, o sea, supone que el tiempo ya esta corriendo.
	
	Puede recibir true o false
	*/
	
		_level0.juego_en_pausa = e!=undefined?e:!(_level0.juego_en_pausa)? true : !_level0.juego_en_pausa ;

}/* esta es la funcion que se debe reemplazar en cada proyecto y adecuarla */
function ir_a_inicio () {
	var soy_fn="ir_a_inicio";
	_level0.gotoAndStop("menu_principal"); // Entrena Neuronas
}
function n_a_hora (numero, texto, real) {
	var soy_fn="n_a_hora";
	/*
		Pasa un numero entre 1, 144 a horas y minutos 
		real da todos los numeros, no tan solo de 5  en 5
	*/
		numero_h = Number(Math.floor(12/144*numero));
	if (!real) { 
		numero_m = 5 * Math.floor(numero - (12*numero_h));
	} else {
		numero_m = Math.floor(5 * (numero - (12*numero_h)));
	}
	// si se desea desplegar la hora en texto
		salida = (numero_h<10?"0"+numero_h:numero_h)+":"+(numero_m<10?"0"+numero_m:numero_m); 
		if (numero_h < 0) salida="00:00";
		if (texto) return salida
	//------------------
	return [numero_h, numero_m]; //hora en rango
}
function tiempo_juego (duracion) {
		var soy_fn="tiempo_juego";
	/*
		La duracion se expresa en unidades de 5; o sea 1 es 5 segundos 
		para sacar el tiempo es muy simple:  duracion = segundo / 5
	*/
	if (!_level0.turbo) _level0.turbo = 0;
	
	_level0.tiempo_general = 0;
	_level0.tiempo_general_juego = duracion;
	_level0.tiempo_general_juego_txt = "";
	// el tiempo de entrada en texto
	this.createEmptyMovieClip('mc_tiempo_juego', this.getNextHighestDepth()); 
	this.mc_tiempo_juego.onEnterFrame = function () {
		_level0.tiempo_general_juego -= .006 * Math.round((_level0.turbo)+1);  
 		if (_level0.tiempo_general_juego < 0) tiempo_juego_matar ();
		if (_level0.tiempo_general_juego < .006*10) {
			fn_ani_pop ("mc_tablero", [0,0,0,0, -100], [0,10]); // cuando faltan 10 segundos
		}
		// convierte a texto
		_level0.tiempo_general_juego_txt = n_a_hora (_level0.tiempo_general_juego, true, true);
	}
	
	// NUEVO 2010-09-12
	// CREA EL PAUSADOR DE TIEMPO
	this.createEmptyMovieClip ( "mc_tiempo_pausa" , this.getNextHighestDepth ( ) ) ;
	this.mc_tiempo_pausa.onEnterFrame = function () {
		if ( _level0.juego_en_pausa ) _root.tiempo_general_juego += .006 * Math.round( ( _level0.turbo ) + 1 ) ;  // este valor esta relacionado con el de la funcion tiempo_juego.as
	}

	
}
/* esta tambien se puede reemplazar segun convenga */
function tiempo_juego_matar () {
	var soy_fn="tiempo_juego_matar";
	/*
		Aca deberia ir algo mas, como acciones despues de que el juego termina
	*/
	ir_a_inicio();
	this.mc_tiempo_juego.removeMovieClip();
	this.mc_tiempo_pausa.removeMovieClip();
}

/* 
Reemplazada por delay
function  fn_tiemp_dispara (delay, funcion, parametros) {
	var soy_fn="fn_tiemp_dispara";
	//--- crea la animacion ----
	anima_nombre = "animacion" +fn_azar([1,100000000]);
	MC = this.createEmptyMovieClip(anima_nombre, this.getNextHighestDepth()); 
	MC.delay = delay;
	MC.delay_actual  = 0;

	MC.onEnterFrame = function () {
			this.delay_actual ++;
			tracer_lib(soy_fn,this.delay_actual + " - " + this.delay) 
			if (this.delay == this.delay_actual) { 
				if(parametros==undefined){
					funcion(); 
				} else {
					funcion(parametros);
				}
				this.removeMovieClip();
			}

	}
	return MC
}

*/

function fn_diferencias_entre_matriz (entrada) {
	var soy_fn="fn_diferencias_entre_matriz";
	/*
		entrada:
				array_1:
				array_2:
		salida:
				array con elementos diferentes
	*/
	var salida = [];

	for (yy=0; yy < entrada.array_1.length; yy++)  {
		for (xx=0; xx < entrada.array_1[0].length; xx++) {
			if (!(entrada.array_1[xx][yy] == entrada.array_2[xx][yy])) salida [salida.length] = [xx,yy];
		}
	}
//	tracer_lib(soy_fn,"Diferencias" + salida);
	return salida
}
function fn_inteligencia (entrada) {
	var soy_fn="fn_inteligencia";
	salida = {};
	/*
		Pegante y petulante funcion que trata de imitar la inteligencia del jugador de modo generico
			entrada:
					tablero: tablero actual
					jugada_matriz: jugada a comprobar
					
			salida:
					jugadas: con las posiciones más eficientes para jugar
					existe: jugadas_posible ya existe en el tablero

	*/

	nn=0
	salida.existe = false
	posibles_jugadas = [];
	for (ny=0; ny < entrada.tablero.length; ny++) {
		for (nx=0; nx < entrada.tablero[nx].length ; nx++) {
			// siciones relativas en una matriz - es bastante siemple.
		
			matriz_final = fn_sumar_matriz ({ tablero: entrada.tablero, pieza: entrada.jugada_matriz, x:nx, y:ny });
			//--------------------------INTELIGENCIA-----------------------------
			if ( matriz_final == entrada.tablero) { salida.existe = true; }
			//--------------------------JUGA DEL ENEMIGO -----------------------------
			jugada = fn_diferencias_entre_matriz ({ array_1:entrada.tablero, array_2:matriz_final});
			// tracer_lib(soy_fn," tablero: " + jugada );
			/* fn_diferencias_entre_matriz : devuelve los nodos que serian posibles jugadas */

			if (jugada) {
			//	tracer_lib(soy_fn,jugada);
				posibles_jugadas[nn] = jugada;
				nn++;
			}
		}
	}
//	tracer_lib(soy_fn,'jugadas posibles ---> ' + posibles_jugadas);

	jugadas_finales = posibles_jugadas[0]; // muerte a null y undefined
	
	for (nn2=0; nn2 < posibles_jugadas.length; nn2++) {
			//comprueba cual es la mas larga de las cadenas (se puede funcionar)
			if ( posibles_jugadas[nn2] < jugadas_finales) jugadas_finales = posibles_jugadas[nn2];
	}

	
	salida.jugadas = jugadas_finales;
	
	return salida
}
function fn_relativo_a_matriz (entrada) {
	var soy_fn="fn_relativo_a_matriz";
	/*
		convierte posiciones relativa a una matriz. no funciona bien por que deberia tomar a cero como la posicion central de la matriz
	
		entrada:
				array: con las posiciones relativas 
				nodo: valor que hay que poner en cada punto
				alto: alto de la matriz de salida
				ancho: ancho de la matriz de salida
				
		salida:
				matriz creada a partir de esos datos
	*/
	
	salida = fn_matriz ({ ancho: entrada.ancho, alto: entrada.alto, elemento: 0 });
	for (nn=0; nn < entrada.array.length; nn++) salida [entrada.array[nn][0]][entrada.array[nn][1]] = entrada.nodo;
	return salida
}
function fn_mat_centro_en_rango (p) {
	soy="fn_mat_centro_en_rango";
/*
	Devuelve la posicion centrar en un rango con respecto al un largo

	fn_mat_centro_en_rango ( { 
								largo: largo en pixels,
								 rango: [inicio, fin] 
								});

-------------------------------------------------------------

	Ejemplo:
		ficha._x = fn_mat_centro_en_rango ({ 
												largo: (ficha._width * niveles_tablero[nivel][1]), 
												rango: [this._x, this._width] 
											}); //	centra un Mclip en el centro de la pantalla

-------------------------------------------------------------	
*/
	return (((p.rango[1]-p.rango[0]) - p.largo) / 2) + p.rango[0]
}
function fn_al_cielo (e){
	var soy_fn="fn_al_cielo";
	/*
	Manda un movieclip a su nivel Z ma's alto
		
	fn_al_cielo (String);

	*/
	tracer_fi(soy,e);
	var mc = eval(e);
	tracer_lib (soy_fn,"mc = "+mc);
	mc.swapDepths(mc._parent.getNextHighestDepth());
}
function fn_al_fondo (e){
	var soy_fn="fn_al_fondo";
	/*
	Manda un movieclip a su nivel Z ma's bajo
		
	fn_al_fondo (String);

	*/
	tracer_fi(soy,e);
	/*
	var tmp = e.split(".");
	trace("tmp "+tmp);
	var mc;
	if(tmp.length > 1){
		mc = eval(tmp[mc.length-1]);
	} else {
	 mc = eval(e);
	}
	*/
	mc = eval(e);
	
	var objetos = [];
	
	for (var obj in mc._parent ){
		trace (typeof(eval(obj)));
		trace (soy_fn+": mc = "+obj+" "+fn_tipo_dato(eval(obj)));
		if (
			fn_tipo_dato(eval(obj))=="mov"
			&&
			eval(obj) != mc
		) objetos.unshift(eval(obj));
	}
	
	objetos.unshift(mc);
	
	for( var n  = 0 ; n < objetos.length ; n++ ){
			fn_al_cielo(String(objetos[n]));
	}
	
	return objetos;
}// fn_btn_activar.as
// 26/5/2010
function fn_btn_activar(param){
	var soy_fn="fn_btn_activar";
	/*
	Activa o desactiva un boton.
	Al desactivarlo lo oculta, lo inhabilita y le quita el useHandCursor
	Pero conserva las funciones asignadas a los eventos.
	
	ruta, listado y estado son opcionales,
	por defecto sus valores son:
		ruta = _root;
		listado = [""];
		estado = true;
	
	fn_btn_activar({
		nombre_mc: String,
		ruta: MovieClip,
		listado: Array,
		estado: Boolean
	});
	
	_root.atril.ficha0.onRelease = soltar ;
	_root.atril.ficha1.onRelease = soltar ;
	_root.atril.ficha2.onRelease = soltar ;
	
	Ej:
		fn_btn_activar({
			nombre_mc: 'ficha',
			listado: [1,2],
			ruta: _root.atril,
			estado: false
		});
		
		tracer_lib(soy_fn,_root.atril.ficha0.enabled) 	// => false
		tracer_lib(soy_fn,_root.atril.ficha1._visible) 	// => false
		tracer_lib(soy_fn,_root.atril.ficha1.onRelease) 	// => function
	*/
	tracer_fi("fn_btn_activar",param);
	
	var nombre_mc = param.nombre_mc;
	var listado = param.listado;
	var ruta = param.ruta;
	var estado = param.estado;
	
	if(ruta==undefined || ruta == null) ruta=_root;
	if(listado==undefined || listado == null) listado=[""];
	if(estado==undefined || estado == null) estado=true;
	
	if(nombre_mc==undefined || nombre_mc == null) return (tracer_lib(soy_fn,"ERROR: falta parametro"));
	
	var mc;
	for(var n in listado){
		mc = ruta[nombre_mc+listado[n]];
		
		mc.enabled = estado;
		mc.useHandCursor = estado;
		mc._visible = estado;
	}
	
	tracer_ff("fn_btn_activar",salida);
}
function fn_fade_ronda(param){
	/*
	fn_fade_ronda({
		escenario:[ancho_px,alto_px],
		tipo: ">","<","><"
		fotogramas: Number || [delay,duracion],
		que_color: 0xffffff
		funcion: funcion de retorno
	});
	*/
	
	var escenario_ancho = param.escenario[0];
	var escenario_alto = param.escenario[1];
	var fotogramas = param.fotogramas;
	var que_color = param.que_color;
	
	if(param.escenario == undefined){
		var escenario_ancho = Stage.width * 1.1;
		var escenario_alto = Stage.height * 1.1;
	}
	
	if(param.que_color == undefined){
		var que_color = 0xffffff;
	}
	
	if(fotogramas==undefined) fotogramas = 24;
	
	if(typeof(fotogramas)=="number"){
		var delay = Math.floor(fotogramas/2);
		var duracion = Math.ceil(fotogramas/2);
	} else {
		var delay = param.fotogramas[0];
		var duracion = param.fotogramas[1];
	}
	
	/* remplazar esto por la funcion de geometria */
	
	fade_mc.removeMovieClip();
	createEmptyMovieClip("fade_mc", this.getNextHighestDepth());
	
	if (!(param.tipo == "<")) fade_mc._alpha = 0;
	
	fade_mc.beginFill(que_color);
	fade_mc.moveTo(0,0);
	fade_mc.lineTo(escenario_ancho,0);
	fade_mc.lineTo(escenario_ancho,escenario_alto);
	fade_mc.lineTo(0,escenario_alto);
	fade_mc.lineTo(0,0);
	fade_mc.endFill();

	if (param.tipo == "<") {
		fn_ani_pop ("fade_mc", [0,0,0,0,-100], [delay,duracion]);
	} else {
		fn_ani_pop ("fade_mc", [0,0,0,0,100], [delay,duracion]);
		if (param.tipo == "><") {
			fn_ani_pop ("fade_mc", [0,0,0,0,-100], [delay+duracion+1,duracion]);
		}
	}
	fn_tiemp_dispara (delay+duracion+1, param.funcion);
}fn_fotograma_azar = function (param){
	var soy_fn="fn_fotograma_azar";
	/*
	// selecciona un fotograma al azar en el movieclip indicado y salta el cabezal hacia este.
	
	fn_fotograma_azar({
		mc: Movieclip,
		rango: [min,max]
		});
		
	Si no se define rango toma todos los fotogramas del movieclip
	
	*/
	var rango = param.rango;
	var mc = param.mc;
	
	if (rango==undefined || rango == null){
		rango[0] = 1;
		rango[1] = mc._totalframes;
	}
	mc.gotoAndStop(fn_azar([rango[0],rango[1]])); //fn_azar esta en array.as
}
function fn_fotograma_dispara_funcion (e){
	var soy_fn="fn_fotograma_dispara_funcion";
	tracer_fi("fn_fotograma_dispara_funcion",e);
/*
	fn_fotograma_dispara_funcion ({
		mc: String | Array,
		fotograma: Number | String | Array (de string o number),
		funcion: String | Array de funciones,
		e: parametros
	});
	
	Se pueden poner etiquetas como fotogramas claves en el AS de flash
	Ejemplo:
			etiqueta = "fotograma clave";
*/

	var mc = e.mc;
	var fotograma = e.fotograma;
	var funcion = e.funcion;
	var e = e.e; // parametros
	
	if(!(_level0.id_fn_fotograma_dispara_funcion)) _level0.id_fn_fotograma_dispara_funcion=0;
	
	var id;
	
	tracer_lib(soy_fn,"id = "+id);

	
	if(!(mc)) mc="this";
	
	var ultimo_fotograma = eval(mc)._totalframes;
	

	if(!(fotograma)) {
		fotograma=[ultimo_fotograma];
	} else if (typeof(fotograma)=="number" || typeof(fotograma)=="string"){
		fotograma=[fotograma];
	}
	
	if(fn_tipo_dato(funcion)!="arr"){
		funcion =[funcion];
	}
	
	if(fn_tipo_dato(e)!="arr"){
		e =[e];
	}
	
	var salida = [];
	var mc_control;
	
	for(var n = 0; n < fotograma.length; n++){
	
		id = "id_fn_fotograma_dispara_funcion_"+_level0.id_fn_fotograma_dispara_funcion++;
		mc_control = this.createEmptyMovieClip(id, this.getNextHighestDepth());
		
		trace("funcio["+n+"] "+funcion[n]);
		trace("e["+n+"] "+e[n]);
		
		mc_control.mc = mc;
		mc_control.fotograma = fotograma[n];
		mc_control.funcion = funcion[n];
		mc_control.e = e[n];
		
		mc_control.onEnterFrame = function () {
			tracer_lib(this._name,this._name+" f = "+eval(this.mc)._currentframe+" "+this.fotograma);
			if(eval(this.mc)._currentframe==this.fotograma || eval(this.mc).etiqueta == this.fotograma) {
				if (eval(this.mc).etiqueta == this.fotograma) eval(this.mc).etiqueta = ""; 
				//eval(funcion)(e);
				//this._parent[this._name+"_return"] = eval(this.funcion)(this.e);
				this._parent[this._name+"_return"] = this.funcion() || eval(this.funcion)(this.e);
				this.removeMovieClip();
			}
		}
		
		salida[n]=mc_control;
		
	}//<<< for
	
	return salida
}
function fn_gf_orden (mc,  cantidad, posicion, tamanio, azar, fts ) {
	var soy_fn="fn_gf_orden";

	

	
	/*
		mc: nombre del MClip que se quiere ordenar, tiene que ser nominal "Nombre0"..."NombreX"
		Cantidad: N cantidad de Mclip a asignar
		posicion: [x,y,x1,y1] rango de posisiones con los que se trabaja
		tamanio: [alto, ancho] Solo se usa para en el caso de que sea ordinal
		azar: Si es verdadero entonces ordena de forma azarosa
		escala: Similar a fn_ani_pop pero sin los datos de x e y
		fts: identico a fn_ani_pop
*/
	
	rx = Math.round((posicion[2] - posicion[0]) / tamanio[0]);
	ry = Math.round((posicion[3] - posicion[1]) / tamanio[1]);
	
	tracer_lib(soy_fn, "Cuantos entran ---> " + rx * ry);
	
	if (azar==true) {
	
		n=0;
		rn = fn_azar([0, cantidad*100])/100;
		
		for (y=0; y <= ry; y++) {
			for (x=0; x <= rx; x++) {
					MClip = eval(mc+n);	
			
				  lx = ((posicion[2] + posicion[0]) /2) - (tamanio[0]/2) - posicion[0] ; // largo de x
					X  =  fn_azar([lx/1.5,lx]) * Math.cos((Math.PI/cantidad*2)* n + rn) + ((posicion[2] + posicion[0]) /2);

					ly = ((posicion[3] + posicion[1]) /2) - (tamanio[1]/2) - posicion[1] 
					Y =  fn_azar([ly/1.5,ly]) * Math.sin((Math.PI/cantidad*2) * n + rn ) + ((posicion[3] + posicion[1]) /2);
					
					fn_ani_pop (mc+n, [X-MClip._x, Y-MClip._y], fts); 
					
					if ( n > cantidad ) return; 
					n ++;
			}
		}	

		
		
			
	} else {
	 
		n=0;
		for (y=0; y <= ry; y++) {
			for (x=0; x <= rx; x++) {
					MClip = eval(mc+n);	
					X = (x *  tamanio[0]) +  (tamanio[0]/2) +  posicion[0];
					Y =  (y *  tamanio[1]) +  (tamanio[1]/2) +  posicion[1];
					fn_ani_pop (mc+n, [X-MClip._x, Y-MClip._y], fts); 
					
					if ( n > cantidad ) return; 
					n ++;
			}
		}	
	}
	
}
//include ("../matematica/fn_mat_centro_en_rango.js");

function fn_gf_tiempo_fin ( ) {

	var soy_fn="fn_gf_tiempo_fin" ;
	
	//  fn_gf_tiempo_fin_matar ( ) ;
	 
	// crea el MovieClip de festo de victoria
	
	this.createEmptyMovieClip ( 'gf_tiempo_fin' , this.getNextHighestDepth ( ) ) ; 
	this.gf_tiempo_fin.loadMovie ( "graficos/tiempo_fin.swf" ) ;

	// crea un control con enterframe para centrar y poner en el nivel mas alto la placa
	this.createEmptyMovieClip( 'gf_tiempo_fin_tmp' , this.getNextHighestDepth( ) ) ; 
	this.gf_tiempo_fin_tmp.onEnterFrame = function () {
	
		this.posicion_x = fn_mat_centro_en_rango ( { largo : gf_tiempo_fin._width , rango : [ 0 , _root._width ] } ) ;
		this.posicion_y = fn_mat_centro_en_rango ( { largo : gf_tiempo_fin._height , rango : [ 0 , _root._height] }) ;
		
		gf_tiempo_fin._x = this.posicion_x;
		gf_tiempo_fin._y = this.posicion_y;
		
		gf_tiempo_fin.swapDepths( gf_tiempo_fin._parent.getNextHighestDepth ( ) ) ;
		
	}
	/*	*/
}
function fn_gf_tiempo_fin_matar ( ) {
	var soy_fn="fn_gf_tiempo_fin_matar" ;
	removeMovieClip ( this.gf_tiempo_fin ) ;
	removeMovieClip ( this.gf_tiempo_fin_tmp ) ;
}
function fn_limpiar_eventos(param){
	var soy_fn="fn_limpiar_eventos";
	/*
	Elimina eventos de un listado de movieclips basado en nombre+N
	Si no se define el entorno (ruta) toma el _root
	
	fn_limpiar_eventos({
		nombre_mc: String,
		ruta: MovieClip,
		listado: Array
	});
	
	_root.atril.ficha0.onRelease = soltar ;
	_root.atril.ficha1.onRelease = soltar ;
	_root.atril.ficha2.onRelease = soltar ;
	
	Ej:
		fn_limpiar_eventos({
			nombre_mc: 'ficha',
			listado: [1,2],
			ruta: _root.atril
		});
		
		tracer_lib(soy_fn,_root.atril.ficha0.onRelease) // => soltar
		tracer_lib(soy_fn,_root.atril.ficha1.onRelease) // => null
	
	NOTA MEJORAS: agregar la posibilidad de rango (ver la funcion que explora propiedades de mc.
	*/
	
	tracer_fi("fn_limpiar_eventos",param);
	
	var nombre_mc = param.nombre_mc;
	var listado = param.listado;
	var ruta = param.ruta;
	
	if(ruta=="") {
		// modo EVAL STRING 
		
		tracer_lib(soy_fn," ** modo EVAL STRING  ** ");
		
		for(var n in listado){
			fn_limpiar_eventos_mc({
				nombre_mc: nombre_mc+listado[n],
				ruta: ""
			});
		}
	
	} else {
		// modo OBJECT + STRING
	
		tracer_lib(soy_fn," ** modo OBJECT + STRING ** ");
		
		if(ruta==undefined || ruta == null) ruta=_root;
		
		for(var n in listado){
		fn_limpiar_eventos_mc({
			nombre_mc: nombre_mc+listado[n],
			ruta: ruta
			});
		}
	}

	tracer_ff("fn_limpiar_eventos",salida);
}

function fn_limpiar_eventos_mc(param){
	var soy_fn="fn_limpiar_eventos_mc";
	/*
	Elimina eventos de un sólo movieclip en un entorno 
	Si no se define el entorno (ruta) toma el _root
	
	fn_limpiar_eventos_mc({
		nombre_mc: String,
		ruta: MovieClip
	});
	
	Ej.
		_root.mis_fichas.ficha0.onEnterFrame = contar;
	
		fn_limpiar_eventos_mc({
				nombre_mc: 'ficha0',
				ruta: _root.mis_fichas
		});	
	
	NOTA MEJORAS: eliminar todos los eventos o grupos, o uno en particular.
		(Consultar API)
	*/
	
	tracer_fi("fn_limpiar_eventos_mc",param);
	
	var nombre_mc = param.nombre_mc;
	var ruta = param.ruta;
	
	if(ruta=="") {
		// modo EVAL STRING 
		
		tracer_lib(soy_fn," ** modo EVAL STRING  ** ");
		var mc = eval (nombre_mc);
	} else {
		// modo OBJECT + STRING
	
		tracer_lib(soy_fn," ** modo OBJECT + STRING ** ");
		
		if(ruta==undefined || ruta == null) ruta=_root;
		var mc = ruta[nombre_mc];
		
	}
	tracer_lib(soy_fn,"mc = "+ mc);
	
	mc.onPress = null;
	mc.onRollOut = null;		
	mc.onRollOver = null;
	mc.onRelease = null;
	mc.onReleaseOutside = null;
	mc.onDragOut = null;
	mc.onDragOver = null;
	mc.onKeyDown = null;
	mc.onKeyUp = null;
	mc.onMouseDown = null;
	mc.onMouseUp = null;
	mc.onEnterFrame = null;
	mc.onLoad = null;
	
	tracer_ff("fn_limpiar_eventos_mc","");
	
}

function fn_matar_mc (e){

	/*
	Elimina una serie de moviclips basado en nombre+n
	Devuelve el listado de objetos al terminar
	
	fn_matar_mc ({
		nombre: String || Array,
		rango: Array,
		listado: Array
	});
	
	Ej.:
	
	// eliminas las fichas del 1 al 9 (este es un error que hay que corregir)
	fn_matar_mc ({
		nombre: "ficha",
		rango: [1,10],
	});
	
	// elimina las fichas 1,4,5,6
	fn_matar_mc ({
		nombre: "ficha",
		listado: [1,4,5,6],
	});
	
	*/

	var soy_fn = "fn_matar_mc";
	tracer_fi ( soy_fn,e );
	
	var rango = e.rango;
	var nombre = e.nombre;
	var listado = e.listado;
	
	tracer_lib(soy_fn,"fn_tipo_dato(nombre) "+fn_tipo_dato(nombre));
	
	if ( fn_tipo_dato(nombre)=="str" ) nombre = [ nombre ];
	if ( listado==undefined ) listado = fn_array_lineal ( { rango: [ rango [ 0 ] , rango [ 1 ] ] } );
	
	tracer_lib(soy_fn,"nombre "+ver(nombre));
	tracer_lib(soy_fn,"listado "+ver(listado));
	
	var salida = [];
	var mc;
	for (var n=0; n<listado.length; n++) {
		for (var m=0; m<nombre.length; m++) {
		
			tracer_lib(soy_fn,"nombre["+m+"] "+nombre[m]);
			tracer_lib(soy_fn,"listado["+n+"] "+listado[n]);
			
			mc = eval(nombre[m]+listado[n]);
			
			tracer_lib(soy_fn,"mc "+mc);
			
			salida[salida.length] = nombre[m]+listado[n];
			mc.removeMovieClip();
		}
	}
	
	tracer_ff(soy_fn,salida);
	return salida
}// borra los movieclips dinamicos
// se le podria pasar el parametro en que mc en vez del root
/*
function fn_matar_mc_dinamicos(e){

	if (!(e)) return null;
	var salida = [];
	for (var mc in eval(e.mc) ) {
		if (typeof(eval(mc)) == "movieclip") {
				salida [salida.length] = String(eval(mc));
				eval(mc).removeMovieClip();
			}
	}
	return salida
	//trace ("salida = "+ver(salida));
}*/

function fn_matar_mc_dinamicos(){
	var soy_fn="fn_matar_mc_dinamicos";
	tracer_fi(soy_fn,param);
	
	var salida = [];
	for (var mc in _root ) {
		if (typeof(eval(mc)) == "movieclip") {
				salida [salida.length] = String(eval(mc));
				eval(mc).removeMovieClip();
			}
	}
	
	tracer_ff(soy_fn,salida);
	
	return salida
}
function fn_mc_ganar () {
	var soy_fn="fn_mc_ganar";
	 fn_mc_ganar_matar ();
	// crea el MovieClip de festo de victoria
	_level0.createEmptyMovieClip('gf_ganar', _level0.getNextHighestDepth()); 
	loadMovie("graficos/ganar.swf", _level0.gf_ganar);
}

function fn_mc_ganar_matar () {
	var soy_fn="fn_mc_ganar_matar";
	removeMovieClip('_level0.gf_ganar');
}
function fn_parche_ayuda (){
	/* oculta el cartel de ganar si ponemos la ayuda en los juegos donde esta todo contenido en un movieclip. Ej.: tangram, mr_sabio, rush_hour, domino */
	this.createEmptyMovieClip("parche_ayuda_mc",this.getNextHighestDepth());
	parche_ayuda_mc.onEnterFrame = function(){
		if(ayuda._currentframe!=1){
			_level0.gf_ganar._visible = false;
		} else {
			_level0.gf_ganar._visible = true;
		}
	}
}
/*
30/5/2010
Actualizada fn_mc_ganar_matar agregando _level0 porque en ocaciones no lo mata
si el juego esta dentro de otro mc.

*/

function fn_mc_titila (e){
	/*
	Genera un loop de X vueltas y pinta alternando un MC
	
	fn_mc_titila({
		mc_nombre: String,
		listado: Array,
		color_transforma: {
			ra: 100, rb: 10, 
			ga: 70, gb: 0, 
			ba: 70, bb: 0, 
			aa: 100, ab: 0
		},
		tiempo: Number,
		vueltas: Number,
		ini: Boolean,
		funcion: Function,
		e: Cualquiera
	});
	
	*/
	if(e.ini==false) e.vueltas--;
	if(e.vueltas > 0){
		var que_color = fn_es_par(e.vueltas)?{ra:100,rb:0,ga:100,gb:0,ba:100,bb:0,aa:100,ab:0}:e.color_transforma;
		marcar_fichas({
			mc_nombre:e.mc_nombre,
			listado: e.listado,
			color_transforma: que_color
		});
		fn_tiemp_dispara (e.tiempo , fn_mc_titila , {
				mc_nombre:e.mc_nombre,
				listado: e.listado,
				color_transforma: e.color_transforma,
				tiempo: e.tiempo,
				vueltas: e.vueltas,
				ini: false,
				funcion: e.funcion,
				e: e.e
			}
		);
	} else {
		e.funcion(e.e);
	}

}
function fn_mezclar_mc (param){
	var soy_fn="fn_mezclar_mc";
	/*
	Intercambia las coordenadas de un listado de MovieClips al azar
	Usando nombre+N
	
	fn_mezclar_mc ({
		nombre_mc: String,
		rango: [min,max],
		listado: Array,
		ruta: MovieClip
	});
	
	ficha0 (x:10,y:10)
	ficha1 (x:20,y:20)
	ficha2 (x:30,y:30)
	ficha3 (x:40,y:40)
	
	fn_mezclar_mc ({
		nombre_mc: 'ficha',
		rango: [0,3],
		ruta: _root
	});
	
	ficha0 (x:30,y:30)
	ficha1 (x:10,y:10)
	ficha2 (x:40,y:40)
	ficha3 (x:20,y:20)
	
	*/

	tracer_fi("fn_mezclar_mc",param);
	
	var nombre_mc = param.nombre_mc;
	var rango = param.rango;
	var listado = param.listado;
	var ruta = param.ruta;
	
	if(listado && rango==undefined){
		tracer_lib(soy_fn,"Solo listado");
		rango = [ 0, listado.length-1]
	}
	
	if(ruta==undefined || ruta == null) ruta=_root;
	
	// obtenemos el listado de propiedades
	var propiedades_originales = fn_propiedades_mc ({
		nombre_mc: nombre_mc,
		rango: [rango[0],rango[1]],
		listado:listado,
		ruta: ruta,
		accion: 'tomar'
	})

	var propiedades_mezcladas = fn_mezclar_array({matriz: propiedades_originales});
	
	var salida = fn_propiedades_mc ({
		nombre_mc: nombre_mc,
		rango: [rango[0],rango[1]],
		listado:listado,
		ruta: ruta,
		accion: 'poner',
		poner_propiedades: propiedades_mezcladas
	});
	
	tracer_ff("fn_mezclar_mc",salida);
}

function fn_propiedades_mc(param){
		var soy_fn="fn_propiedades_mc";
	/*
	Devuelve una matriz con las propiedades 
	o
	establece las propiedades
	de un rango de MovieClips
	
	fn_propiedades_mc ({
		nombre_mc: String,
		rango: Array,
		listado: Array,
		ruta: ruta
		accion: String 'tomar' || 'poner'
		poner_propiedades: Array
	})
	
	salida = [ {propiedades} ]
	
	
	PARAMETROS
	
	nombre_mc: texto con el nombre base de los MovieClips a mezclar
	
	rango: matriz con el min y max
	listado: matriz con los valores de los numeros de mc a intercambiar
	
	accion: 'tomar' || 'poner' indica QUE debe hacerse con las propiedades
		de los MovieClips, si tomar los valores y devolver una
		
	poner_propiedades: una matriz combinada con objetos para establecer las
		propiedades cuando se usa la accion 'poner'

		
	FUNCIONES MULTIPLES
	
	rango y listado se pueden usar solos o combinados
	
	solo rango
		recorre todos los MovieClips desde min a max, incluidas las puntas
		
			for n rango[min,max]
			_root[ nombre_mc + n ]
			
		ej:
			rango = [2,4]
			_root[ nombre_mc + 2 ]
			...
			_root[ nombre_mc + 4 ]
	
	solo listado
		recorre todos los MovieClips utilizando los valores
		contenidos en la matriz como indices
			
			for n listado.length
			_root[ nombre_mc + listado[n] ]
		ej:
			listado = [1,11,5,42,7,3]
			_root[ nombre_mc + 1 ]
			_root[ nombre_mc + 11]
			...
			_root[ nombre_mc + 3 ]
	
	combinados
		recorre todos los valores de listado entre los indices min y max
		
		ej:
			listado=[ 1,11, 5,42, 7, 3]
			          0  1  2  3  4  5
			                |_____|
			rango = [2,4] ---->|
			
			_root[ nombre_mc + 5 ]
			_root[ nombre_mc + 42]
			_root[ nombre_mc + 7 ]
			
	*/
	
	tracer_fi("fn_propiedades_mc",param);
	
	var nombre_mc = param.nombre_mc;
	var rango = param.rango;
	var listado = param.listado;
	var ruta = param.ruta;
	var accion = param.accion;
	var poner_propiedades = param.poner_propiedades;
	
	if(listado && rango==undefined){
		tracer_lib(soy_fn,"Solo listado");
		rango = [ 0, listado.length-1]
	}
	
	if(ruta==undefined || ruta == null) ruta=_root;
	
	var salida = [];
	var ss = 0;
	for(var n = rango[0]; n < rango[1]+1; n++){
	
		var nro = n;
		
		if(listado) nro = listado[n]
		
		var mc = ruta[nombre_mc+nro];
		
		if(accion == 'poner'){
			tracer_lib(soy_fn,"ponemos propiedad");
			
			mc._x = poner_propiedades[ss].x;
			mc._y = poner_propiedades[ss].y;
			
			/* PODRIAN IR OTRAS PROPIEDADES */
		}
		
		tracer_lib(soy_fn,"mc = "+mc+" x = "+mc._x+" y = "+mc._y);
		
		salida[ss]= new Object();
		salida[ss].x = mc._x;
		salida[ss].y = mc._y;
		
		tracer_lib(soy_fn,"salida [ "+ss+" ]= "+ver(salida[ss]) );
		
		ss++;
	}
	
	tracer_ff("fn_propiedades_mc",salida);
	return salida
}// NUEVO 10/1/2010 - copiado del neuronas.as
//_root.fotograma_azar(this);
fotograma_azar = function (mc){
	var soy_fn="fotograma_azar";
	// selecciona un fotograma al azar en el movieclip indicado y salta el cabezal hacia este.
	mc.gotoAndStop(fn_azar([1,mc._totalframes]));
}

var var_fn_auto_calidad1, var_fn_auto_calidad

function fn_auto_calidad () {
	fn_tiemp_dispara ([0,2], function () {
		var_fn_auto_calidad = new Date().getTime();
		tx = var_fn_auto_calidad - var_fn_auto_calidad1;
		_quality = (tx>100) ? "MEDIUM" : "HIGH";
		var_fn_auto_calidad1 = var_fn_auto_calidad;
		fn_auto_calidad ();
	});
}
function fn_compara (e){

	trace (e);
	var comparadores = "<=,>=,==,!=,<,>";
	var BD_comparadores = comparadores.split(",");
	trace (BD_comparadores);
	/* La idea recorres el parametro e y separar los 2 terminos buscando un comparador
	si no encuentra ninguno devuelve NaN
	Si encuentra un comparador sale del bucle y luego realiza la comparacion
	*/
	var error = true;
	for ( var n = 0; n < BD_comparadores.length ; n++) {
		trace (BD_comparadores [n]);
		var tmp_partes = e.split ( BD_comparadores [n] );
		trace (tmp_partes);
		if (tmp_partes.length == 2) {
			error = false;
			var termino_1 = fn_siosi (tmp_partes[0]);
			var el_comparador = BD_comparadores [n];
			var termino_2 = fn_siosi(tmp_partes[1]);
			trace ("termino_1 = "+termino_1);
			trace ("el_comparador = "+el_comparador);
			trace ("termino_2 = "+termino_2);
			break;
		}
	}
	
	if (error==true) return NaN;
	
	var salida = false;
	switch (el_comparador) {
		case "<": salida = termino_1 < termino_2;break;
		case "<=": salida = termino_1 <= termino_2;break;
		case ">": salida = termino_1 > termino_2;break;
		case ">=": salida = termino_1 >= termino_2;break;
		case "==": salida = termino_1 == termino_2;break;
		case "!=": salida = termino_1 != termino_2;break;
	}
	return salida
}
function fn_siosi (e){
	trace ( "siosi "+e+" typeof "+typeof(e) );
   return( e.substr(0,1)=='"' || e.substr(0,1)=="'" || String(Number(e)) == Number(e))?e: eval(e);
}
function fn_tipo_dato(e){
	var salida = [];
	
	// CONVERSION PARA ACTION SCRIPT
	var tipo = typeof(e);
	salida['string']="str";
	salida['number']="num";
	salida['object']="obj";
	salida['array']="arr";
	salida['boolean']="boo";
	salida['movieclip']="mov";
	salida['function']="fun";
	
	// en AS las matrices son tratadas como objetos.
	if(e.length && tipo=="object") tipo = "array";
	// <<< AS
	
	return salida[tipo] ;
}

/*
trace ("tipo 1 "+fn_tipo_dato(1));
trace ("tipo '1' "+fn_tipo_dato('1'));
trace ("tipo [1,2] "+fn_tipo_dato([1,2]));
trace ("tipo {a:2} "+fn_tipo_dato({a:2}));
trace ("tipo true "+fn_tipo_dato(true));
*/function es_par(numero){
	var soy_fn="es_par";
	return (Math.floor(numero/2)==numero/2);
}
function fn_azar (rango) {
	var soy_fn="fn_azar";
	//El rango determina el numero minimo al maximo posible para Aleatorio
	return Math.round((Math.random()*(rango[1]-rango[0])) + rango[0]);
}

// este es mi parche de azar para el de martin >>>
function azar(min, max) {
    return fn_azar ([min, max]); 
}
function fn_es_par(numero){
	var soy_fn="fn_es_par";
	// revuelve true si es un numero par
	return (Math.floor(numero/2)==numero/2);
}/*
var fn_desvanecer_audio = function(obj_snd:Sound,vol_fin){
	tracer_lib(soy_fn,"fn_desvanecer_audio:");
	tracer_lib(soy_fn,this.obj_snd);
	this.createEmptyMovieClip("mixer",this.getNextHighestDepth());
	this.mixer.obj_snd = this.obj_snd;
	this.mixer.vol_fin = this.vol_fin;
	this.mixer.vol_ini = this.obj_snd.getVolume();
	
	this.mixer.onEnterFrame = function(){
		this.dif = ( this.vol_fin - this.vol_ini ) / 1.6;
		
		this.vol = this.obj_snd.getVolume() + this.dif;
		
		this.obj_snd.setVolume(this.vol);
		
		if ( this.dif > -1 && this.dif < 1 ) {
			this.obj_snd.setVolume(this.vol_fin);
			this.onEnterFrame = null;
			removeMovieClip(this);
		}
		
	}
}
*/
var fn_desvanecer_audio = function(vol_fin,velocidad){
	var soy_fn="fn_desvanecer_audio";
	
	tracer_lib(soy_fn,"fn_desvanecer_audio: ( "+vol_fin+" , "+velocidad+" )");
	_root.createEmptyMovieClip("mixer",_root.getNextHighestDepth());
	
	_root.mixer_vol_fin = vol_fin;
	_root.mixer_velocidad = velocidad;
	
	tracer_lib(soy_fn,"_root.mixer_vol_fin "+_root.mixer_vol_fin);
	tracer_lib(soy_fn,"_root.mixer_velocidad "+_root.mixer_velocidad);
	
	_root.mixer.onEnterFrame = function(){

		_root.mixer_vol = _root.musica.getVolume();
		_root.mixer_dif = ( _root.mixer_vol_fin - _root.mixer_vol ) / _root.mixer_velocidad;
		
		tracer_lib(soy_fn,"mixer: "+_root.mixer_vol+" "+_root.mixer_dif);
		_root.mixer_vol += _root.mixer_dif;
		
		_root.musica.setVolume(_root.mixer_vol);
		
		if ( Math.abs(_root.mixer_dif) < 1 ) {
			tracer_lib(soy_fn,"mixer: FIN");
			_root.musica.setVolume(_root.mixer_vol_fin);
			this.onEnterFrame = null;
			removeMovieClip(this);
		}
	}
}
function fn_fade_sonido(e){
	// cambia de manera progresiva el sonido para hacer fade in y out
	
	// por defecto hace FADE IN, pone el volumen a cero y sube a 100
	/*
		fn_fade_sonido ({
			sonido: Object,
			direccion: String, //  "in" || "out"
			volumen: Number,
			volumen_limite: Number,
			factor: Number, // 2.5 x defecto
			funcion: Function, // funcion a dispara cuando termine el fade (opcional)
			e: Cualquiera // parametros para la funcion (opcional)
		});
	*/
	
	trace(" FADE e = "+ver(e));
	
	var sonido = e.sonido;
	
	var direccion = e.direccion==undefined?"in":e.direccion;
	var signo = direccion=="in"?1:-1;
	
	var volumen = ( e.volumen==undefined && direccion=="in" ) ? 1 : e.volumen; // para hacer el fade in por defecto ponemos el volumen a cero
	
	// si no de define el volumen limite se pone 100 para cuando es "in" o' 0 (cero) para cuando es "out"
	var volumen_limite = e.volumen_limite!=undefined ? e.volumen_limite : direccion=="in" ? 100 : 0 ;
	
	var factor = e.factor==undefined ? 2.5 : e.factor;
	
	trace ("direccion "+direccion);
	trace ("signo "+signo);
	trace ("volumen "+volumen);
	trace ("volumen_limite "+volumen_limite);
	trace ("factor "+factor);
	
	volumen+= (volumen/factor)*signo;
	sonido.setVolume(volumen);
	
	if(
	(volumen < volumen_limite && direccion=="in")
	||
	(volumen > volumen_limite && direccion=="out")
	) {
		e.volumen = volumen;
		e.direccion = direccion;
		e.volumen_limite = volumen_limite;
		e.factor = factor;
		
		fn_tiemp_dispara(3,fn_fade_sonido,e);
		
	} else {
	
		sonido.setVolume(volumen_limite);
		e.funcion(e.e);
		
	}
}
function fn_mute() {
	var soy_fn="fn_mute";
	_level0.audio_global.setVolume(0);
	// _level0.mute = true;
	// de momento no se está usando
}
function fn_mute_mata() {
	var soy_fn="fn_mute_mata";
	_level0.audio_global.setVolume(100);
	// _level0.mute = false;
	// de momento no se está usando
}
function fn_sonido(nombre_mp3, array) {
	soy_fn="fn_sonido";
	// if(_level0.mute == true) return; // si esta en mute se va // De momento no se está usando
/*
	array:
		0: delay - NO esta aplicado todabia el sistema de Delay
			// el loop es eterno podria tener tambien una cantidad de loops
		1: repeticiones (true, false)
		TODAVIA NO FUNCIONA
*/

	sonido_mc = new Sound();
	sonido_mc.onLoad = function(success) {
		if (success) {
			if(array[1] == true) loop = 999; else loop = array[1];
			if(array[1]) sonido_mc.start(0, loop); else sonido_mc.start();
			//fn_tiemp_dispara (Math.floor((sonido_mc.duration/1000)*24), function () {sonido_mcfn_sonido(nombre_mp3);}) //delay
		}
	};
	
	sonido_mc.loadSound("sonidos/"+nombre_mp3+".mp3", false);	// ejemplo fn_sonido('burbuja/burbuja1'); usado en asteroides.swf
	
	// parche para la musica
	var tmp = [];
	tmp = nombre_mp3.split("/");
	if(tmp[0]=="musica"){
		//_root.musica.setVolume(0);
		//fn_desvanecer_audio(100,5);
	}
	return sonido_mc;
}
function fn_sonido_bien() {
	var soy_fn="fn_sonido_bien";
	fn_sonido("bien/bien"+fn_azar([0,3]),[3,0]);
}	
function fn_sonido_mal(){
	var soy_fn="fn_sonido_mal";
	fn_sonido("error/error"+fn_azar([0,3]),[3,0]);
}
var matar_musica = function(){
	var soy_fn="matar_musica";
	_root.mixer.removeMovieClip();
	_root.musica.stop();
	_root.musica = null;
}
function fn_str_replace(e) {
	/*
	fn_str_replace( { 
		buscar[String/Number]: palabra a buscar, 
		replazar[String/Number]: palabra a remplazar, 
		texto[String/Number]: texto general
	});
	*/

	if(typeof(e.buscar)=='object'){
		for (n=0; n < e.buscar.length; n++) e.texto = e.texto.split(e.buscar[n]).join(e.replazar);
		return e.texto;
	} else {
		array = e.texto.split(e.buscar);
	}
	
	return array.join(e.replazar)
} 

function fn_strtolower(e) {
	/*
	Devuelve una cadena en MINUSCULAS (LOWERCASE)
	
	fn_strtolower (String);
	
	*/
trace("fn_strtolower");
	if(typeof(e)=='string'){
		return e.toLowerCase();
	} else {
		return e;
	}
}
function fn_strtoupper(e) {
	/*
	Devuelve una cadena en MAYUSCULAS (UPPERCASE)
	
	fn_strtoupper (String);
	
	*/
trace("fn_strtoupper");
	if(typeof(e)=='string'){
		return e.toUpperCase();
	} else {
		return e;
	}
} 

function fn_unicode (e) {
	if (e.inversa == true ) {
		txt = e.txt;
		 /*
			unicode a la inversa
				
				fn_unicode ({
						txt: texto
						inversa:true
				})
		 
		 
		 */
	} else {
		txt = e;
	}

		if (txt == Number(txt)) return txt
		
remplazar = [	"a'",
				"e'",
				"i'",
				"o'",
				"u''",
				"u'",
				"n'",
				"?'",
				"!'",
				'\n\\'
				];
				
por = [			 chr(225),
				 chr(233),
				 chr(237),
				 chr(243),
				 chr(252),
				 chr(250),
				 chr(241),
				 chr(191),
				 chr(161),
				 chr(10)
				];
				/*
				por = [			 String.fromCharCode(225),
				 String.fromCharCode(233),
				 String.fromCharCode(237),
				 String.fromCharCode(243),
				 String.fromCharCode(252),
				 String.fromCharCode(250),
				 String.fromCharCode(241),
				 String.fromCharCode(191),
				 String.fromCharCode(161),
				 String.fromCharCode(10)
				];
				*/
				/*
					a="\n"
					trace (a.charCodeAt(0));
				*/
			if (e.inversa == true )  {
					remplazar_tmp= fn_copiar_array({matriz: remplazar});
					remplazar = por;
					por = remplazar_tmp;
			}
	for (k=0; k < remplazar.length; k++){
		txt = fn_str_replace( { buscar: remplazar[k], replazar:por[k], texto: txt});
		txt = fn_str_replace( { buscar: remplazar[k].toUpperCase(), replazar: por[k].toUpperCase(), texto: txt});	
	}
	return txt;
}

	function fn_mimo_mc (mc1, mc2) {
	var soy_lib = "fn_mimo_mc";
	// promover a libs
	/*
		esta funcion clona las caracteristicas internas de un Mclip con otro, 
		Se usa para el drag grafico, intentar no usar para soluciones visuales.
	*/
	tracer_lib (soy_lib,"obj: "+mc1 + " -> " + mc2);
	
	// --------propiedades que imita-----------
	mc2.gotoAndStop (mc1._currentframe);
	mc2._visible =  mc1._visible;
	mc2.txt = mc1.txt;
	
	//-------- aplica esta misma funcion de modo recursivo solo a MClips---------
	//for (obj in mc1) if (eval("mc1."+obj)._currentframe) fn_mimo_mc (eval("mc1."+obj), eval("mc2."+obj)); else mc2.obj = mc1.obj;

} 
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
	
}_root.sostiene = false; // esta puede interferir con el drag realizado con programacion, comprobar
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
function ang_gra(param) {
	var soy_fn="ang_gra";
	// Convierte radianes en grados.

	var angRadianes = param.angRadianes;
	tracer_lib(soy_fn,"angGrados(angRadianes:"+angRadianes+")");
	var angGrados = angRadianes*(180/Math.PI);
	tracer_lib(soy_fn,"angGrados = "+angGrados);
	return angGrados;
}
function ang_rad(param) {
	var soy_fn="ang_rad";
	// Convierte grados en radianes.
	
	var angGrados = param.angGrados;
	tracer_lib(soy_fn,"angRadianes (angGrados:"+angGrados+")");
	var angRadianes = angGrados*(Math.PI/180);
	tracer_lib(soy_fn,"angRadianes = "+angRadianes);
	return angRadianes;
}

function anguloCosenico(param) {
	var soy_fn="anguloCosenico";
	// Obtiene un angulo en función del coseno y seno.
	var xdif = param.xdif;
	var ydif = param.ydif;
	var anguloC = Math.round(ang_gra({angRadianes:Math.atan2(xdif, ydif)}));
	return anguloC;
}
function angulo_arco(param) {
	var soy_fn="angulo_arco";
	// Obtienen un angulo en función del arco y radio.
	
	
	var arco = param.arco;
	var radio = param.radio;
	var anguloA = Math.round(ang_gra({angRadianes:arco/radio}));
	return anguloA;
}
function cosenico(param) {
	var soy_fn="cosenico";
	// Obtiene las longitudes de los lados opuestos a la hipotenusa
	// en un triangulo dados el radio (hipotenusa) y angulo
	// tomando como referencia el sistema de coordenadas
	
	// Devuelve los valores a través de un objeto
	// el modo de llamarla es: 

	// objeto = cosenico({angulo, radio});
	
	// entonces el objeto contendrá los valores
	// en sus propiedades:
	
	// objeto.dx_cos
	// objeto.dy_sen

	var angulo = param.angulo;
	var radio = param.radio;
	
	tracer_lib(soy_fn,"cosenico ("+angulo+","+radio+")");


	var valores = new Object();
	valores.dx_cos = Math.floor(Math.cos(ang_rad({angGrados:angulo}))*radio);
	valores.dy_sen = Math.floor(Math.sin(ang_rad({angGrados:angulo}))*radio);
	tracer_lib(soy_fn,"valores.dx_cos = "+valores.dx_cos);
	tracer_lib(soy_fn,"valores.dy_sen = "+valores.dy_sen);
	return (valores);
}
function distancia_2puntos(param) {
	var soy_fn="distancia_2puntos";
	// Calcula la distancia entre 2 puntos
	// (teorema de Pitagoras)

	var x1 = param.pto1.x;
	var y1 = param.pto1.y;
	var x2 = param.pto2.x;
	var y2 = param.pto2.y;

	var dpx = x2-x1;
	var dpy = y2-y1;

	var distanciaPuntos = Math.round(Math.sqrt((dpx*dpx)+(dpy*dpy)));
	return distanciaPuntos;
}
//include ("array.js");

//tracer_lib(soy_fn,'------------------------------------');
//tracer_lib(soy_fn,'     Funciones para juegos PC3');
//tracer_lib(soy_fn,'------------------------------------');

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


//-------- esto molestaba ------- sinapsis-js
//u.gotoAndStop(1);
//d.gotoAndStop(1);

var mostrar_numero = function(num){
	unidad = num - (Math.floor(num/10)*10);
	decena = (num - unidad - (Math.floor(num/100)*100))/10;
	u.gotoAndStop(unidad+1);
	d.gotoAndStop(decena+1);
}


PIX = (Math.PI/180)



/*----------Tiempo del juego ----------*/

/* --- funciones que se deben pisar y adecuar a cada proyecto --- */

/*	esto jodia sinapsis-js
mi_color = new Color(this);
mi_color_halo = new Color(this._parent.halo);
mi_color_halo.setRGB(0xffffff);


la_paleta = new Array();
a = 0;

for (var el_color in this.paleta){
	pick_color = new Color(this.paleta[el_color]);
	la_paleta[a] = pick_color.getRGB();
	a++;
}

azar = Math.floor(Math.random()*la_paleta.length);
mi_color.setRGB(la_paleta[azar]);
*/

//------------------------------

//var que_hora = this._parent.que_hora;

var actualizar_hora = function () {

	que_hora = tiempo_actual.getHours();
	que_minuto = tiempo_actual.getMinutes();

	this.hora.mostrar_numero(que_hora);
	this.minutero.mostrar_numero(que_minuto);
}
var marcar_segundos = function () {
	this.segundero._visible = !(this.segundero._visible);
}
/*	jode con sinapsis-js

if (que_hora == null && que_hora == undefined){
	var tiempo_actual = new Date();
	actualizar_hora();
	actualizar_hora_ID = setInterval(this,"actualizar_hora",500);
	marcar_segundos_ID = setInterval(this,"marcar_segundos",500);
}
*/
// relojeria

// especifico de neuronas

/* jodia para sinapsis-js
var que_hora = this._parent.que_hora;
*/

var que_hora = 0
var hora = 0

var actualizar_hora = function () {

	que_hora = tiempo_actual.getHours();
	que_minuto = tiempo_actual.getMinutes();

	if(que_hora>11){
		que_hora-=12;
	}
	this.hora._rotation = (360/12)*que_hora;
	this.minutero._rotation = (360/60)*que_minuto;
}
/* jode con sinapsis-js

if (que_hora == null){
	var tiempo_actual = new Date();
	actualizar_hora();
	actualizar_hora_ID = setInterval(this,"actualizar_hora",60000);
}
*/

this.onRelease = function(){
	tracer_lib(soy_fn,"Probando")
	tecla = Number(this._name.substr(1)); // tomamo el valor dela tecla
	_root.procesar_teclas(tecla);
}

this.onKeyDown = function(){
	tracer_lib(soy_fn,'tecla es:'+tecla);
	tecla = Key.getCode();
	procesar_teclas(tecla);
}

/*	jode con sinapsis-js
Key.addListener(this);
*/
