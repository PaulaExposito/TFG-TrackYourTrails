<template>
	<div class="container">   
    <h3>Login</h3>

    <div align="center" class="q-pa-md" style="width: 400px">

      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="username"
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
            val => val.length >= 4 ||'La contraseña debe tener al menos 4 caracteres'
          ]"
        />

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
import { notifyWarning, notifyCreated } from '../boot/utils'

export default {
  name: 'LogIn',
  data () {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    onSubmit () {
			this.logUser()
    },
    onReset () {
      this.name = null
      this.password = null
    },
		logUser () {
			api.put('login', {
				username: this.username,
				password: this.password
			})
      .then(res => {
        if (res.status == 200)
          return res.data
      })
			.then(data => {
				this.$store.dispatch('signInAction', {
					token: data.token
				});
				notifyCreated(this, "Usuario loggeado");
				this.$router.push('/');
			})
			.catch(err => {
				console.log(err)
				if (err.status == 409) 
					notifyWarning(this, 'Falta el usuario y la contraseña');
				else if (err.status == 404)
					notifyWarning(this, 'Este usuario no existe');
				else if (err.status == 401)
					notifyWarning(this, 'Contraseña incorrecta');
				else 
					notifyWarning(this, 'Error en el servidor');
			})
		}
  }
}
</script>
