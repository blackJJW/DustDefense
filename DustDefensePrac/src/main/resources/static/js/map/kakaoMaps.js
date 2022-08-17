// 지도 생성
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 

//------

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도 타입 컨트롤을 지도에 표시합니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

//-----

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

//-----

//-------------------------------------------------------------------------------
//----- 지도 이동시키기 --------------------------------------------------------------
function setCenter() {            
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(33.452613, 126.570888);
    
    // 지도 중심을 이동 시킵니다
    map.setCenter(moveLatLon);
}

function panTo() {
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(33.450580, 126.574942);
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);            
}
//----------------------------------------------------------------------------------
//----- 지도 레벨 바꾸기 ---------------------------------------------------------------
// 지도 레벨을 표시합니다
displayLevel();
 
// 지도 레벨은 지도의 확대 수준을 의미합니다
// 지도 레벨은 1부터 14레벨이 있으며 숫자가 작을수록 지도 확대 수준이 높습니다
function zoomIn() {        
    // 현재 지도의 레벨을 얻어옵니다
    var level = map.getLevel();
    
    // 지도를 1레벨 내립니다 (지도가 확대됩니다)
    map.setLevel(level - 1);
    
    // 지도 레벨을 표시합니다
    displayLevel();
}    

function zoomOut() {    
    // 현재 지도의 레벨을 얻어옵니다
    var level = map.getLevel(); 
    
    // 지도를 1레벨 올립니다 (지도가 축소됩니다)
    map.setLevel(level + 1);
    
    // 지도 레벨을 표시합니다
    displayLevel(); 
}    
 
function displayLevel(){
    var levelEl = document.getElementById('maplevel');
    levelEl.innerHTML = '현재 지도 레벨은 ' + map.getLevel() + ' 레벨 입니다.';
}
//---------------------------------------------------------------------------------
//----- 지도 정보 얻어오기 -------------------------------------------------------------

function getInfo() {
    // 지도의 현재 중심좌표를 얻어옵니다 
    var center = map.getCenter(); 
    
    // 지도의 현재 레벨을 얻어옵니다
    var level = map.getLevel();
    
    // 지도타입을 얻어옵니다
    var mapTypeId = map.getMapTypeId(); 
    
    // 지도의 현재 영역을 얻어옵니다 
    var bounds = map.getBounds();
    
    // 영역의 남서쪽 좌표를 얻어옵니다 
    var swLatLng = bounds.getSouthWest(); 
    
    // 영역의 북동쪽 좌표를 얻어옵니다 
    var neLatLng = bounds.getNorthEast(); 
    
    // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
    var boundsStr = bounds.toString();
    
    
    var message = '지도 중심좌표는 위도 ' + center.getLat() + ', <br>';
    message += '경도 ' + center.getLng() + ' 이고 <br>';
    message += '지도 레벨은 ' + level + ' 입니다 <br> <br>';
    message += '지도 타입은 ' + mapTypeId + ' 이고 <br> ';
    message += '지도의 남서쪽 좌표는 ' + swLatLng.getLat() + ', ' + swLatLng.getLng() + ' 이고 <br>';
    message += '북동쪽 좌표는 ' + neLatLng.getLat() + ', ' + neLatLng.getLng() + ' 입니다';
    
    console.log(message);
    // 개발자도구를 통해 직접 message 내용을 확인해 보세요.
    // ex) console.log(message);
}
//--------------------------------------------------------------------------------------------------
//----- 교통정보 가져오기 -------------------------------------------------------------------
function turnOffTrafficInfo(){

	// 아래 코드는 위에서 추가한 교통정보 지도타입을 제거합니다
	map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);    
}

function turnOnTrafficInfo(){

	// 지도에 교통정보를 표시하도록 지도타입을 추가합니다
	map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);    
}
//------------------------------------------------------------------------------------------
//------ 클릭 이벤트 등록--------------------------------------------------------------------------
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
    marker.setPosition(latlng);
    
    var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
    message += '경도는 ' + latlng.getLng() + ' 입니다';
    
    var resultDiv = document.getElementById('clickLatlng'); 
    resultDiv.innerHTML = message;
    
});
//-----------------------------------------------------------------------------------
//----- 이동 이벤트 등록 -----------------------------------------------------------------
// 마우스 드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'dragend', function() {        
    
    // 지도 중심좌표를 얻어옵니다 
    var latlng = map.getCenter(); 
    
    var message = '변경된 지도 중심좌표는 ' + latlng.getLat() + ' 이고, ';
    message += '경도는 ' + latlng.getLng() + ' 입니다';
    
    var resultDiv = document.getElementById('result');  
    resultDiv.innerHTML = message;
    
});

//--------------------------------------------------------------------------------------------
//------ 지역 별 폴리곤 ---------------------------------------------------------------------------
// 행정구역 구분
$.getJSON("/resources/json/geoJson/siDo.json", function(geojson){
	console.log("get done.");
	var data = geojson.features;
	var coordinates = [];  // 좌표 저장할 배열
	var name = '';   // 행정 이름
	
	$.each(data, function(index, val){
		
		coordinates = val.geometry.coordinates;
		name = val.properties.CTP_KOR_NM;
		
		displayArea(coordinates, name);
	})
})

var polygons = []; // function 안 쪽에 지역변수로 넣으니깐 폴리곤 하나 생성할 때마다 배열이 비어서 클릭했을 때 전체를 못 없애줌.그래서 전역 변수로 만듦

// 행정구역 폴리곤
function displayArea(coordinates, name){
	var path = [];	 // 폴리곤 그려줄 path
	var points = []; // 중심 좌표 구하기 위한 지역구 좌표들
	
	$.each(coordinates[0], function(index, coordinate){
		console.log(coordinates);
		
		var point = new Object();
		point.x = coordinate[1];
		point.y = coordinate[0];
		points.push(point);
		path.push(new daum.maps.LatLng(coordinate[1], coordinate[0]));
	})
	
	// 다각형 생성
	var polygon = new kakao.maps.Polygon({
	    path:path, // 그려질 다각형의 좌표 배열입니다
	    strokeWeight: 3, // 선의 두께입니다
	    strokeColor: '#39DE2A', // 선의 색깔입니다
	    strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
	    strokeStyle: 'longdash', // 선의 스타일입니다
	    fillColor: '#A2FF99', // 채우기 색깔입니다
	    fillOpacity: 0.7 // 채우기 불투명도 입니다
	});
	polygon.setMap(map);
}