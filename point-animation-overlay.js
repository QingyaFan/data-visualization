var tian_di_tu_road_layer = new ol.layer.Tile({
	title: "天地图路网",
	source: new ol.source.XYZ({
		url: "http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"
	})
});

var tian_di_tu_annotation = new ol.layer.Tile({
	title: "天地图文字标注",
	source: new ol.source.XYZ({
		url: 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}'
	})
});

var map = new ol.Map({
	target: 'map',
	layers: [
		tian_di_tu_road_layer,
		tian_di_tu_annotation
	],
	controls: ol.control.defaults({}).extend([
		new ol.control.MousePosition({})
	]),
	view: new ol.View({
		center:  [11468382.41282299,3502038.887913635],
		zoom: 11
	})
});


var point_div = document.getElementById("css_animation");
var point_overlay = new ol.Overlay({
	element: point_div,
	positioning: 'bottom-left',
	stopEvent: false
});
map.addOverlay(point_overlay);
point_overlay.setPosition([11468382.41282299,3502038.887913635]);