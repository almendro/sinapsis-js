

function fn_progresion (cantidad:Number, rango:Array, progresion:Array, negativo:Boolean) {
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
	var salida:Array = new Array(); 

	salida[0] =  fn_azar ([rango[0],rango[1]]);  //esta ecuacion aparece anteriormente en GC
	if (rango[1]== rango[0]) salida[0] =rango[0] // esto sive para definir  progresiones concretas
	salida[0] = salida[0]==0?1:salida[0];

	for (n=1; n < cantidad ; n++) {
		salida[n] = ((salida[n-1] + progresion[0]) * progresion[1] )+ progresion[2] * progresion[3];
		tracer_lib(soy_fn,"Progresion ---> "+salida[n]);
	}
  
	return salida; //devuelve una cadena progresiva

}


