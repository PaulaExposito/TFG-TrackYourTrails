<template>
  <q-page padding class="flex">
    <q-header elevated class="bg-primary text-white q-pt-sm q-pl-sm" height-hint="98">
      <q-toolbar-title>Track Your Trails - Registro</q-toolbar-title>
      <q-tabs align="center">
        <q-route-tab to="/login" label="Login" />
        <q-route-tab to="/signup" label="Sign Up" />
      </q-tabs>
    </q-header>

    <h3>Login</h3>

    <div align="center" class="q-pa-md" style="width: 400px">

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
            val => val.length >= 4 ||'La contraseña debe tener al menos 4 caracteres'
          ]"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'LogIn',
  data () {
    return {
      name: null,
      password: null,
    }
  },
  methods: {
    onSubmit () {

    },
    onReset () {
      this.name = null
      this.password = null
    }
  }
}
</script>

<style>
.flex {
  display: flexbox;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}
</style>
