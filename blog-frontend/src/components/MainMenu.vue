<template>
  <nav>
	<h1>Hackers&Climbers</h1>
	<div class="menu-links">
		<router-link to="/">Home</router-link> |
		<router-link to="/create">Create</router-link>
	</div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
nav {
	max-width: 1024px;
	margin: 0 auto;
	padding: 12px 12px;
	border-bottom: 2px solid #aaa;
	display: flex;
	justify-content: space-between;
}
</style>
