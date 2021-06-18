<template>
	<div class="container" @click="openCard">
		<img src="../assets/event_logo.png">
		<p class="card-name">{{ id[0] }}</p>

		<q-dialog v-model="popup">
      <q-card class="card">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ event.title }}</div>
          <q-space></q-space>
          <q-btn icon="close" flat round dense v-close-popup></q-btn>
        </q-card-section>

        <q-card-section>
					<q-form @submit="onSubmit" class="q-gutter-md form">
						<p class="date">{{ event.date.toString().slice(0,10) }}</p>
						
						<p class="subtitle">Equipamiento</p>
						<p class="data">{{ event.equipment }}</p>
						
						<p class="subtitle">Van a ir...</p>
						<p class="data">{{ formatUsersString(event.users.toString().replace(/\,/g, ', ')) }}</p>

						<template v-if="$store.getters.token !== null"><div class="form-btn">
							<template v-if="isMyUserSubscribed === false">
								<q-btn id="submit" icon="check" label="Me apunto" type="submit" color="primary" v-close-popup/>
							</template>
							<template v-else>
								<q-btn id="cancel" icon="close" label="No puedo ir" type="submit" color="primary" flat class="q-ml-sm" v-close-popup/>
							</template>
						</div></template>
					</q-form>
				</q-card-section>
      </q-card>
    </q-dialog>
	</div>
</template>

<script>
import { api } from '../boot/axios';
import { notifyWarning } from '../boot/utils';
			
export default {
	name: "EventCard",
	props: {
		id: Array
	},
	data() {
		return {
			popup: false,
			event: {
				date: '',
				title: null,
				equipment: null,
				users: [],
			},
			isMyUserSubscribed: false
		}
	},
	methods: {
		openCard() {
			this.popup = true;
			this.getEventData();
		},
		getEventData() {
			api.get(`events/${this.id[1]}`)
				.then(res => {
					if(res.status === 200) {
						return res.data;
					}
				})
				.then(data => {
					this.event = data;
					if (data.users.includes(this.$store.getters.username))
						this.isMyUserSubscribed = true;
				})
				.catch(err => {
					notifyWarning(this, `Error desconocido ${err}`);					
				})
		},
		onSubmit() {
			api.put(`events/${this.id[1]}/user`, 
				{ "username": this.$store.getters.username }, 
				{ 'Authorization': 'Bearer ' + this.$store.getters.token })
				.then(res => {
					if (res.status === 200) {
						return res.data;
					}
				})
				.catch(err => {
					if (err.respose.status === 404)
						notifyWarning(this, `Evento no encontrado`);	
					else
						notifyWarning(this, `Error desconocido ${err}`);	
				});

			api.put(`users/${this.$store.getters.username}/event`,
				{ "event_id": this.id[1], "title": this.event.title },
				{ 'Authorization': 'Bearer ' + this.$store.getters.token })
				.then(res => {
					if (res.status == 200) {
						return res.data;
					}
				})
				.then(_ => {
					this.isMyUserSubscribed = !this.isMyUserSubscribed;
					this.$emit("new-event");
				})
				.catch(err => {
					if (err.respose.status === 400) 
						notifyWarning(this, "Faltan datos por rellenar");
					else 
						notifyWarning(this, `Error desconocido ${err}`);
				})
		},
		formatUsersString(str) {
			let index = str.lastIndexOf(','); 
			if (this.event.users.length <= 1)
				return str;
			return str.substring(0, index) + ' y' + str.substring(index + 1, str.length);
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
  justify-content: center;
  width: 150px;
  box-shadow: 1px 1px 12px 1px rgba(0,0,0,0.8);
  border-radius: 8px;
  overflow: hidden;
	margin-right: 20px;
	margin-bottom: 30px;
	background-color: #ffffff;
}

img {
  width: 100%;
  height: auto;
  background-repeat: no-repeat;
  background-size: contain;
}

q-dialogue {
	margin: 20px;
}

.card-name {
  text-align: center;
  margin-bottom: 10px;
}

.card {
	width: 500px;
}

.date {
	margin-bottom: 20px;
}

.subtitle {
	font-weight: bold;
	margin-top: 20px;
}

.form-btn {
	text-align: center;
}
</style>