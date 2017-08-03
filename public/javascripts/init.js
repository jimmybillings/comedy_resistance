(function ($) {
  $(function () {

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    var map = L.map('map').setView([41.6872, -97.3301], 4);
    map.fitBounds([
      [28.396308, -124.848974],
      [53.384358, -66.885444]
    ]);
    var tileLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
      ext: 'png'
    });
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    $(".leaflet-control-zoom").css("visibility", "hidden");
    tileLayer.addTo(map);
    $.getJSON('/javascripts/districts.json', function (response) {
      var geojson = L.geoJSON(response, {
        style: function (feature) {
          var props = feature['properties'];
          var color = '#BB6357';
          return {
            weight: 1,
            color: color,
            fillColor: color
          }
        },
        onEachFeature: function (feature, layer) {
          var props = feature['properties'];
          var popupContent = '<a href="/district/' + props['code'] + '">Support ' + props['district_name'] + '</a>';
          layer.bindPopup(popupContent);
          layer.on('mouseover', function (event) {
            var layer = event.target;
            layer.setStyle({
              fillOpacity: 0.9
            });
          });
          layer.on('mouseout', function (event) {
            geojson.resetStyle(event.target);
          });
        }
      }).addTo(map);
    });


  }); // end of document ready
})(jQuery); // end of jQuery name space

