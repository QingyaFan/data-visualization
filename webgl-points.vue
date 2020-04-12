<template>
    <div id="map"></div>
</template>

<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import WebGLPointsLayer from 'ol/layer/WebGLPoints';
import GeoJSON from 'ol/format/GeoJSON';
import Vector from 'ol/source/Vector';
import OSM from 'ol/source/OSM';

export default {
    data() {
        return {
            map: null,
        }
    },

    mounted() {
        this.map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            target: document.getElementById('map'),
            view: new View({
                center: [0, 0],
                zoom: 2
            })
        });

        let vectorSource = new Vector({
            url: 'https://openlayers.org/en/latest/examples/data/geojson/world-cities.geojson',
            format: new GeoJSON()
        });

        let pointLayer = new WebGLPointsLayer({
            source: vectorSource,
            style: {
                "symbol": {
                    "symbolType": "circle",
                    "size": [
                        "interpolate",
                        [
                            "linear"
                        ],
                        [
                            "get",
                            "population"
                        ],
                        40000,
                        8,
                        2000000,
                        28
                    ],
                    "color": "#006688",
                    "rotateWithView": false,
                    "offset": [
                        0,
                        0
                    ],
                    "opacity": [
                        "interpolate",
                        [
                            "linear"
                        ],
                        [
                            "get",
                            "population"
                        ],
                        40000,
                        0.6,
                        2000000,
                        0.92
                    ]
                }
            }
        });

        this.map.addLayer(pointLayer);
    }
}
</script>

<style>
#map {
    height: 100%;
}
</style>