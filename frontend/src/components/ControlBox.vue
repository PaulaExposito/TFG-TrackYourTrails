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
		
    <div class="flex-row control">
      <button class="start show" @click="start">INICIAR</button>
      <button class="pause hide">PAUSAR</button>
      <button class="stop hide" @click="stop">FINALIZAR</button>
    </div>
	</div> 
</template>


<script>
import { api } from '../boot/axios';
import { notifyWarning } from '../boot/utils';

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
      amountOfTime: 0
    }
  },
  methods: {
    start() {
      this.amountOfTime = 0;
      this.changeButtons();
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
      this.changeButtons();
      this.$store.dispatch('setTrackingAction', false);
      this.$store.dispatch('setTrailAction', { "id": null });
    },
    success(pos) {
      let lon = pos.coords.longitude;
      let lat = pos.coords.latitude;

      api.put(`trails/${this.trailId}/point`, 
        { "longitude": lon, "latitude": lat, "time": this.amountOfTime },
        { 'Authorization': 'Bearer ' + this.$store.getters.token })
        .then(res => {
          if (res.status === 200) 
            return res.data;
        })
        .then(data => {
          this.distance = data.distance;
          this.$store.dispatch('setPointsAction', data.points);
          console.log(this.$store.getters.points);
        })
        .catch(err => {
          if (err.respose === 404)
            notifyWarning(this, "Punto no añadido");
          else
            notifyWarning(this, `ERROR: ${err}`);
        })
    },
    error() {
      notifyWarning(this, "Error al obtener la ubicación");
    },
    changeButtons() {
      if (!this.$store.getters.tracking) {
        document.querySelector(".start").classList.remove("show");
        document.querySelector(".start").classList.add("hide");
        document.querySelector(".stop").classList.remove("hide");
        document.querySelector(".stop").classList.add("show");
      }
      else {
        document.querySelector(".start").classList.remove("hide");
        document.querySelector(".start").classList.add("show");
        document.querySelector(".stop").classList.remove("show");
        document.querySelector(".stop").classList.add("hide");
      }
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
	// background-color: rgba(209, 73, 31, 0.521);
    filter: drop-shadow(0 0 2px $primary);
	background-color: $primary;
  color: white;
	// background-color: ;
}
</style>
