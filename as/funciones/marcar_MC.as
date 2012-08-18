function marcar_MC (obj) {
	var soy_fn="marcar_MC";

	var my_color:Color = new Color(obj);
	var myColorTransform:Object = { ra: 100, rb: 0, ga: 100, gb: 96, ba: 100, bb: 0, aa: 100, ab: 0};
	my_color.setTransform(myColorTransform);

}
