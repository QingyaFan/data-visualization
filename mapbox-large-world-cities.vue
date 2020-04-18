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

        let url = 'http://localhost:8000/world-cities.geojson';
        this.map.addSource('cities-population', { type: 'geojson', data: url });
        this.map.addLayer({
            'id': 'cities-population',
            'type': 'circle',
            'source': 'cities-population',
            'paint': {
                'circle-radius': [
                    "interpolate",
                    ["linear"],
                    ["get", "population"],
                    40000, 2,
                    2000000, 12
                ],
                'circle-color': [
                    "interpolate",
                    ["linear"],
                    ["get", "population"],
                    40000, 'DarkSlateGrey',
                    2000000, 'DarkSlateGray'
                ],
                'circle-opacity': 0.6
            }
            
        });
        this.map.addLayer({
            'id': 'cities-population-heatmap',
            'type': 'heatmap',
            'source': 'cities-population',
            'paint': {
                'heatmap-radius': [
                    "interpolate",
                    ["linear"],
                    ["get", "population"],
                    40000, 2,
                    2000000, 12
                ],
                'heatmap-intensity': 0.5
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