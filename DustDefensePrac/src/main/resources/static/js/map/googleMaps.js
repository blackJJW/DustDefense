// Simple Map
let map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.541, lng: 126.986},
          zoom: 10
    });
    
    initGallPeters();
    map.mapTypes.set("gallPeters", gallPetersMapType);
    map.setMapTypeId("gallPeters");
    
    // show the lat and lng under the mouse cursor.
    const coordsDiv = document.getElementById("coords");
    
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(coordsDiv);
    map.addListener("mousemove", (event) => {
		coordsDiv.textContent = 
			"lat : " +
			Math.round(event.latLng.lat()) +
			", " +
			"lng : " +
			Math.round(event.latLng.lng());
	});
    
    // Add some markers to the map.
  	map.data.setStyle((feature) => {
	   return {
	     title: feature.getProperty("name"),
	     optimized: false,
	   };
	 });
	map.data.addGeoJson(cities);
        
}

let gallPetersMapType;

function initGallPeters(){
	const GALL_PETERS_RANGE_X = 800;
	const GALL_PETERS_RANGE_Y = 512;
}

window.initMap = initMap;