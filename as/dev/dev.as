// DEV >>>
//opcionales
loadMovieNum('dev/debugueador.swf',10000);

#include "funciones_parametros.as"

function tracer ( a ) { trace ( a )  }

dev_filtro = {
	activo: false,
	mostrar:[],
	inverso: false
}

/* MOVER A DEV */
function tracer_fi(n,param){
	tracer_lib(n,"( "+ver(param)+" ) { ");
}
function tracer_ff(n,salida){
	tracer_lib(n,"    salida -> "+ver(salida));
	tracer_lib(n," } // <<< ");
}
// <<< DEV


function tracer_lib(soy_fn,salida){
  var mostrar = true;
	if(soy_fn==undefined)soy_fn="";
	if(dev_filtro.activo){
		mostrar = dev_filtro.inverso;
		for(var fn in dev_filtro.mostrar){
			if(dev_filtro.mostrar[fn] == soy_fn){
				mostrar=!(mostrar);
				break;
			}
		}
	}
	if(mostrar) tracer (soy_fn+" : "+ salida );
}

function tracer_fotograma(salida){
	tracer("");
	tracer("--------------");
	tracer("o o o o o o o ");
	tracer("--------------");
	tracer("");
	tracer("fotograma ("+this._currentframe+") : "+salida);
	tracer("");
	tracer("--------------");
	tracer("o o o o o o o ");
	tracer("--------------");
	tracer("");
}