function fn_unicode (e) {
	if (e.inversa == true ) {
		txt = e.txt;
		 /*
			unicode a la inversa
				
				fn_unicode ({
						txt: texto
						inversa:true
				})
		 
		 
		 */
	} else {
		txt = e;
	}

		if (txt == Number(txt)) return txt
		
remplazar = [	"a'",
				"e'",
				"i'",
				"o'",
				"u''",
				"u'",
				"n'",
				"?'",
				"!'",
				'\n\\'
				];
				
por = [			 chr(225),
				 chr(233),
				 chr(237),
				 chr(243),
				 chr(252),
				 chr(250),
				 chr(241),
				 chr(191),
				 chr(161),
				 chr(10)
				];
				/*
				por = [			 String.fromCharCode(225),
				 String.fromCharCode(233),
				 String.fromCharCode(237),
				 String.fromCharCode(243),
				 String.fromCharCode(252),
				 String.fromCharCode(250),
				 String.fromCharCode(241),
				 String.fromCharCode(191),
				 String.fromCharCode(161),
				 String.fromCharCode(10)
				];
				*/
				/*
					a="\n"
					trace (a.charCodeAt(0));
				*/
			if (e.inversa == true )  {
					remplazar_tmp= fn_copiar_array({matriz: remplazar});
					remplazar = por;
					por = remplazar_tmp;
			}
	for (k=0; k < remplazar.length; k++){
		txt = fn_str_replace( { buscar: remplazar[k], replazar:por[k], texto: txt});
		txt = fn_str_replace( { buscar: remplazar[k].toUpperCase(), replazar: por[k].toUpperCase(), texto: txt});	
	}
	return txt;
}
		trace (fn_unicode ("a' e' i' o' u' u'' n' n~ ?' !'"));
		trace (fn_unicode ("A' E' I' O' U' U'' N' N~ ?' !'"));
		
		trace (" inversa "+ fn_unicode ({txt: fn_unicode ("A' E' I' O' U' U'' N' N~ ?' !'"), inversa: true }));
	