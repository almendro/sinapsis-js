// relojería

var que_hora = this._parent.que_hora;

var actualizar_hora = function () {

	que_hora = tiempo_actual.getHours();
	que_minuto = tiempo_actual.getMinutes();

	this.hora.mostrar_numero(que_hora);
	this.minutero.mostrar_numero(que_minuto);
}
var marcar_segundos = function () {
	this.segundero._visible = !(this.segundero._visible);
}
if (que_hora == null && que_hora == undefined){
	var tiempo_actual = new Date();
	actualizar_hora();
	actualizar_hora_ID = setInterval(this,"actualizar_hora",500);
	marcar_segundos_ID = setInterval(this,"marcar_segundos",500);
}
