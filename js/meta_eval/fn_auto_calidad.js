var var_fn_auto_calidad1, var_fn_auto_calidad

function fn_auto_calidad () {
	fn_tiemp_dispara ([0,2], function () {
		var_fn_auto_calidad = new Date().getTime();
		tx = var_fn_auto_calidad - var_fn_auto_calidad1;
		_quality = (tx>100) ? "MEDIUM" : "HIGH";
		var_fn_auto_calidad1 = var_fn_auto_calidad;
		fn_auto_calidad ();
	});
}
