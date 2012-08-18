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

	return salida;
}//<<< fn_perimetro_maximo