/* Con esta función inicializaremos nuestro mapa,
mostrandolo en el div con id map*/
function initMap(){
	var map = new google.maps.Map(document.getElementById("map"),{
		/* representa el nivel de profundidad de nuestro mapa,
		entre más zoom mas localizado se verá */
		zoom: 10,
		/* contiene la longitud y latitud en que queremos
		que se muestre nuestro mapa*/
		center: {lat: -9.1191427, lng: -77.0349046},
		mapTypeControl: false,
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
	 new AutocompleteDirectionsHandler(map);
}


function AutocompleteDirectionsHandler(map) {
          this.map = map;
          this.originPlaceId = null;
          this.destinationPlaceId = null;
          this.travelMode = 'WALKING';
          var originInput = document.getElementById('origin-input');
          var destinationInput = document.getElementById('destination-input');
          var modeSelector = document.getElementById('mode-selector');
          this.directionsService = new google.maps.DirectionsService;
          this.directionsDisplay = new google.maps.DirectionsRenderer;
          this.directionsDisplay.setMap(map);

          var originAutocomplete = new google.maps.places.Autocomplete(
            originInput, {placeIdOnly: true});
          var destinationAutocomplete = new google.maps.places.Autocomplete(
            destinationInput, {placeIdOnly: true});

          this.setupClickListener('changemode-walking', 'WALKING');
          this.setupClickListener('changemode-transit', 'TRANSIT');
          this.setupClickListener('changemode-driving', 'DRIVING');

          this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
          this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

          this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
          this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
          this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
        }

      // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
      AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
        var radioButton = document.getElementById(id);
        var me = this;
        radioButton.addEventListener('click', function() {
          me.travelMode = mode;
          me.route();
        });
      };

      AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
        var me = this;
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.");
            return;
          }
          if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
          } else {
            me.destinationPlaceId = place.place_id;
          }
          me.route();
        });

      };

      AutocompleteDirectionsHandler.prototype.route = function() {
        if (!this.originPlaceId || !this.destinationPlaceId) {
          return;
        }
        var me = this;

        this.directionsService.route({
          origin: {'placeId': this.originPlaceId},
          destination: {'placeId': this.destinationPlaceId},
          travelMode: this.travelMode
        }, function(response, status) {
          if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      };