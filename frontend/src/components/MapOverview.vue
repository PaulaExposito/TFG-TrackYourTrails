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
  name: "MapOverview",
	data() {
		return {
			map: null,
			route: null,
      coords: null
		}
	},
  computed: mapState(['points']),
	mounted() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if(mutation.type === 'setPoints') {
        this.coords = this.$store.getters.points;
    		this.createMap();
      }
    });
	},
	beforeDestroy() {
		this.map = null;
    this.unsubscribe();
	},
	methods: {
		createMap() {
      let initCoords = [this.coords[0].latitude, this.coords[0].longitude];
      this.map = L.map('map').setView(initCoords, 16);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoicGF1bGFleHBvc2l0byIsImEiOiJja3BmdzVoMGQyNWw4Mm9sbG90M3ZheGF5In0.XQxfMHPHwBCKiwHUsTUovg'
      }).addTo(this.map);

      this.route = L.polyline(this.parseCoords(), {color: '#1976D2'}).addTo(this.map);

		},
    parseCoords() {
      let arr = [];
      for (let i of this.coords)
        arr.push([i.latitude, i.longitude]);

      return arr;
    }
	}
};
</script>

<style scoped>
.map {
	width: 75%;
	height: 300px;
	background-color: grey;
  margin-bottom: 50px;
}

@media screen and (min-width: 800px) {
  .map {
    width: 95%;
  }
}
</style>

