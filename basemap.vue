<template>
    <div id="map"></div>
</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import 'ol/ol.css';

export default {
    mounted() {
        new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    })
                })
            ],
            view: new View({
                projection: 'EPSG:4326',
                center: [105, 36],
                zoom: 4
            })
        });
    }
}
</script>

<style>
#map {
    height: 100%;
}
</style>