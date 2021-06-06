<template>
	<div class="container">
		<div class="content">
			<div class="header">
				<h3> Eventos </h3>
				<q-btn color="teal">
					<q-icon size="2em" name="add"></q-icon>
					<div class="new-event">Nuevo evento</div>
				</q-btn>
			</div>
			<hr/>
			<h4>Mis eventos</h4><hr/>
			<div class="cards"><EventCard v-for="(i,j) in myEvents" :key="j" :id="i"></EventCard></div>
			<h4>Todos los eventos</h4><hr/>
			<div class="cards"><EventCard v-for="(k,l) in allEvents" :key="l" :id="k"></EventCard></div>
		</div>
	</div>
</template>

<script>
import EventCard from '../components/EventCard.vue';

export default {
	name: "Events",
	components: {
		EventCard
	},
	data() {
		return {
			myEvents: ["Bajada de Mazca (3/7/21)"],
			allEvents: ["Bajada de Mazca (3/7/21)", "7 cañadas (26/6/21)", "Circular montaña el Socorro (9/6/21)"]
		}
	}
}
</script>

<style lang="scss" scoped>

.container {
	display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  width: 75%;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 30px;
}

h3 {
  margin: 0;
}

h4 {
	margin-bottom: 0;
}

.cards {
	padding: 10px;
	display: flex;
	flex-wrap: wrap;
}

.new-event {
  display: none;
  margin-left: 10px;
  margin-right: 5px;
}

@media screen and (min-width: 800px) {
	.content {
		width: 50%;
	}

	.new-event {
		display: block;
	}
}
</style>