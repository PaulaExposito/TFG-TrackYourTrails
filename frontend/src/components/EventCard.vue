<template>
	<div class="container">
		<img src="../assets/event_logo.png">
		<p>{{ id }}</p>
	</div>
</template>

<script>
export default {
	name: "EventCard",
	props: {
		id: {
			type: String,
			default: 'normal',
			required: true,
			validator: v => { return true; }
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
  justify-content: center;
  width: 150px;
  box-shadow: 1px 1px 12px 1px rgba(0,0,0,0.8);
  border-radius: 8px;
  overflow: hidden;
	margin-right: 20px;
	margin-bottom: 30px;

	// background-color: #dac8ec;
	background-color: #d1e7ed;
}

img {
  width: 100%;
  height: auto;
  background-repeat: no-repeat;
  background-size: contain;
	// filter: drop-shadow(0 0 2px white);
}

p {
  text-align: center;
  margin-bottom: 10px;
}
</style>