<template>
	<div class="container">
		<div class="header">
			<h3 class="title">{{ trail.title }}</h3>
		</div>
		<div class="content">
			<h4>Descripción</h4>
			{{ trail.description }}
			<h4>Datos</h4>
			<b>Longitud:</b> {{ trail.distance.toFixed(3) }} km <br>
			<b>Tiempo:</b> {{ parseTime() }} 
			
			<h4>Ubicación</h4>
			<MapOverview :points="trail.points"></MapOverview>
		</div>
	</div>
</template>

<script>
import { api } from '../boot/axios';
import { notifyWarning } from '../boot/utils';

import MapOverview from '../components/MapOverview.vue';

export default {
	name: "Trail",
	components: {
		MapOverview
	},
	data() {
		return {
			trail: {
				user: null,
				title: null,
				description: null,
				date: null,
				distance: 0,
				time: 0,
				points: []
			}
		}
	},
	mounted() {
		this.getTrail(this.$store.getters.id);
	},
	methods: {
		getTrail(trailId) {
			api.get(`trails/${trailId}`) 
				.then(res => {
					if (res.status == 200) {
						return res.data;
					}
				})
				.then(data => {
					this.trail = data;
					this.$store.dispatch('setPointsAction', this.trail.points)
				})
				.catch(err => {
					if (err.respose.status === 404)
						notifyWarning(this, "Ruta no encontrada");
					else	
						notifyWarning(this, `Error desconocido: ${err}`);
				})
		},
		parseTime() {
			let hh = parseInt(this.trail.time / (60 * 60));
			let mm = parseInt((this.trail.time / 60) % 60);
			let ss = this.trail.time % 60;
	
			return (hh < 10 ? `0${hh}` : hh) + ":" + (mm < 10 ? `0${mm}` : mm) + ":" + (ss < 10 ? `0${ss}` : ss);
		}
	},
	beforeDestroyed() {
		this.$store.dispatch('setTrailAction', { "id": null });
	},
}
</script>

<style scoped lang="scss">
.container {
	display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  height: 300px;
	width: 100%;
  
  background-image: url(https://live.staticflickr.com/65535/50449655752_aa0c9361c5_b.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 1px 1px 12px 1px rgba(0,0,0,0.8);
	overflow: hidden;

  display: flex;
  align-items: flex-end;
}

.title {
  height: 30%;
  width: 100%;
	background-color: rgba(0, 0, 0, 0.75);
  
  color: white;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
	
	padding: 0;
	margin: 0;
  padding-left: 12.5%;
}

.content {
  width: 75%;
}

@media screen and (min-width: 800px) {
	.content {
		width: 50%;
	}
	
	.title {
		padding-left: 25%;
	}
}
</style>