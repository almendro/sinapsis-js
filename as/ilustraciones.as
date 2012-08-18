/*this._visible=false;*/
mi_color = new Color(this);
mi_color_halo = new Color(this._parent.halo);
mi_color_halo.setRGB(0xffffff);
la_paleta = new Array();
a = 0;
for (var el_color in this.paleta){
	pick_color = new Color(this.paleta[el_color]);
	la_paleta[a] = pick_color.getRGB();
	//tracer_lib(soy_fn,el_color+" "+pick_color);
	a++;
}
azar = Math.floor(Math.random()*la_paleta.length);
mi_color.setRGB(la_paleta[azar]);