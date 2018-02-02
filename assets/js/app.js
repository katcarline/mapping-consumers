var map, featureList, boroughSearch = [], theaterSearch = [], museumSearch = [];

$(window).resize(function() {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});

if ( !("ontouchstart" in window) ) {
  $(document).on("mouseover", ".feature-row", function(e) {
    highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
  });
}

$(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function() {
  map.fitBounds(boroughs.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  animateSidebar();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  animateSidebar();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  animateSidebar();
  return false;
});

function animateSidebar() {
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function() {
    map.invalidateSize();
  });
}

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}

function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}
/* Basemap Layers */ /* Define the map tiles, source here. Steps: choose map. get access token. get id for that map from my mapbox account  */
var cartoLight = /*L.tileLayer*/($ curl "https://api.mapbox.com/v4/mapbox.streets/1/0/0.png?access_token=pk.eyJ1Ijoia2F0Y2FybGluZSIsImEiOiJjamNsMGd1YjYwMWptMnlxcTNpb2M3ZWJvIn0.HNH9dQ8TpH8JcoePBE-Thw", {
  maxZoom: 19,
   /* id: 'geyerbri-msu.1qh1chs8',
accessToken: 'pk.eyJ1Ijoia2F0Y2FybGluZSIsImEiOiJjamNsMGd1YjYwMWptMnlxcTNpb2M3ZWJvIn0.HNH9dQ8TpH8JcoePBE-Thw
',*/
  attribution: '&copy; <a href="mapbox.com"/a>'
  });
  
$.getJSON("data/geojsontrial.geojson", function (data) {
  boroughs.addData(data);
});

map = L.map("map", {
  zoom: 10,
  center: [40.702222, -73.979378],
  layers: [cartoLight, boroughs, markerClusters, highlight],
  zoomControl: false,
  attributionControl: false
});