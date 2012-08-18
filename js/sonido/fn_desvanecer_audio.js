/*
var fn_desvanecer_audio:Function = function(obj_snd:Sound,vol_fin:Number){
	tracer_lib(soy_fn,"fn_desvanecer_audio:");
	tracer_lib(soy_fn,this.obj_snd);
	this.createEmptyMovieClip("mixer",this.getNextHighestDepth());
	this.mixer.obj_snd = this.obj_snd;
	this.mixer.vol_fin = this.vol_fin;
	this.mixer.vol_ini = this.obj_snd.getVolume();
	
	this.mixer.onEnterFrame = function(){
		this.dif = ( this.vol_fin - this.vol_ini ) / 1.6;
		
		this.vol = this.obj_snd.getVolume() + this.dif;
		
		this.obj_snd.setVolume(this.vol);
		
		if ( this.dif > -1 && this.dif < 1 ) {
			this.obj_snd.setVolume(this.vol_fin);
			this.onEnterFrame = null;
			removeMovieClip(this);
		}
		
	}
}
*/
var fn_desvanecer_audio:Function = function(vol_fin:Number,velocidad:Number){
	var soy_fn="fn_desvanecer_audio";
	
	tracer_lib(soy_fn,"fn_desvanecer_audio: ( "+vol_fin+" , "+velocidad+" )");
	_root.createEmptyMovieClip("mixer",_root.getNextHighestDepth());
	
	_root.mixer_vol_fin = vol_fin;
	_root.mixer_velocidad = velocidad;
	
	tracer_lib(soy_fn,"_root.mixer_vol_fin "+_root.mixer_vol_fin);
	tracer_lib(soy_fn,"_root.mixer_velocidad "+_root.mixer_velocidad);
	
	_root.mixer.onEnterFrame = function(){

		_root.mixer_vol = _root.musica.getVolume();
		_root.mixer_dif = ( _root.mixer_vol_fin - _root.mixer_vol ) / _root.mixer_velocidad;
		
		tracer_lib(soy_fn,"mixer: "+_root.mixer_vol+" "+_root.mixer_dif);
		_root.mixer_vol += _root.mixer_dif;
		
		_root.musica.setVolume(_root.mixer_vol);
		
		if ( Math.abs(_root.mixer_dif) < 1 ) {
			tracer_lib(soy_fn,"mixer: FIN");
			_root.musica.setVolume(_root.mixer_vol_fin);
			this.onEnterFrame = null;
			removeMovieClip(this);
		}
	}
}