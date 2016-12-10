<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" href="{{ asset('/css/main.css') }}">
    <link rel="stylesheet" href="{{ asset('/css/ol.css') }}">
    <script src="{{ asset('/scripts/jquery.js') }}" charset="utf-8"></script>
    <script src="{{ asset('/scripts/ol-debug.js') }}" charset="utf-8"></script>
  </head>
  <body>
    <div id="map" class="map fullsize"></div>

    <script type="text/javascript">
      var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile ({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.transform([116.5, 39.9], 'EPSG:4326', 'EPSG:3857'),
          zoom: 9
        })
      });

      // 行政区划图层
      var vectortileAdminLayer = new ol.layer.VectorTile({
        source: new ol.source.VectorTile({
          format: new ol.format.MVT(),
          tileGrid: ol.tilegrid.createXYZ({maxZoom: 22}),
          tilePixelRatio: 1,
          url: 'http://127.0.0.1:8080/geoserver/gwc/service/tms/1.0.0/' +
          'china:beijing_china_osm_admin_3857@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf'
        }),
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgb(140,137,129)'
          }),
          stroke: new ol.style.Stroke({
            color: 'rgb(220, 220, 220)',
            width: 1
          })
        })
      });
      map.addLayer(vectortileAdminLayer);

      // 河流图层
      var vectortileLayer = new ol.layer.VectorTile({
        source: new ol.source.VectorTile({
          format: new ol.format.MVT(),
          tileGrid: ol.tilegrid.createXYZ({maxZoom: 22}),
          tilePixelRatio: 1,
          url: 'http://127.0.0.1:8080/geoserver/gwc/service/tms/1.0.0/' +
            'china:beijing_china_osm_waterways_3857@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf'
        }),
        style: new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'rgb(163,204,25)',
            width: 5
          })
        })
      });
      map.addLayer(vectortileLayer);
    </script>
  </body>
</html>
