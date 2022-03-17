<template>
	<main-menu :darkMode="darkMode" @toggle-style-mode="toggleStyleMode()" />
	<div id="body-wrapper">
		<router-view class="main-content" />
		<side-info></side-info>
	</div>
	<MainFooter />
</template>

<script setup>
import { ref } from 'vue'

import MainMenu from '@/components/MainMenu'
import SideInfo from '@/components/SideInfo'
import MainFooter from '@/components/MainFooter'

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
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,400;0,700;1,400&display=swap');
@import './assets/globals.css';
@import './assets/editor_content.css';

.global-styles {
	font-size: 20px;
	background: var(--primary_bg);
}

#app {
	font-family: 'Ubuntu', 'Noto Serif', serif;
	color: var(--primary_color);
	max-width: 1024px;
	min-height: 100vh;
	margin: 0 auto;
	display: grid;
	column-gap: 0;
	row-gap: 0;
	align-content: start;
	grid-template-rows: auto 1fr auto;
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
	width: 100%;
	margin: 0 auto;
	padding: 12px 0;
}

.main-content {
	padding: 0px 12px;
}
</style>
