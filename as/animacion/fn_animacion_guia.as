function fn_animacion_guia (p) {
        /*
                Esta funcion clona las posiciones de Mclips contenidos en el MC "animacion_guia" con sus clones en el plano que se incluya la funcion
                NOTA: siempre tiene que existir un MC que se llame "animaion_guia" que contenga a los movieclip clones
                cantidad: cantidad de MC
                nombre: nombre base del MC
								
								completo: true para clonar rotacion y escala.
        */

        for (n=0; n < p.cantidad; n++){
                trace (n);
                MC = eval('animacion_guia.'+p.nombre+n);
                if (!_root.dev) MC._visible = false;
                MC.txt = n;
								MC.completo = p.completo;
                MC.onEnterFrame = function () {
                        this._parent._parent[this._name]._x = this._x;
                        this._parent._parent[this._name]._y = this._y;
												if(this.completo){
													this._parent._parent[this._name]._yscale = this._yscale;
													this._parent._parent[this._name]._xscale = this._xscale;
													this._parent._parent[this._name]._rotation = this._rotation; 	
												}
                }
        }

}
