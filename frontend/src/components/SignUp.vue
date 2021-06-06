<template>
	<div class="container">   
		<br><h3>Regístrate</h3>

		<div align="center" class="q-pa-md form" style="width: 400px">

			<q-form
				@submit="onSubmit"
				@reset="onReset"
				class="q-gutter-md"
			>
				<q-input
					filled
					v-model="username"
					label="Usuario"
					lazy-rules
					:rules="[ val => val && val.length > 0 || 'Introduce un nombre de usuario']"
				/>

				<q-input
					filled
					type="password"
					v-model="password"
					label="Contraseña"
					lazy-rules
					:rules="[
						val => val !== null && val !== '' || 'Introduce una contraseña',
						val => val.length >= 4 ||'La consetraseña debe tener al menos 4 caracteres'
					]"
				/>

				<q-input
					filled
					type="password"
					v-model="repeatPassword"
					label="Repite la contraseña"
					lazy-rules
					:rules="[
						val => val !== null && val !== '' || 'Introduce una contraseña',
						val => val.length >= 4 ||'La contraseña debe tener al menos 4 caracteres'
					]"
				/>

				<q-toggle v-model="accept" label="Acepto las condiciones y términos de uso" />

				<div>
					<q-btn label="Submit" type="submit" color="secondary"/>
					<q-btn label="Reset" type="reset" color="secondary" flat class="q-ml-sm" />
				</div>
			</q-form>
		</div>
	</div>
</template>

<script>

import { api } from '../boot/axios'
import { notifyWarning, notifyCreated } from '../boot/utils'

export default {
  name: 'SignIn',
	data() {
		return {
			username: null,
      password: null,
      repeatPassword: null,
      accept: false,
		}
	},
	methods: {
	  onSubmit () {
      if (this.password === this.repeatPassword) {
        if (this.accept !== true) 
					notifyWarning(this, 'Debes aceptar las condiciones y términos de uso')
        else 
          this.createUser()
      }
      else
          notifyWarning(this, 'Las contraseñas no coinciden')
    },
    onReset () {
      this.name = null
      this.password = null
      this.repeatPassword = null
      this.accept = false
    },
    createUser() {
			api.post('/signup', {
				username: this.username,
				password: this.password
			})
				.then(res => {
					if (res.status == 201)
						return res.data
				})
				.then(data => {
					this.$store.dispatch('signInAction', {
						token: data.token
					})

					notifyCreated(this, 'Usuario creado')
					this.$router.push('/')
				})
				.catch(err => {
					if (err.status == 409)
						notifyWarning(this, 'Este usuario ya existe')
					else 
						notifyWarning(this, 'Error en el servidor')
				})
		}
	}
}
</script>

<style lang="scss" scoped>
.form {
  background-color: rgba(233, 233, 233, 0.95);
}

h3 {
  filter: drop-shadow(0 0 7px white);
}
</style>