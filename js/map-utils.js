'use strict';

let highlightStyleCache = {}, highlight;
let container = document.getElementById('popup');
let content = document.getElementById('popup-content');
let closer = document.getElementById('popup-closer'); 

//初始化map
const map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
        zoom: 4
    })
});

// 矢量图层 
const style = new ol.style.Style({
    fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度  
        color: 'rgba(255, 255, 255, 0.6)'
    }),
    stroke: new ol.style.Stroke({ //边界样式  
        color: '#319FD3',
        width: 1
    }),
    text: new ol.style.Text({ //文本样式  
        font: '12px Calibri,sans-serif',
        fill: new ol.style.Fill({
            color: '#000'
        }),
        stroke: new ol.style.Stroke({
            color: '#fff',
            width: 3
        })
    })
});
const vectorLayer = new ol.layer.Vector({ //初始化矢量图层  
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: `./data/geojson/countries.geojson`,
    }),
    style: function (feature, resolution) {
        style.getText().setText(resolution < 5000 ? feature.get('name') : '');  //当放大到1:5000分辨率时，显示国家名字  
        return [style];
    }
}); 
map.addLayer(vectorLayer);

// 当鼠标移动时，高亮相应的区域的函数 
let featureOverlay = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: function (feature, resolution) {
        var text = resolution < 5000 ? feature.get('name') : '';
        if (!highlightStyleCache[text]) {
            highlightStyleCache[text] = [new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#f00',
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255,0,0,0.1)'
                }),
                text: new ol.style.Text({
                    font: '12px Calibri,sans-serif',
                    text: text,
                    fill: new ol.style.Fill({
                        color: '#000'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#f00',
                        width: 3
                    })
                })
            })];
        }
        return highlightStyleCache[text];
    }
});
map.addLayer(featureOverlay);

// 要素信息框
const overlay = new ol.Overlay({
    element: document.getElementById('popup'),
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});

var displayFeatureInfo = function (pixel) {
    var feature = map.forEachFeatureAtPixel(pixel, function (feature, layer) {
        return feature;
    });

    if (feature !== highlight) {
        if (highlight) {
            featureOverlay.getSource().removeFeature(highlight);
        }
        if (feature) {
            featureOverlay.getSource().addFeature(feature);
        }
        highlight = feature;
    }

};

/** 
 * 鼠标移动的事件  
 */
map.on('pointermove', function (evt) {
    if (evt.dragging) {   //如果是拖动地图造成的鼠标移动，则不作处理  
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    displayFeatureInfo(pixel);
}); 

/** 
 * 鼠标点击的事件  
 */
map.on('click', function (evt) {
    var pixel = map.getEventPixel(evt.originalEvent);
    var feature = map.forEachFeatureAtPixel(pixel, function (feature, layer) {
        return feature;
    });
    var coordinate = evt.coordinate;
    var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
        coordinate, 'EPSG:3857', 'EPSG:4326'));
    if (feature !== undefined) {
        content.innerHTML = '<p>你点击的坐标是：</p><code>' + hdms + '</code><p>这里属于：' + feature.get('name') + '</p>';
    }
    else {
        content.innerHTML = '<p>你点击的坐标是：</p><code>' + hdms + '</code><p>这里是大海！</p>';
    }
    overlay.setPosition(coordinate);
    map.addOverlay(overlay);
});

/** 
 * 隐藏弹出框的函数 
 */
closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};