/* Con esta función inicializaremos nuestro mapa,
mostrandolo en el div con id map*/
function initMap(){
	var map = new google.maps.Map(document.getElementById("map"),{
		/* representa el nivel de profundidad de nuestro mapa,
		entre más zoom mas localizado se verá */
		zoom: 5,
		/* contiene la longitud y latitud en que queremos
		que se muestre nuestro mapa*/
		center: {lat: -9.1191427, lng: -77.0349046},
		mapTypeControl: false,
		zoomControl: false,
		streetViewControl: false
	});
	function buscar(){
		if(navigator.geolocation){
			/* Permite al usuario obtener su ubicacion actual,
			el parametro funcionExito se ejecuta solo cuando el usuario
			comparte su ubicacion, mientras que funcionerror se ejecuta 
			cuando se produce un error en la geolocalizacion */
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
		}
	}
	document.getElementById("encuentrame").addEventListener("click",buscar);
	var latitud, longitud;
	/*con esta var obtendremos nuestra latitud o longitud
	y además crearemos un marcador de nuestra ubicación*/
	var funcionExito = function(posicion){
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

		var miUbicacion = new google.maps.Marker({
			position: {lat:latitud, lng:longitud},
			animation: google.maps.Animation.DROP,
			map: map
		});
		map.setZoom(17);
		map.setCenter({lat:latitud, lng:longitud});
	}
	var funcionError = function(error){
		alert("Tenemos un problema con encontrar tu ubicación");
	}
}