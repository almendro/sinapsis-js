function ver(param:Object,nivel:Number):String{

	var tabular,tabulacion,nro_elementos,tipo,salida,nro_actual,p,elemento,tipo_p,tabular_cierre,nivel;	
	
	if(nivel!=Number) var nivel=1;
	
	if(typeof(param)=='object'){
	/* 	Devuelve una cadena (String)
		de un 'trace' especialmente formateado para objetos y arrays
	
	param: 	puede ser cualquier tipo objeto (Objecto, Array, MovieClip, Button)
	
	nivel: 	indica el nivel de anidamiento actual, necesario
			para para las tabulaciones cuando hay más de un nivel de profundidad
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
	return salida;
	
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

