<template>
	<div class="container flex-column">

    <div class="flex-row visibility">
      <!-- <span class="material-icons show">expand_more</span> -->
      <!-- <span class="material-icons hide">expand_less</span> -->
    </div>
    
		<div class="flex-row data">
			<div class="time">Tiempo <br> {{ parseTime() }} </div>
			<div class="distance"> Distancia <br> {{ distance.toFixed(3) }} km</div>
		</div>
		
    <div v-if="$store.getters.username != null" class="flex-row control">
      <button v-if="$store.getters.tracking == false" class="start" @click="start">INICIAR</button>
      <button class="pause hide">PAUSAR</button>
      <button v-if="$store.getters.tracking == true" class="stop" @click="stop">FINALIZAR</button>
    </div>
    <div v-else class="subtitle">Para usar esta funcionalidad tienes que estar autenticado</div> 

    <q-dialog v-model="popup">
      <q-card class="card">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Ruta finalizada</div>
          <q-space></q-space>
          <q-btn icon="close" flat round dense v-close-popup></q-btn>
        </q-card-section>

        <q-card-section>
					<q-form @submit="onSubmit" class="q-gutter-md form">

						<p class="subtitle">Distancia</p><p class="data">{{ distance.toFixed(3) }} km</p>
						<p class="subtitle">Duración</p><p class="data">{{ parseTime() }}</p>

						<q-input id="title" filled v-model="title"
							label="Nombre de la ruta" lazy-rules />
						<q-input id="description" filled v-model="description"
							label="Descripción de la ruta" lazy-rules />

						<div class="form-btn">
							<q-btn id="submit" icon="check" label="Guardar" type="submit" color="primary" v-close-popup/>
						</div>
					</q-form>
        </q-card-section>
      </q-card>
    </q-dialog> 
  </div>
</template>


<script>
import { api } from '../boot/axios';
import { notifyCreated, notifyWarning } from '../boot/utils';

export default {
	name: "ControlBox",
  data() {
    return {
      geolocationId: null,
      trailId: null,
      options: {
        enableHighAccuracy: false,
        timeout: 5000,
        maximunAge: 0
      },
      distance: 0,
      time: 0,
      description: null,
      title: null,
      amountOfTime: 0,
      popup: false
    }
  },
  methods: {
    start() {
      this.amountOfTime = 0;
      this.$store.dispatch('setTrackingAction', true);

      api.post('trails', { "user": this.$store.getters.username }, { 'Authorization': 'Bearer ' + this.$store.getters.token })
        .then(res => {
          if (res.status == 201)
            return res.data;
        })
        .then(data => {
          this.trailId = data._id;
          this.time = setInterval(this.updateTime, 1000);
          this.geolocationId = navigator.geolocation.watchPosition(this.success, this.error, this.options);
        })
        .catch(err => {
          if (err.respose === 409 || err.respose === 404)
            notifyWarning(this, "Data incorrect");
          else  
            notifyWarning(this, `ERROR: ${err}`);
        });


      /*** SEND MESSAGE TO SERVICE WORKER ***/

      // if (navigator.serviceWorker) {
      //   navigator.serviceWorker.register('service-worker.js');

      //   navigator.serviceWorker.addEventListener('message', event => {
      //     console.log(`service worker send me a message = ${event.data}  | control box scope`);
      //   });

      //   navigator.serviceWorker.ready.then( registration => {
      //     registration.active.postMessage("Hi service worker (control box scope)");
      //   });
      // }
    },
    stop() {
      clearInterval(this.time);
      navigator.geolocation.clearWatch(this.geolocationId);
      this.finishTrail();
      this.$store.dispatch('setTrackingAction', false);
      this.$store.dispatch('setTrailAction', { "id": null });
    },
    success(pos) {
      let lat = pos.coords.latitude;
      let lon = pos.coords.longitude;

      if (!this.$store.getters.points.length || this.$store.getters.lastPoint[0] != lat || this.$store.getters.lastPoint[1] != lon) {
        api.put(`trails/${this.trailId}/point`, 
          { "longitude": lon, "latitude": lat, "time": this.amountOfTime },
          { 'Authorization': 'Bearer ' + this.$store.getters.token })
          .then(res => {
            if (res.status === 200) 
              return res.data;
          })
          .then(data => {
            this.distance = data.distance;
            console.log(`puntos: ${data.points.length}`)
            this.$store.dispatch('setLastPointAction', [lat, lon]);
            this.$store.dispatch('setPointsAction', data.points);
          })
          .catch(err => {
            if (err.respose === 404)
              notifyWarning(this, "Punto no añadido");
            else
              notifyWarning(this, `ERROR: ${err}`);
          })
      }
    },
    error() {
      notifyWarning(this, "Error al obtener la ubicación");
    },
    finishTrail(){
      this.popup = true;
    },
    onSubmit() {
      api.put(`trails/${this.trailId}`, 
        { "title": this.title, "description": this.description },
        { 'Authorization': 'Bearer ' + this.$store.getters.token })
        .then(res => {
          if (res.status === 200) 
            return res.data;
        })
        .then(data => {
          notifyCreated(this, "Ruta guardada");
            this.$router.push("/");
          })
        .catch(err => {
          if (err.respose === 404)
            notifyWarning(this, "Ruta guardada");
          else
            notifyWarning(this, `ERROR: ${err}`);
        })
    },
    updateTime() {
      this.amountOfTime += 1;
    },
    parseTime() {
      let hh = parseInt(this.amountOfTime / (60 * 60));
      let mm = parseInt((this.amountOfTime / 60) % 60);
      let ss = this.amountOfTime % 60;

      return (hh < 10 ? `0${hh}` : hh) + ":" + (mm < 10 ? `0${mm}` : mm) + ":" + (ss < 10 ? `0${ss}` : ss);
    }
  },
  beforeDestroyed() {
    navigator.geolocation.clearWatch(this.geolocationId);
  }
}
</script>

<style scoped lang="scss">
.container {
	background-color: $lightgray;
	height: 100%;
  width: 100%;
}

.data {
  width: 100%;
  justify-content: space-around;
  text-align: center;
  font-size: 18px;
} 

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.hide { display: none; }
.show { display: block; }

.visibility { 
  justify-content: center;
  align-items: center;
  height: 40px;
}

.control {   
  justify-content: center;
  align-items: flex-start;
  height: 100px;
}

.control button {
  border-radius: 50%;
  height: 80px;
  width: 80px;
  border: 1px solid $primary;
  filter: drop-shadow(0 0 2px $primary);
	background-color: $primary;
  color: white;
}

.card {
	width: 500px;
}

.subtitle {
  width: 100%;
  justify-content: space-around;
  text-align: center;
	font-weight: bold;
	margin-top: 20px;
}

.form-btn {
	text-align: center;
  margin-top: 20px;
}
</style>
