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

        let url = 'http://localhost:8000/buildings_china_taiwan.geojson';
        this.map.addSource('buildings', { type: 'geojson', data: url });
        this.map.addLayer({
            'id': 'buildings',
            'type': 'fill-extrusion',
            'source': 'buildings',
            'paint': {
                'fill-extrusion-color': 'Crimson',
                'fill-extrusion-height': 100,
                'fill-extrusion-opacity': 0.9,
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