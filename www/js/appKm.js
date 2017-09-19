
$(document).ready(function () {

	var btn = $.fn.button.noConflict() // reverts $.fn.button to jqueryui btn
	$.fn.btn = btn // assigns bootstrap button functionality to $.fn.btn
    document.addEventListener("deviceready", addCurrentLocationToMap, false);
    moment.locale('fr-ca');
});

		

	 
	var layers = [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })];
	  
	var map = new ol.Map({
	layers: layers,
      target: 'map',
      view: new ol.View({
        projection: 'EPSG:3857',
        center: ol.proj.transform([-77.796760,48.098187],'EPSG:4326','EPSG:3857'),
        zoom: 11
      }),
	  controls: ol.control.defaults({
		  zoom: false,
		  attribution: false,
		  rotate: false
	  })
	});

	    function onSuccess(position) {
        if (position.coords.heading !== null) {
            $('#heading').html(position.coords.heading);
            map.setBearing(position.coords.heading);
            compass.setAngle(position.coords.heading);
        }
    };

    function onError(error) {
        alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    };


    function addCurrentLocationToMap(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                lat = position.coords.latitude;
                long = position.coords.longitude;
				latlong = lat +", "+ long;
                var heading = position.coords.heading;
				map.getView().setCenter(ol.proj.transform(latlong, 'EPSG:3857', 'EPSG:4326'));
				map.getView().setZoom(5);
				console.log(lat,long);
            $('#positionCoord').text(lat+","+long);
			});
			
        }
        else{
            console.log('no geo');
        }
    };


		  
    $('#maPosition').click(function(event){
        addCurrentLocationToMap();
    }); 
	 