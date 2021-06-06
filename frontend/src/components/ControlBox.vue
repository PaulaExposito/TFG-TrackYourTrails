<template>
	<div class="container flex-column">

    <div class="flex-row visibility">
      <span class="material-icons show">expand_more</span>
      <span class="material-icons hide">expand_less</span>
    </div>
    
		<div class="flex-row data">
			<div class="time">Tiempo <br> 00:00:00 </div>
			<div class="distance"> Distancia <br> 0m</div>
		</div>
		
    <div class="flex-row control">
      <button class="start show">INICIAR</button>
      <button class="pause hide">PAUSAR</button>
      <button class="stop hide">FINALIZAR</button>
    </div>
	</div> 
</template>


<script>
export default {
	name: "ControlBox",
}
</script>

<style scoped lang="scss">
.container {
	background-color: $lightgray;
  // font-family: monospace;
	// color: whitesmoke;
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
  height: 70px;
  width: 70px;
  border: 1px solid $primary;
	// background-color: rgba(209, 73, 31, 0.521);
    filter: drop-shadow(0 0 2px $primary);
	background-color: $primary;
  color: white;
	// background-color: ;
}
</style>
