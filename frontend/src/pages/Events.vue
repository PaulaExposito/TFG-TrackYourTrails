<template>
	<div class="container">
		<div class="content">
			<div class="header">
				<h3> Eventos </h3>
				<!-- <q-btn color="teal">
					<q-icon size="2em" name="add"></q-icon>
					<div class="new-event">Nuevo evento</div>
				</q-btn> -->
				<template v-if="$store.getters.token !== null">
					<CreateEvent @new-event="updateEvents"></CreateEvent>
				</template>
			</div>
			<hr/>

			<template v-if="$store.getters.token !== null">
				<h4>Mis eventos</h4>
				<!-- <hr/> -->
				<div class="cards"><EventCard @new-event="updateEvents" v-for="(i,j) in myEvents" :key="j" :id="i"></EventCard></div>
				<h4>Todos los eventos</h4>
				<!-- <hr/> -->
			</template>
			<div class="cards"><EventCard @new-event="updateEvents" v-model="allEvents" v-for="(k,l) in allEvents" :key="l" :id="k"></EventCard></div>
		</div>
	</div>
</template>

<script>
import { api } from '../boot/axios';
import { notifyWarning, notifyCreated } from '../boot/utils';

import EventCard from '../components/EventCard.vue';
import CreateEvent from '../components/CreateEvent.vue';

export default {
	name: "Events",
	components: {
		EventCard,
		CreateEvent
	},
	data() {
		return {
			myEvents: [],
			allEvents: []
		}
	},
	mounted() {
		console.log("mounted");

		if (this.$store.getters.token !== null)
			this.getUserEvents();
		this.getEvents();
	},
	methods: {
		getUserEvents() {
			api.get(`users/${this.$store.getters.username}`, null, { 'Authorization': 'Bearer ' + this.$store.getters.token })
				.then(res => {
					if (res.status === 200) {
						return res.data;
					}
				})
				.then(data => {
					console.log(`myEvents: ${data.events}`)
					this.myEvents = [];
					for (let [key, value] of Object.entries(data.events)) {
						console.log(`for: ${value.title} y ${value.eventId}`)
						this.myEvents.push([value.title, value.eventId]);
					}
				})
				.catch(err => {
					if (err.respose.status === 400) 
						notifyWarning(this, "Data is incomplete");
					else 
						notifyWarning(this, "Error desconocido");
				})
		},
		getEvents() {
			api.get('events')
				.then(res => {
					if (res.status === 200) {
						return res.data;
					}
				})
				.then(data => {
					this.allEvents = [];
					for (let [key, value] of Object.entries(data.events)) {
						this.allEvents.push([value.title, value._id]);
					}
				})
				.catch(err => {
					if (err.respose.status === 400) 
						notifyWarning(this, "Data is incomplete");
					else 
						notifyWarning(this, "Error desconocido");
				})
		},
		updateEvents() {
			console.log("updated");
			this.getEvents();
			this.getUserEvents();		// No hace falta if porque si se actualiza es porque el usuario está logueado
		}
	},
}
</script>

<style lang="scss" scoped>

.container {
	display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
	padding-top: 80px;
  width: 90%;
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
	margin-bottom: 10px;
}

.cards {
	padding: 10px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.new-event {
  display: none;
  margin-left: 10px;
  margin-right: 5px;
}

@media screen and (min-width: 800px) {
	.content {
		width: 65%;
	}

	.new-event {
		display: block;
	}

	.cards {
		justify-content: left;
	}
}
</style>