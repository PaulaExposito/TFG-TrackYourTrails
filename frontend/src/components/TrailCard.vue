<template>
<div class="card" @click="openCard">
  <div class="data">
    <div class="title"> {{ title }} </div>
    <div class="desc"> {{ distance.toFixed(3) }} km | {{ parseTime() }} </div>
  </div>
</div>
</template>

<script>
export default {
	name: "TrailCard",
	props: {
		trail: Array
  },
  data() {
    return {
      id: null,
      title: null,
      time: 0,
      distance: 0
    }
  },
  mounted() {
    this.id = this.trail[0];
    this.title = this.trail[1].title;
    this.time = this.trail[1].time;
    this.distance = this.trail[1].distance;
  },
  methods: {
		openCard() {
			// Guardar en el store la ruta pulsada
			this.$store.dispatch("setTrailAction", {
        id: this.id
      });
			this.$router.push("/trail");
		},
    parseTime() {
      let hh = parseInt(this.time / (60 * 60));
      let mm = parseInt((this.time / 60) % 60);

      return `${hh} horas y ${mm} minutos`;
    }
	}
}
</script>

<style scoped lang="scss">
.card {
  height: 250px;
	width: 500px;
	margin: 20px; 
  
  background-image: url(https://farm7.staticflickr.com/6012/5997448305_7e2c94d0d5_o.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 1px 1px 12px 1px rgba(0,0,0,0.8);
  border-radius: 8px;
	overflow: hidden;
  
  display: flex;
  align-items: flex-end;
}

.data {
  height: 30%;
  width: 100%;
	background-color: $lightgray-rgba;
  color: black;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  padding: 5px;
  font-size: 17px;
	font-weight: bold;
  padding-left: 20px;
}

.desc {
  padding: 5px;
  font-size: 13px;
  padding-left: 20px;
}
</style>