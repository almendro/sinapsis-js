// relojeria

// especifico de neuronas

var que_hora = this._parent.que_hora;

var actualizar_hora = function () {

	que_hora = tiempo_actual.getHours();
	que_minuto = tiempo_actual.getMinutes();

	if(que_hora>11){
		que_hora-=12;
	}
	this.hora._rotation = (360/12)*que_hora;
	this.minutero._rotation = (360/60)*que_minuto;
}

if (que_hora == null){
	var tiempo_actual = new Date();
	actualizar_hora();
	actualizar_hora_ID = setInterval(this,"actualizar_hora",60000);
}
