var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 9 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

//---------------------------------------------------------------------------------------
//----- 실시간 교통 정보 ---------------------------------------------------------------------
var trafficToggle = false;
var trafficSwitch = document.getElementById('trafficInfo');

trafficSwitch.addEventListener('click', function() {
	trafficToggle = !trafficToggle;
	
	switch (trafficToggle){
		case true:
			map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
			break;
		default :
			map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}
}, false);
//------------------------------------------------------------------------------------------

getCoord();

// 마커를 담을 배열입니다
var markers = [];

var startPoint = [];
var destPoint = [];

function getCoord(){
	
	// 지도를 클릭한 위치에 표출할 마커입니다
	var marker = new kakao.maps.Marker({ 
    // 지도 중심좌표에 마커를 생성합니다 
    position: map.getCenter() 
	}); 
	// 지도에 마커를 표시합니다
	marker.setMap(map);
	
	// 지도에 클릭 이벤트를 등록합니다
	// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
	kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    
    	// 클릭한 위도, 경도 정보를 가져옵니다 
    	var latlng = mouseEvent.latLng;
    	
    	// 마커 위치를 클릭한 위치로 옮깁니다
    	//marker.setPosition(latlng);
    	
    	// 클릭한 위치에 마커를 표시합니다 
    	addMarker(mouseEvent.latLng);   
    
    	console.log(latlng.getLat());
    	console.log(latlng.getLng());
    	
    	startPoint[0] = latlng.getLat();
    	startPoint[1] = latlng.getLng();
    	
    	console.log(startPoint);
    	
    	console.log(markers); 
    	
	});
}
//------------------------------------------------------------------------------------------
// 마커를 생성하고 지도위에 표시하는 함수입니다
function addMarker(position) {
    
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: position
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
    
    // 생성된 마커를 배열에 추가합니다
    markers.push(marker);
}


// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
function setMarkers(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }            
}
//------------------------------------------------------------------------------------------
var a = [37.558901973501555, 127.03223326022596];
var b = [37.566958174042206, 127.07063103688787];

var btnPathFinder = document.getElementById("btnPathFinder");

btnPathFinder.addEventListener('click', function(){
	routeValue(a, b);
	console.log(pA);
	
})

const getRoute = async (start, destination) => {
	const response = await fetch('https://api.openrouteservice.org/v2/directions/cycling-regular?api_key=5b3ce3597851110001cf624888ae0402478a4e078fb90dfac4b683ab&start=' 
					+ start[1] + ',' + start[0] + '&end=' + destination[1] + ',' + destination[0]);
	if (response.status === 200){
		const data = await response.json();
		console.log(data.features[0].geometry.coordinates)
		return data.features[0].geometry.coordinates;
	} else{
		throw new Error('Error');
	}
}

var pA = [];

const routeValue = async (start, destination) => {
	const rVal = await getRoute(start, destination);
	pA = rVal;
	console.log(pA);
}

