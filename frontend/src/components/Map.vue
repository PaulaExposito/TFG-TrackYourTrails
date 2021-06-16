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
		}
	},
	computed: mapState(['points']),
	mounted() {
		this.createMap();
	// },
	// created() {
		this.unsubscribe = this.$store.subscribe((mutation, state) => {
			if(mutation.type === 'setPoints') {
				console.log("if")
				// this.paintPoints();
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
				this.map = L.map('map').setView([crd.latitude, crd.longitude], 13);
				L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
					attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
					id: 'mapbox/streets-v11',
					tileSize: 512,
					zoomOffset: -1,
					accessToken: 'pk.eyJ1IjoicGF1bGFleHBvc2l0byIsImEiOiJja3BmdzVoMGQyNWw4Mm9sbG90M3ZheGF5In0.XQxfMHPHwBCKiwHUsTUovg'
				}).addTo(this.map);
			}, 
			() => {console.log("error")}, 
			{
        enableHighAccuracy: false,
        timeout: 5000,
        maximunAge: 0
      })
		},
		paintPoints() {
			if (this.map == null) {
				this.createMap()
			}
			
			// var crd = pos.coords;

			// var icon = L.icon({
			// 	iconUrl: 'http://www.carpiocastillo.com/wp-content/uploads/2019/03/f5b328d99c.png',
			// 	// shadowUrl: 'https://lh3.googleusercontent.com/proxy/OGe1mSweBOUxfVynhqNtu73No209VY0An9CukKqySEinh6jnBoqeaINq-3wdILUrsjPbi4HJZXCZJQRVRr6cSObOEUjvO30kkP-_UbPaGrupZSDI3OMAmX4jpR3_p5m5WA',

			// 	iconSize:     [50, 64], // size of the icon
			// 	// shadowSize:   [50, 64], // size of the shadow
			// 	iconAnchor:   [25, 64], // point of the icon which will correspond to marker's location
			// 	// shadowAnchor: [4, 62],  // the same for the shadow
			// 	popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
			// });

			// // Comprobar si es la primera vez
			// // let lat = 28.3811263
			// // let lon = -16.524774			
			// let lat = crd.latitude
			// let lon = crd.longitude


			// L.marker([crd.latitude, crd.longitude], {icon: icon}).addTo(this.map);
			// console.log(`${crd.latitude} - ${crd.longitude}`);
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
	background-color: blueviolet;
}

.map {
	display: flex;
	width: 100%;
	height: 500px;
	background-color: grey;
}
</style>

