function fn_siosi (e){
	trace ( "siosi "+e+" typeof "+typeof(e) );
   return( e.substr(0,1)=='"' || e.substr(0,1)=="'" || String(Number(e)) == Number(e))?e: eval(e);
}