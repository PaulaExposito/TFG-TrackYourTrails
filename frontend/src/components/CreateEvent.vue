<template>
	<div class="q-pa-md q-gutter-sm container">
    <q-btn icon="add" label="Crear evento" color="primary" @click="onPopup">
			<!-- <q-icon size="2em" name="add"></q-icon> -->
			<!-- <div class="new-event">Crear evento</div> -->
		</q-btn>

    <q-dialog v-model="popup">
      <q-card class="card">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Crear un evento</div>
          <q-space></q-space>
          <q-btn icon="close" flat round dense v-close-popup></q-btn>
        </q-card-section>

        <q-card-section>
					<q-form @submit="onSubmit" class="q-gutter-md form">
						<q-input id="title" filled v-model="title"
							label="Nombre del evento" lazy-rules />
						<q-input id="date" filled v-model="date" type="date"
							hint="Fecha del evento" lazy-rules />
						<q-input id="equipment" filled v-model="equipment"
							label="Equipamiento" lazy-rules />

						<div class="form-btn">
							<q-btn id="submit" icon="check" label="Añadir" type="submit" color="primary" v-close-popup/>
							<q-btn id="cancel" icon="close" label="Cancelar" color="primary" flat class="q-ml-sm" v-close-popup/>
						</div>
					</q-form>
				</q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { api } from '../boot/axios';
import { notifyWarning, notifyCreated } from '../boot/utils';

export default {
	name: "CreateEvent",
	data() {
		return {
			popup: false,
			title: null,
			date: null,
			equipment: null,
			id: null
		}
	},
	methods: {
		async onSubmit() {
			console.log("creando evento");

			await api.post('events', {
				"title": this.title,
				"date": this.date,
				"equipment": this.equipment,
				"users": [this.$store.getters.username],
				"active": true
			},
			{
				'Authorization': 'Bearer ' + this.$store.getters.token
			})
			.then(res => {
				if (res.status === 200)
					return res.data;
			})
			.then(data => {
				this.id = data._id;
				this.$emit("new-event");
				notifyCreated(this, "Event created");
			})
			.catch(err => {
				if (err.respose.status === 400) 
					notifyWarning(this, "Event already exists");
				else 
					notifyWarning(this, "Error desconocido");
			})

			api.put(`users/${this.$store.getters.username}/event`, 
				{ "event_id": this.id, "title": this.title },
				{ 'Authorization': 'Bearer ' + this.$store.getters.token })
				.then(res => {
					if (res.status == 200) {
						return res.data;
					}
				})
				.then(data => {
					console.log("evento añadido a un usuario");
					this.$emit("new-event");
				})
				.catch(err => {
					if (err.respose.status === 400) 
						notifyWarning(this, "Data is incomplete");
					else 
						notifyWarning(this, "Error desconocido");
				})
		},
		onPopup() {
			this.popup = true;
			this.title = null;
			this.date = null;
			this.equipment = null;
		},
	}
}
</script>

<style lang="scss" scoped>
// .container {
//   // background-color: green;
// }

.new-event {
  display: none;
  margin-left: 10px;
  margin-right: 5px;
}

.card {
	width: 100%;
	// height: 800px;
}

.form {
	margin: auto;
	margin-top: 30px;
	align-items: center;
	justify-content: center;
	width: 100%;
}

.form-btn {
	text-align: center;
	margin-bottom: 20px;
	margin-top: 30px;
}
</style>