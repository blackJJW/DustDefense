import geojson from "/data/geo/seoulGeo.json" assert { type: "json" };


//2022.08.18 문제 : 선택한 폴리곤이 흰색일때만 클릭이됨
// 클릭이벤트는 하나인데 드래그앤드랍, 포인트찍기, 지도확대, 지역명찍기가 다 적용되고있음


const { kakao } = window;


let data = geojson.features;
let coordinates = []; //좌표 저장 배열
let name = ''; //행정구 이름

let polygons = [];

const mapContainer = document.getElementById('map'); // 지도를 표시할 div
const mapOption = {
  center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
  level: 9, // 지도의 확대 레벨
};

const map = new kakao.maps.Map(mapContainer, mapOption);
const customOverlay = new kakao.maps.CustomOverlay({});


/* 좌표와 이름으로 화면에 표현할 모든 행정구역명 가져오기 */
const displayArea = (coordinates, name) => {
  let path = [];
  let points = [];
  //let areaResult = pollution.filter((item) => item[0] === name); //없어도 됨

  coordinates[0].forEach((coordinate) => {
    let point = {};
    point.x = coordinate[1];
    point.y = coordinate[0];
    points.push(point);
    path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
  });

  let polygon = new kakao.maps.Polygon({
    map: map,
    path: path, // 그려질 다각형의 좌표 배열입니다
    strokeWeight: 2, // 선의 두께입니다
    strokeColor: '#004c80', // 선의 색깔입니다
    strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'solid', // 선의 스타일입니다
    fillColor: '#fff', // 채우기 색깔입니다
    fillOpacity: 0.7, // 채우기 불투명도 입니다
  });

  polygons.push(polygon);


  let prevName = "";


  // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
  // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
  kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
    //방금선택한 위치의 지역구이름이 이미선택된 지역구이름과 같으면 아래 행위 안하도록
    
    console.log("prevName : "+prevName);
    console.log("name : "+name);
    

    //오버레이 형태 html로 구성
    customOverlay.setContent('<div class="area" pointer-events: none; >' + name + '</div>');

    customOverlay.setPosition(mouseEvent.latLng);//클릭했을때 마우스의 위치를 커스텀오버레이의 시작점으로 설정
    customOverlay.setMap(map); //오버레이드를 맵에 세팅

    if(prevName == name){
        return;
    }else{
        polygon.setOptions({ fillColor: '#09f' });  //폴리곤 색깔
        prevName = name;
    }
    
    
  });

  // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
  kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent) {
    customOverlay.setPosition(mouseEvent.latLng);
  });

  // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
  // 커스텀 오버레이를 지도에서 제거합니다
  kakao.maps.event.addListener(polygon, 'mouseout', function () {
    polygon.setOptions({ fillColor: '#fff' });
    customOverlay.setMap(null);
  });
   
  // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 해당 지역 확대를 확대   
  kakao.maps.event.addListener(polygon, 'click', function() {
    console.log("폴리곤이 이벤트 인식함");
    // 현재 지도 레벨에서 2레벨 확대한 레벨
    let level = map.getLevel() - 2;
    
    // 지도를 클릭된 폴리곤의 중앙 위치를 기준으로 확대
    map.setLevel(level, {anchor: centroid(points), animate:{
        duration: 350  // 확대 애니메이션 시간
    }});
    deletePolygon(polygons);
   
  });
 };


/* data는 gson의 feature*/
data.forEach((val) => {
  coordinates = val.geometry.coordinates;
  name = val.properties.SIG_KOR_NM;

  displayArea(coordinates, name);
});

function centroid(points){
   let i, j, len, p1, p2, f, area, x, y;
   
   area = x = y = 0;
   
   for(i = 0, len = points.length, j = len - 1; i < len; j = i++){
      p1 = points[i];
      p2 = points[j];
      
      f = p1.y * p2.x - p2.y * p1.x;
      x += (p1.x + p2.x) * f;
      y += (p1.y + p2.y) * f;
      area += f * 3;
   }
   return new kakao.maps.LatLng(x / area, y / area);
}

function deletePolygon(polygons){
   for(let i = 0; i < polygons.length; i++){
      polygons[i].setMap(null);
   }
   polygons = [];
}
//---------------

//2022.08.18 배성원. 마커 안쓸거기때문에 주석처리
// 지도를 클릭한 위치에 표출할 마커입니다
// var marker = new kakao.maps.Marker({ 
//     // 지도 중심좌표에 마커를 생성합니다 
//     position: map.getCenter() 
// }); 
// // 지도에 마커를 표시합니다
// marker.setMap(map)

kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    console.log("맵이 클릭 인식함");
    // 클릭한 위도, 경도 정보를 가져옵니다 
    var latlng = mouseEvent.latLng; 
    
    // 마커 위치를 클릭한 위치로 옮깁니다
    //marker.setPosition(latlng);
    
    var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
    message += '경도는 ' + latlng.getLng() + ' 입니다';
    
    var resultDiv = document.getElementById('clickLatlng'); 
    resultDiv.innerHTML = message;
    
});

//---------------
let pathData;

var request = new XMLHttpRequest();

request.open('GET', 'https://api.openrouteservice.org/v2/directions/cycling-regular?api_key=5b3ce3597851110001cf624888ae0402478a4e078fb90dfac4b683ab&start=8.681495,49.41461&end=8.687872,49.420318');

request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

request.send();

request.onload = () =>{
	if(request.status === 200){
		pathData = JSON.parse(request.responseText);
		console.log(pathData);
		console.log(pathData.bbox);
		console.log(pathData.features[0].geometry.coordinates);
	} else {
		console.log('Error', request.status, request.statusText);
	}
}

