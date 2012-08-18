
function fn_GC (respuesta:Number, elementos:Array, cantidad:Number, repite:Boolean) {
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
	
	
			
	var salida:Array = new Array(); 
	
	


	if (elementos.length == 2) { // SOLO PARA RANGO
		// Genera una array que contiene todos los elementos desde elementos[0] a elementos[1] 
		var elementos1:Array = new Array(); 
		i=0;
		for (n=elementos[0]; n < (elementos[1]+1); n++) {
		 elementos1[i]=n;
		 i++;
		}

		elementos = elementos1;

	}
		
	
	var usados:Array = new Array(); 
		
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
	
	return salida;
} 

