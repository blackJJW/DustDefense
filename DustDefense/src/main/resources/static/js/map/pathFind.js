
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

//------------------------------------------------------------------------------------------
var startAddress = document.getElementById("startAddress");
var endAddress = document.getElementById("endAddress");

var startCodeVal = [];
var endCodeVal = [];


// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
var infowindow = new kakao.maps.InfoWindow({
	zIndex:1,
	removable : true
	});


// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places(); 

var keyword = document.getElementById("keyword");
var searchKeyword = document.getElementById("btnSearchKeyword");

searchKeyword.addEventListener('click', function(){
	// 키워드로 장소를 검색합니다
	ps.keywordSearch(keyword.value, placesSearchCB); 
})


// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        for (var i=0; i<data.length; i++) {
            displayMarker(data[i]);    
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }       

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    } 
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
    
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x) 
    });
    
    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function() {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>' + 
        						'<button id="selectStart" onclick="getStartCoord(' + place.x + ',' + place.y + ')">' + "출발지" + '</button>' + 
        						'<button id="selectEnd" onclick="getEndCoord(' + place.x + ',' + place.y + ')">' + "목적지" + '</button>');
        infowindow.open(map, marker);  
        
    });

    $(document).on('click','#btnPathFinder', function(){
		console.log("1111");
		infowindow.setMap(null);
   		marker.setMap(null);
   
	});
}

var startAddr = document.getElementById("startAddr");
var endAddr = document.getElementById("endAddr");

function getStartCoord(x, y){
		startCodeVal[0] = x;
		startCodeVal[1] = y;
		console.log(startCodeVal);
		getAddr(y, x, startAddr);
}  

function getEndCoord(x, y){
		endCodeVal[0] = x;
		endCodeVal[1] = y;
		console.log(endCodeVal);
		getAddr(y, x, endAddr);
}  

function getAddr(lat, lng, place){
	let geocoder = new kakao.maps.services.Geocoder();
	
	let coord = new kakao.maps.LatLng(lat, lng);
	let callback = function(result, status){
		if(status === kakao.maps.services.Status.OK){
			console.log(result);
			place.innerHTML = '<div>'+'--- '+'도로명주소 : ' + result[0].road_address.address_name + '</div>' +
            				  '<div>'+'--- '+'지번 주소 : ' + result[0].address.address_name + '</div>';
		}
		
	}
	geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
}	
//-------------------------------------------------------------------------------------------


var btnPathFinder = document.getElementById("btnPathFinder");
var pA;
//출력1. 호출3
//btnPathFinder.addEventListener('click', function(){
//	console.log("22222");
//    pA = printRoute(startCodeVal, endCodeVal);
   
//})

$(document).on('click','#btnPathFinder', function(){
    pA = printRoute(startCodeVal, endCodeVal);
});

var distance = document.getElementById("distance");
var duration = document.getElementById("duration");

const printRoute = async (start, destination) => {
   let response = await fetch('https://api.openrouteservice.org/v2/directions/cycling-regular?api_key=5b3ce3597851110001cf624888ae0402478a4e078fb90dfac4b683ab&start=' 
               + start[0] + ',' + start[1] + '&end=' + destination[0] + ',' + destination[1]);
   let data = null;
   let result = null;
   let linePath = null;
   if (response.status === 200){
      data = await response.json();   //기다림
      console.log(data);
      result = data.features[0];
      //pathResult.setAttribute('value', result);
      
      linePath = result;
      drawPath(linePath);
      //return result;
   } else{
      //pathResult.setAttribute('value', 'error');
      console.log('Error : ' + response.status);
   }
}


function drawPath (path){
	var pathCoord = path.geometry.coordinates;
	
	var paths = [];
	
	var polyline;
	var summary = path.properties.summary;
	var dis = summary["distance"];
	var dur = Math.ceil(summary["duration"]);
	
	getTimeStringSeconds(dur);
	
	console.log(dis);
	distance.innerHTML = dis + ' m';
	
	
	for(let j = 0; j < pathCoord.length; j++){
		paths.push(new kakao.maps.LatLng(pathCoord[j][1], pathCoord[j][0]));
	}
	
	// 지도에 표시할 선을 생성합니다
	polyline = new kakao.maps.Polyline({
    	path: paths, // 선을 구성하는 좌표배열 입니다
    	strokeWeight: 5, // 선의 두께 입니다
    	strokeColor: '#f00', // 선의 색깔입니다
    	strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    	strokeStyle: 'solid' // 선의 스타일입니다
	});
	
	// 지도에 선을 표시합니다 
	polyline.setMap(map);  
	console.log(polyline.getLength());
	
	setCenter(startCodeVal, endCodeVal);
	
	btnRemovePath.addEventListener('click', function(){
		polyline.setMap(null);
		var originCenter = new kakao.maps.LatLng(37.566826, 126.9786567);
		
		map.setCenter(originCenter);
        map.setLevel(9);
	});
}

function getTimeStringSeconds(seconds){
	var hour, min, sec;
	
	hour = parseInt(seconds / 3600);
	min = parseInt((seconds % 3600) / 60);
	sec = seconds % 60;
	
	if(hour.toString().length == 1) hour = "0" + hour;
	if(min.toString().length == 1) min = "0" + min;
	if(sec.toString().length == 1) sec = "0" + sec;
	
	console.log(hour + ":" + min + ":" + sec);
	duration.innerHTML = hour + ":" + min + ":" + sec;
}


var btnRemovePath = document.getElementById('btnDisablePathFinder');



function setCenter(start, destination){
	
	var points = [
		new kakao.maps.LatLng(start[1], start[0]),
		new kakao.maps.LatLng(destination[1], destination[0])
	]
	
	var bounds = new kakao.maps.LatLngBounds();
	var i, marker;
	for(i = 0; i < points.length; i++){
		marker = new kakao.maps.Marker({ position : points[i]});
		marker.setMap(map);
		
		bounds.extend(points[i]);
	}
	
	map.setBounds(bounds);
}

var marker;

function startEndMarkers(start, destination){
	
	
	var startPosition = {
				title : '출발지',
				latlng : new kakao.maps.LatLng(start[0], start[1])
			};
	var endPosition = {
				title : '도착지',
				latlng : new kakao.maps.LatLng(destination[0], destination[1])
			};
	
	
	// 마커 이미지의 이미지 주소입니다
	var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
	
    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(24, 35); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
    
    // 마커를 생성합니다
    startMarker = new kakao.maps.Marker({
       	map: map, // 마커를 표시할 지도
       	position: startPosition.latlng, // 마커를 표시할 위치
       	title : startPosition.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
       	image : markerImage // 마커 이미지 
    });
    
    
    endMarker = new kakao.maps.Marker({
       	map: map, // 마커를 표시할 지도
       	position: endPosition.latlng, // 마커를 표시할 위치
       	title : endPosition.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
       	image : markerImage // 마커 이미지 
    });
    startMarker.setMap(map);
    endMarker.setMap(map);

}