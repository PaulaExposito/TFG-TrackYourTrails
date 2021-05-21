<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >

    <div> (: token: {{ $store.getters.token }} </div>
    <div> Despliegue continuo :D </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
