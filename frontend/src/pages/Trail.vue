<template>
	<div class="container">
		<div class="header">
			<h3 class="title">Subida al Teide</h3>
		</div>
		<div class="content">
			<h4>Descripción</h4>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			
			<h4>Datos</h4>
			<b>Longitud:</b> 8km <br>
			<b>Tiempo:</b> 4h
			
			<h4>Ubicación</h4>
			<div class="map"></div>
			
			<h4>Comentarios</h4>
			<div class="reviews"></div>
			
			
		</div>
</div>
</template>

<script>
export default {
	name: "Trail"
}
</script>

<style scoped lang="scss">
.container {
	display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  height: 300px;
	width: 100%;
  
  background-image: url(https://live.staticflickr.com/65535/50449655752_aa0c9361c5_b.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 1px 1px 12px 1px rgba(0,0,0,0.8);
	overflow: hidden;

  display: flex;
  align-items: flex-end;
}

.title {
  height: 30%;
  width: 100%;
	background-color: rgba(0, 0, 0, 0.75);
  
  color: white;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
	
	padding: 0;
	margin: 0;
  padding-left: 12.5%;
}

.content {
  width: 75%;
}

.map {
  height: 150px;
  width: 400px;
  background-color: orange;
}

.reviews {
  height: 300px;
  width: 100%;
  background-color: lightgreen;
	padding-bottom: 40px;
	margin-bottom: 50px;
}


@media screen and (min-width: 800px) {
	.content {
		width: 50%;
	}
	
	.title {
		padding-left: 25%;
	}
}
</style>