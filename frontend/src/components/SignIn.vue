<template>
	<div class="container">   
    <br><h3 id="title">Login</h3>

    <div align="center" class="q-pa-md form" style="width: 400px">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          id="username"
          filled
          v-model="username"
          label="Usuario"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Introduce un nombre de usuario']"
        />

        <q-input
          id="password"
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
          <q-btn id="submit" label="Login" type="submit" color="secondary"/>
          <q-btn id="reset" label="Reset" type="reset" color="secondary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>

import { api } from '../boot/axios';
import { notifyWarning, notifyCreated } from '../boot/utils';

export default {
  name: 'LogIn',
  data () {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    onReset () {
      this.username = null;
      this.password = null;
    },
		onSubmit () {     // log user
			api.put('login', {
				username: this.username,
				password: this.password
			})
      .then(res => {
        if (res.status == 200)
          return res.data;
      })
			.then(data => {
				this.$store.dispatch('signInAction', {
					token: data.token,
          username: this.username
				});
				notifyCreated(this, "Usuario autenticado correctamente");
				this.$router.push('/');
			})
			.catch(err => {
        this.onReset()
				if (err.response.status == 409) 
					notifyWarning(this, 'Falta el usuario y la contraseña');
				else if (err.response.status == 404)
					notifyWarning(this, 'Este usuario no existe');
				else if (err.response.status == 401)
					notifyWarning(this, 'Contraseña incorrecta');
				else 
					notifyWarning(this, `Error en el servidor: ${err}`);
			})
		}
  }
}
</script>

<style lang="scss" scoped>
.form {
  background-color: rgba(233, 233, 233, 0.95);
}
</style>