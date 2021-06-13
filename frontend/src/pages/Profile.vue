<template>
	<div class="container">

		<div class="data">
			<div class="flex">
				<div class="q-pa-md q-gutter-sm image">
					<q-avatar size="150px">
						<img src="https://img.icons8.com/color/452/avatar.png">
					</q-avatar>	
				</div>
				<div class="names">
					<h3>{{ name }}</h3>
					<h4>{{ user.username }}</h4>
				</div>
			</div>
			<div class="statistics flex">
				<div class="box">Distancia<div class="number">{{ user.statistics.distance }} m</div></div>
				<div class="line"></div>
				<div class="box">Tiempo<div class="number">{{ user.statistics.time }} min</div></div>
				<div class="line"></div>
				<div class="box">Rutas<div class="number">{{ user.statistics.numberOfRegisters }}</div></div>
			</div>
		</div>

		<q-form @submit="onModify" @reset="onReset" class="q-gutter-md form">

			<q-input square filled v-model="user.username" label="Username" />
			<q-input square filled v-model="user.email" label="Correo electrónico" />
			<q-input square filled v-model="user.firstName" label="Nombre" />
			<q-input square filled v-model="user.lastName" label="Apellidos" />
			<q-input square filled v-model="user.password" label="Contraseña" type="password" />
			<q-input square filled v-model="user.phone" label="Teléfono" />

			<div class="form-btn">
				<q-btn id="modify" label="Guardar cambios" type="submit" color="secondary"/>
				<q-btn id="reset" label="Reset" type="reset" color="secondary" flat class="q-ml-sm" />
			</div>
		
		</q-form>

		<div class="logout-btn">
			<q-btn rounded dense color="primary" label="Cerrar sesión" id="exit-btn" @click="logout"/>
			<q-btn rounded dense color="dark" label="Eliminar cuenta" id="delete-btn" @click="deleteAccount"/>
		</div>	
	</div>
</template>

<script>
import { api } from '../boot/axios';

export default {
	name: "Profile",
	data() {
		return {
			user: {
				username: this.$store.getters.username,
				email: null,
				firstName: null,
				lastName: null,
				password: null,
				phone: null,
				statistics: {
					distance: null,
					time: null,
					numberOfRegisters: null
				}
			},
			config: null,
			name: null
		}
	},
	mounted() {
		console.log("mounted")
		this.config = {
			'Authorization': 'Bearer ' + this.$store.getters.token
		}
		this.getData();
	},
	methods: {
		getData() {
			console.log("get")

			api.get(`users/${this.$store.getters.username}`, null, this.config)
				.then(res => {
					if (res.status == 200)
						return res.data;
				})
				.then(data => {
					this.user = data;

					if (data.firstName !== undefined) 
						this.name = data.firstName + ' ';

					if (data.lastName !== undefined)
						this.name += data.lastName;

					console.log(data)
					console.log('nombre ' + this.name)
				})
				.catch(err => {
					if (err.response.status == 400)
						console.log("Usuario no encontrado");
					else
						console.log("Error desconocido");
				})
		},
		onModify() {
			console.log("Modify user " + this.$store.getters.username);

			api.put(`users/${this.$store.getters.username}`, this.user, this.config)
				.then(res => {
					if (res.status == 200)
						return res.data;
				})
				.then(data => {
					this.user = data;

					console.log(data)
					if (data.firstName !== undefined) 
						this.name = data.firstName + ' ';

					if (data.lastName !== undefined)
						this.name += data.lastName;

					if (this.$store.getters.username !== data.username)
						this.$store.dispatch('setUsernameAction', data.username);
				})
				.catch(err => {
					if (err.response.status == 400)
						console.log("Nombre de usuario no disponible");
					else
						console.log("Error desconocido");
				})
		},
		onReset() {
			console.log("reset");
			this.getData();
		},
		logout() {
			console.log("cerrar sesion");
			api.put('logout', { "username": this.$store.getters.username }) 
				.then(res => {
					if (res.status == 200) {
						this.$store.dispatch('logOutAction');
						this.$router.push('/register');
					}
				})
				.catch(err => {
					if (err.response.status == 400)
						console.log("No hay ningún usuario logueado");
					else
						console.log("Error desconocido");
				})
		},
		deleteAccount() {
			console.log("eliminar cuenta");
			api.delete(`users/${this.$store.getters.username}`, null, this.config) 
				.then(res => {
					if (res.status == 200) {
						this.$store.dispatch('logOutAction');
						this.$router.push('/register');
					}
				})
				.catch(err => {
					if (err.response.status == 400)
						console.log("No hay ningún usuario logueado");
					else
						console.log("Error desconocido");
				})
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	align-items: center;
}

.data {
	padding-top: 80px;
	background-color: #e66b45;
}

.names h3 { margin-bottom: 0; }
.names h4 {	margin-top: 0; }

.statistics {
	display: flex;
	font-size: 20px;
	padding-bottom: 30px;
}

.line {
	height: 50px;
	width: 2px;
	background-color: $dark;
	
	margin-left: 50px;
	margin-right: 50px;
}

.flex {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;	
}

.box {
	text-align: center;
}

.number {
	font-weight: bold;
	font-size: 30px;
}

.form {
	margin: auto;
	margin-top: 30px;
	align-items: center;
	justify-content: center;
	width: 85%;
}

q-input {
	width: 90%;
}

.form-btn {
	text-align: center;
}

.logout-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
}

#exit-btn {
	margin-top: 35px;
	padding: 3px;
	width: fit-content;
}

#delete-btn {
	margin-top: 10px;
	padding: 3px;
	margin-bottom: 50px;
	width: fit-content;
}

@media screen and (min-width: 800px) {
	q-input {
		width: 50%;
	}

	.form {
		width: 50%;
	}
}
</style>