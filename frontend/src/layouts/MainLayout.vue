<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar> -->
          Track Your Trails
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary text-white">
      <q-tabs align="center">
        <q-route-tab to="/explore"><div class="align-items"><span class="material-icons nav-icons">search</span>Explora</div></q-route-tab>
        <q-route-tab to="/tracker"><div class="align-items"><span class="material-icons nav-icons">timer</span>Iniciar</div></q-route-tab>
        <q-route-tab to="/events"><div class="align-items"><span class="material-icons nav-icons">event</span>Eventos</div></q-route-tab>

        <template v-if="$store.getters.token === null">
          <q-route-tab to="/register"><div class="align-items"><span class="material-icons nav-icons">login</span>Regístrate</div></q-route-tab>
        </template>
        <template v-else>
          <q-route-tab to="/profile"><div class="align-items"><span class="material-icons nav-icons">perm_identity</span>Perfil</div></q-route-tab>
        </template>
      </q-tabs>

    </q-footer>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.nav-icons {
  margin-right: 12px;
}

.align-items {
  display: flex;
  align-items: center;
}
</style>
