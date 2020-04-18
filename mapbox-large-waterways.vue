<template>
    <div id="map"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
export default {
    data() {
        return {
            map: null
        }
    },
    mounted() {
        this.map = new mapboxgl.Map({
            container: 'map',
            zoom: 1,
        });

        this.map.addSource('osm', { 
            type: 'raster', 
            tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png', 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'], 
            tileSize: 256 });
        this.map.addLayer({
            id: 'osm',
            type: 'raster',
            source: 'osm'
        });

        let url = 'http://localhost:8000/waterways_china.geojson';
        this.map.addSource('waterways', { type: 'geojson', data: url });
        this.map.addLayer({
            'id': 'waterways',
            'type': 'line',
            'source': 'waterways',
            'paint': {
                'line-color': 'DarkViolet',
                'line-opacity': 0.6,
                'line-width': .9
            },
            'layout': {
                'line-cap': 'round',
            }
            
        });
        
        this.map.addControl(new mapboxgl.NavigationControl());
    }
}
</script>

<style scoped>
#map {
    height: 100%;
}
</style>