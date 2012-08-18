function fn_forma(MC:String, puntas:Number, largo:Number, caracteristicas:Array) {
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