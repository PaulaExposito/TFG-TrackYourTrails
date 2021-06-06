<template>
<div class="card" @click="openCard(name)">
  <div class="data">
    <div class="title"> {{ name }} </div>
    <div class="desc">La Orotava | 8km | 5:30 h</div>
  </div>
</div>
</template>

<script>
export default {
	name: "TrailCard",
	props: {
		name: {
			type: String,
			default: 'normal',
			required: true,
			validator: v => { return true; }
		}
  },
  methods: {
		openCard (id) {
			console.log("card --> click en " + id);

			// Guardar en el store la ruta pulsada
			this.$store.dispatch("setTrailAction", {
        id: id
      });
			this.$router.push("/trail");
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
  // border: 3px solid $primary-rgba;
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