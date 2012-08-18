// NUEVO 10/1/2010 - copiado del neuronas.as
//_root.fotograma_azar(this);
fotograma_azar = function (mc:MovieClip){
	var soy_fn="fotograma_azar";
	// selecciona un fotograma al azar en el movieclip indicado y salta el cabezal hacia este.
	mc.gotoAndStop(fn_azar([1,mc._totalframes]));
}