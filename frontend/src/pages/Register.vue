<template>
  <q-page padding class="flex">
    <q-header elevated class="bg-primary text-white q-pt-sm q-pl-sm" height-hint="98">
      <q-toolbar-title>Track Your Trails - Registro</q-toolbar-title>
      <q-tabs align="center" v-model="tab">
        <q-tab name="login" label="Login" @click="loginTab"/>
        <q-tab name="signup" label="SignUp" default=true />

        <!-- <q-route-tab to="/login" label="Login" />
        <q-route-tab to="/signup" label="Sign Up" /> --> 
      </q-tabs>
    </q-header>

    <SignUp/>
  </q-page>
</template>

<script>
import SignUp from '../components/SignUp.vue'

export default {
  name: 'Register',
  components: {
    SignUp
  },
  data () {
    return {
      tab: "signup"
    }
  },
  methods: {
    loginTab() {
      
    }
  }
}
</script>

<style>
.flex {
  display: flexbox;
  flex-direction: column;
  align-items: center;
}
</style>