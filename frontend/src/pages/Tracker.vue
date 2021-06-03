<template>
  <q-page padding class="flex">

    <Map class="map-container"/>
    <ControlBox/>

  </q-page>
</template>

<script>
import Map from '../components/Map.vue'
import ControlBox from '../components/ControlBox.vue'

export default {
  name: 'Register',
  components: { 
    Map,
    ControlBox
  },
  data () {
    return {
    }
  },
}
</script>

<style scoped lang="scss">

.flex {
  display: flexbox;
  flex-direction: column;
  align-items: center;
}

// .map-container {
//     height: 600px;
//     width: 1000px;
//     background-color: indianred;
// }

</style>