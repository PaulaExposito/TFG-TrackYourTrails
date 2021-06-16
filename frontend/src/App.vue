<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {
    console.log("app scope");
    if (navigator.serviceWorker) {
      // navigator.serviceWorker.addEventListener('message', event => {
      //   console.log('service worker sent me a message ' + event.data)
      // });

      // navigator.serviceWorker.ready.then( registration => {
      //   console.log('app scope -> service worker ready listener')

      //   registration.active.postMessage("Hi service worker (app scope)");
      // });
    }
  },
  beforeDestroyed() {

  }
}
</script>

<style>
#q-app {
  background-color: #f3f3f3;
  font-family: 'Roboto', monospace;
}
</style>
