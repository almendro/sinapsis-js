function fn_sumar_nodos(param){
	var soy_fn="fn_sumar_nodos";
	/*
	Devuelve la suma del valor de todos los nodos en diferentes formas
		fn_sumar_nodos({
			matriz:mis_puntos,
			tipo_salida:"string" || "number"
			});
		
	si no se especifica 'tipo_salida' suma todo tal cual lo encuentra,
	si hay algun null o undefined devolvera NaN (chequear)
	
	Si se espeficia 'tipo_salida="string" ' devuelve una cadena [4,6] => "46"
	Si se espeficia 'tipo_salida="number" ' devuelve un numero [4,6] => 10
	*/
	
	var matriz = param.matriz;
	var tipo_salida = param.tipo_salida; // String, Number o por defecto lo que sea, puede devolver Nan.
	
	var salida = 0;
	if (tipo_salida=="string") salida = "";
	
	for(var a=0; a<matriz.length; a++){
		if(tipo_salida==null || tipo_salida==undefined){
			salida+=matriz[a];
		} else {
			if(matriz[a]!=null && matriz[a]!=undefined){
				if(tipo_salida=="string"){
					salida+=String(matriz[a]);
				} else {
					salida+=Number(matriz[a]);
				}
			}
		}
	}
	return salida;
}