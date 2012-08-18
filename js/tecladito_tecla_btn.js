this.onRelease = function(){
	tracer_lib(soy_fn,"Probando")
	tecla = Number(this._name.substr(1)); // tomamo el valor dela tecla
	_root.procesar_teclas(tecla);
}

