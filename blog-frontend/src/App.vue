<template>
	<main-menu :darkMode="darkMode" @toggle-style-mode="toggleStyleMode()" />
	<div id="body-wrapper">
		<router-view class="main-content" />
		<side-info></side-info>
	</div>
	<pre>
		<code class="language-c">
			this is a test;
			int main(int argc, char **argv) {
				return (0);
			}
		</code>
	</pre>
	<MainFooter />
</template>

<script setup>
import { ref } from 'vue'

// eslint-disable-next-line
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-lisp'

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
@import './assets/globals.css';
@import './assets/editor_content.css';

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
