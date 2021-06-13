<template>
  <q-page padding class="flex bg">
    <q-header elevated class="bg-primary text-white q-pt-sm q-pl-sm" height-hint="98">
      <q-toolbar-title>Track Your Trails</q-toolbar-title>
      <q-tabs align="center" v-model="tab">
        <q-tab name="login" label="LogIn"/>
        <q-tab name="signup" label="SignUp"/>
      </q-tabs>
    </q-header>

    <template v-if="tab === 'signup'">
      <SignUp/>
    </template>
    <template v-else>
      <LogIn/>
    </template>
  </q-page>
</template>

<script>
import SignUp from '../components/SignUp.vue'
import LogIn from '../components/SignIn.vue'

export default {
  name: 'Register',
  components: { 
    SignUp,
    LogIn
  },
  data () {
    return {
      tab: "login"
    }
  },
}
</script>

<style scoped lang="scss">
.bg {
  background-image: url(https://images.pexels.com/photos/1300510/pexels-photo-1300510.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.flex {
  display: flexbox;
  flex-direction: column;
  align-items: center;
}
</style>