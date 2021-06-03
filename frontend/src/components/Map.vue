<template>
  <div class="container">
      <div class="map" id="mymap">hfdhfdhrrs</div> 
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: "Map",
	mounted() {
		var mymap = L.map('mymap').setView([51.505, -0.09], 13);
		L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1,
			accessToken: 'pk.eyJ1IjoicGF1bGFleHBvc2l0byIsImEiOiJja3BmdzVoMGQyNWw4Mm9sbG90M3ZheGF5In0.XQxfMHPHwBCKiwHUsTUovg'
		}).addTo(mymap);
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
	/* flex-direction: row; */
	/* align-items: center; */
	/* justify-content: center; */
	width: 100%;
	height: 500px;
	background-color: grey;
}
</style>

















<!--
<template>
  <div class="basemap grid-container container">
		< !-- <LMap ref="map" @ready="mapReady()"></LMap> - ->

		< !-- <div id='map'></div> - ->

		 <div id="mymap"></div>

		 <h4> {{ height }} x {{ width }} </h4>

	</div>
</template>

<script>
// import mapboxgl from "mapbox-gl";

import mapboxgl from 'mapbox-gl';
// import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
// import { LMap } from 'vue2-leaflet';

import L from 'leaflet';
// import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';


export default {
  name: "BaseMap",
  data() {
    return {
      accessToken: 'pk.eyJ1IjoicGF1bGFleHBvc2l0byIsImEiOiJja3BmcnBuYWIyOHpyMnlvZ2p3cDc5bDZ4In0.8Ks1TVAp8EbEiaQH7w0hOA',
    };
  },
	components: {
    // LMap,
    // LTileLayer,
    // LMarker,
  },
	data() {
		return {
			x: 0,
			y: 0,
			height: window.innerHeight,
			width: window.innerWidth
		}
	},
	methods: {

		mapReady() {
			console.log("mapa ready")

			console.log(this.$refs.map.mapObject)
		},

		// getWindowWidth() {
		// 	this.x = this.$refs.prev.clientWidth;
		// }





	},
  mounted() {

		// this.getWindowWidth();
		let map = document.getElementById("mymap");
		// map.clientHeight = this.height * 0.75;
		// map.clientWidth = this.width;

		console.log(map)
		console.log(`window = ${this.height}x${this.width}`);
		console.log(`map 1 = ${map.clientHeight}x${map.clientHeight}`);

		map.setAttribute('width', 1000);
		map.setAttribute('height', 3000);
		
		this.$forceUpdate();


		console.log(`map 2 = ${map.clientHeight}x${map.clientHeight}`);

		var mymap = L.map('mymap').setView([51.505, -0.09], 13);
		L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1,
			accessToken: 'pk.eyJ1IjoicGF1bGFleHBvc2l0byIsImEiOiJja3BmdzVoMGQyNWw4Mm9sbG90M3ZheGF5In0.XQxfMHPHwBCKiwHUsTUovg'
		}).addTo(mymap);

    // mapboxgl.accessToken = this.accessToken;

		// console.log("mapa")
		// console.log(L.map)

		// // L.mapbox.accessToken =  'pk.eyJ1IjoicGF1bGFleHBvc2l0byIsImEiOiJja3BmcnBuYWIyOHpyMnlvZ2p3cDc5bDZ4In0.8Ks1TVAp8EbEiaQH7w0hOA';

		// console.log("token asignado")

		// L.map('map').setView([51.505, -0.09], 13);

		// var map = L.mapbox.map('map')
		// 	.setView([40, -74.50], 9)
		// 	.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

    // new mapboxgl.Map({
    //   container: "mapContainer",
    //   style: "mapbox://styles/mapbox/streets-v11",
    //   center: [103.811279, 1.345399],
    //   zoom: 12,
    //   maxBounds: [
    //     [103.6, 1.1704753],
    //     [104.1, 1.4754753],
    //   ],
    // });

		// mapboxgl.accessToken = 'pk.eyJ1IjoicGF1bGFleHBvc2l0byIsImEiOiJja3BmdzVoMGQyNWw4Mm9sbG90M3ZheGF5In0.XQxfMHPHwBCKiwHUsTUovg'; 
    // var map = new mapboxgl.Map({
    //   container: 'map',
    //   // Replace YOUR_STYLE_URL with your style URL.
    //   // style: 'YOUR_STYLE_URL', 
    //   center: [-87.661557, 41.893748],
    //   zoom: 10.7
    // });
  },
};
</script>


<style lang="scss">

.container {
	background-color: green;
	height: 100%;
	width: 100%;
}

// .grid-container {
//   display: grid;
//   grid-template-columns: 60% 40%;
//   grid-template-rows: 100vh;
//   gap: 0px 0px;
//   grid-template-areas:
//     ". .";
// }

#mymap { 
	background-color: indianred;
	// min-height: 100px;
	// min-width: 100px;
}

</style>

-->