function fn_pausar_tiempo ( e ) {
	/*
	Pausa o reanuda el cronometro del timer
	
	Si no recibe para'metros se comporta como un switcher on|off
	
	La primera vez que se llame verifica si ya existe la variable de estado, en cuyo caso la primera vez la define pausando el juego, o sea, supone que el tiempo ya esta corriendo.
	
	Puede recibir true o false
	*/
	
		_level0.juego_en_pausa = e!=undefined?e:!(_level0.juego_en_pausa)? true : !_level0.juego_en_pausa ;

}