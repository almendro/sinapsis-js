// display_digital_par.as

/*
2009/09/19

Muestra 2 dígitos en un display digital de 8 leds
*/

u.gotoAndStop(1);
d.gotoAndStop(1);

var mostrar_numero = function(num){
	unidad = num - (Math.floor(num/10)*10);
	decena = (num - unidad - (Math.floor(num/100)*100))/10;
	u.gotoAndStop(unidad+1);
	d.gotoAndStop(decena+1);
}