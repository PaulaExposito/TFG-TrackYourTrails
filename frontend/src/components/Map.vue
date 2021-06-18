<template>
  <div class="container">
		<div class="map" id="map" /> 
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mapState } from 'vuex';

export default {
  name: "Map",
	data() {
		return {
			map: null,
			route: null,
			icon: null,
			currentLocation: null,
			currentLocationMarker: null
		}
	},
	computed: mapState(['lastPoint']),
	mounted() {
		this.createIcon();
		this.createMap();
		this.unsubscribe = this.$store.subscribe((mutation, state) => {
			let auxPoints = this.$store.getters.lastPoint;
			if(mutation.type === 'setLastPoint') {
				this.paintPoints({
					"latitude": auxPoints[0],
					"longitude": auxPoints[1]
				});
			}
		});
	},
	beforeDestroy() {
		this.unsubscribe();
		this.map = null;
	},
	methods: {
		createMap() {
			navigator.geolocation.getCurrentPosition( (crd) => {
				this.currentLocation = [crd.coords.latitude, crd.coords.longitude];
				this.map = L.map('map').setView(this.currentLocation, 16);
				L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
					attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
					id: 'mapbox/streets-v11',
					tileSize: 512,
					zoomOffset: -1,
					accessToken: 'pk.eyJ1IjoicGF1bGFleHBvc2l0byIsImEiOiJja3BmdzVoMGQyNWw4Mm9sbG90M3ZheGF5In0.XQxfMHPHwBCKiwHUsTUovg'
				}).addTo(this.map);

				this.route = L.polyline([this.currentLocation], {color: '#1976D2'}).addTo(this.map);

				if (this.icon != null) 
					this.currentLocationMarker = L.marker(this.currentLocation, { icon: this.icon }).addTo(this.map);
			}, 
			() => {console.log("Error al capturar la ubicación")}, 
			{
        enableHighAccuracy: false,
        timeout: 5000,
        maximunAge: 0
      })
		},
		createIcon() {
			this.icon = L.icon({
				iconUrl: 'http://photos1.blogger.com/blogger/4638/615/200/punto%20azul.png',
				iconSize:     [20, 20], // size of the icon
				iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
				popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
			});
		},
		paintPoints(lastPoint) {
			if (this.map == null) {
				this.createMap()
			}

			this.map.removeLayer(this.currentLocationMarker);
			this.currentLocation = [lastPoint.latitude, lastPoint.longitude];
			this.route.addLatLng(this.currentLocation);

			this.currentLocationMarker = L.marker(this.currentLocation, { icon: this.icon }).addTo(this.map);
			this.map.setView(this.currentLocation);
		},
	}
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.map {
	display: flex;
	width: 100%;
	height: 500px;
	background-color: grey;
}
</style>

