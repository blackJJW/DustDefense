// Simple Map
let map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.541, lng: 126.986},
          zoom: 10
    });
    
    const bikeLayer = new google.maps.BicyclingLayer();

  	bikeLayer.setMap(map);
}

window.initMap = initMap;