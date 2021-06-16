<template>
	<div class="container">
		<h4> ¿Qué ruta quieres hacer hoy? </h4>
		<template v-if="$store.getters.username != null"><h5 @click="goToMyTrails"> Ver mis rutas </h5></template>
		<div class="cards">
			<TrailCard v-for="(i,j) in trails" :key="j" :trail="i"></TrailCard> 
		</div>
	</div>
</template>

<script>
import { api } from '../boot/axios';
import { notifyWarning } from '../boot/utils';

import TrailCard from '../components/TrailCard.vue';

export default {
	name: "Explore",
	components: {
		TrailCard
	},
	data() {
		return {
			trails: []
		}
	},
	mounted() {
		this.getTrails();
	},
	methods: {
		goToMyTrails() {
			this.$router.push('/mytrails');
		},
		getTrails() {
			api.get('trails') 
				.then(res => {
					if (res.status === 200)
						return res.data;
				})
				.then(data => {
					this.trails = [];
					for(let [key, value] of Object.entries(data.trails)) {
						this.trails.push([value._id, { "title": value.title, "distance": value.distance, "time": value.time }]);
					}
				})
				.catch(err => {
					notifyWarning(this, `Error desconocido ${err}`);
				})
		}
	}
}
</script>

<style scoped lang="scss">
.container {
	text-align: center;
	padding-top: 80px;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

h5 {
	color: $primary;
}
</style>