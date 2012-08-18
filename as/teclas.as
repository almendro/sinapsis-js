this.onKeyDown = function(){
	tracer_lib(soy_fn,'tecla es:'+tecla);
	tecla = Key.getCode();
	procesar_teclas(tecla);
}

Key.addListener(this); // se activa
