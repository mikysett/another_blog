<template>
	<main-menu :darkMode="darkMode" @toggle-style-mode="toggleStyleMode()" />
	<div id="body-wrapper">
		<router-view class="main-content" />
		<side-info></side-info>
	</div>
	<main-footer />
</template>

<script setup>
import MainMenu from '@/components/MainMenu'
import SideInfo from '@/components/SideInfo'
import MainFooter from '@/components/MainFooter'
import { ref } from 'vue'

const darkMode = ref(null)

const initStyleMode = () => {
	if (window.matchMedia
		&& window.matchMedia("(prefers-color-scheme: dark)").matches) {
		darkMode.value = true
	} else {
		darkMode.value = false
	}
	setStyleModeInDocument()
}

const setStyleModeInDocument = () => {
	if (darkMode.value === true)
		document.documentElement.setAttribute('style-mode', 'dark')
	else
		document.documentElement.setAttribute('style-mode', 'light')
}

const toggleStyleMode = () => {
	darkMode.value = !darkMode.value
	setStyleModeInDocument()
}

initStyleMode()
</script>

<style>
@import './assets/reset.css';
@import './assets/globals.css';

body {
	background: var(--primary_bg);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: var(--primary_color);
}

nav a {
  font-weight: bold;
  color: var(--secondary_color);
}

nav a.router-link-exact-active {
  color: var(secondary_color);
}

#body-wrapper {
	display: grid;
	grid-template-columns: 4fr 1fr;
	max-width: 1024px;
	margin: 0 auto;
	padding: 12px 0;
}

.main-content {
	padding: 0px 12px;
}
</style>
