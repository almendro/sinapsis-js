include ("../matematica/fn_mat_centro_en_rango.js");

function fn_gf_tiempo_fin ( ) {

	var soy_fn="fn_gf_tiempo_fin" ;
	
	//  fn_gf_tiempo_fin_matar ( ) ;
	 
	// crea el MovieClip de festo de victoria
	
	this.createEmptyMovieClip ( 'gf_tiempo_fin' , this.getNextHighestDepth ( ) ) ; 
	this.gf_tiempo_fin.loadMovie ( "graficos/tiempo_fin.swf" ) ;

	// crea un control con enterframe para centrar y poner en el nivel mas alto la placa
	this.createEmptyMovieClip( 'gf_tiempo_fin_tmp' , this.getNextHighestDepth( ) ) ; 
	this.gf_tiempo_fin_tmp.onEnterFrame = function () {
	
		this.posicion_x = fn_mat_centro_en_rango ( { largo : gf_tiempo_fin._width , rango : [ 0 , _root._width ] } ) ;
		this.posicion_y = fn_mat_centro_en_rango ( { largo : gf_tiempo_fin._height , rango : [ 0 , _root._height] }) ;
		
		gf_tiempo_fin._x = this.posicion_x;
		gf_tiempo_fin._y = this.posicion_y;
		
		gf_tiempo_fin.swapDepths( gf_tiempo_fin._parent.getNextHighestDepth ( ) ) ;
		
	}
	/*	*/
}
function fn_gf_tiempo_fin_matar ( ) {
	var soy_fn="fn_gf_tiempo_fin_matar" ;
	removeMovieClip ( this.gf_tiempo_fin ) ;
	removeMovieClip ( this.gf_tiempo_fin_tmp ) ;
}