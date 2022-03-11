<template>
	<main-menu />
	<div id="body-wrapper">
		<router-view/>
		<side-info></side-info>
	</div>
	<main-footer />
</template>

<script setup>
import MainMenu from '@/components/MainMenu'
import SideInfo from '@/components/SideInfo'
import MainFooter from '@/components/MainFooter'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

#body-wrapper {
	display: grid;
	grid-template-columns: 4fr 1fr;
	max-width: 1024px;
	margin: 0 auto;
	padding: 12px 12px;
}
@import './assets/globals.css';
</style>
