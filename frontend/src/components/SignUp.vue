<template>
	<div class="container">   
			<h3>Regístrate</h3>

			<div align="center" class="q-pa-md" style="max-width: 400px">

				<q-form
					@submit="onSubmit"
					@reset="onReset"
					class="q-gutter-md"
				>
					<q-input
						filled
						v-model="name"
						label="Username"
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
						<q-btn label="Submit" type="submit" color="primary"/>
						<q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
					</div>
				</q-form>
			</div>
	</div>
</template>

<script>

import { api } from '../boot/axios'

export default {
  name: 'SignIn',
	data() {
		return {
			name: null,
      password: null,
      repeatPassword: null,
      accept: false,
		}
	},
	methods: {
	  onSubmit () {
      if (this.password === this.repeatPassword) {
        if (this.accept !== true) {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Debes aceptar las condiciones y términos de uso'
          })
        }
        else {

          this.createUser()

          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Cuenta creada'
          })
        }
      }
      else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Las contraseñas no coinciden'
        })
      }
    },
    onReset () {
      this.name = null
      this.password = null
      this.repeatPassword = null
      this.accept = false
    },
    createUser() {
      // fetch("http://localhost:3000/api/users")
      //   .then(res => { return res.json() })
      //   .then(data => { console.log(`data = ${data}`) })
      //   .catch(err => console.log(err))

			api.post('/users', {
				username: this.username,
				password: this.password
			})
				.then( res => {
					console.log(res)
					return res.json()
				})
				.then(data => {
					console.log(`data = ${data}`)
				})
				.catch(err => console.log(err))
		}
	}
}
</script>
