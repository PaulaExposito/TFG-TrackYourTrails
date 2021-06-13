<template>
	<div class="container">
		<h4> ¿Qué ruta quieres hacer hoy? </h4>
		<div class="cards">
			<TrailCard v-for="(i,j) in trails" :key="j" :name="i"></TrailCard> 
		</div>
	</div>
</template>

<script>
import TrailCard from '../components/TrailCard.vue';

export default {
	name: "Explore",
	components: {
		TrailCard
	},
	data() {
		return {
			trails: ["La Caldera", "Subida al Teide", "7 cañadas", "Mazca", "Las arañas"]
		}
	},
}
</script>

<style scoped lang="scss">
.container {
	text-align: center;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>