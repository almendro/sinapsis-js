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
