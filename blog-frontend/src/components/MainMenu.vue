<template>
  <nav>
	<h1>Hackers&Climbers</h1>
	<div class="menu-links">
		<router-link to="/">Home</router-link> |
		<router-link to="/create">Create</router-link>
	</div>
	<div class="style-mode" @click="$emit('toggle-style-mode')">
		<img class="mode-img" v-if="darkMode"
			src="@/assets/light-mode.png"
			alt="Light Mode">
		<img class="mode-img" v-else
			src="@/assets/dark-mode.png"
			alt="Dark Mode">
	</div>
  </nav>
</template>

<script setup>
defineProps(['darkMode'])
</script>

<style scoped>
nav {
	max-width: 1024px;
	margin: 0 auto;
	padding: 12px 12px;
	border-bottom: 2px solid var(--third_bg);
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.mode-img {
	cursor: pointer;
	max-width: 30px;
}
</style>
