<template>
	<div class="side-info">
		<div v-if="store.getters.getLoginStatus === 'success'">
			<router-link to="/create">Create</router-link>
			<button type="button" @click="logout">Logout</button>
		</div>
		<p>Even more about me</p>
		<p><a href="https://github.com/mikysett">GitHub</a></p>
		<p><a href="https://www.linkedin.com/in/michele-sessa/">LinkedIn</a></p>
	</div>
</template>

<script setup>
import store from '@/store/index'
import axios from "axios"
import { server } from "../utils/helper"

const logout = () => {
	axios
		.post(`${server.baseURL}/blog/logout`)
		.then((res) => {
			console.log(res)
			store.commit('setLoginStatus', 'failed')
		})
}
</script>

<style scoped>
.side-info {
	padding: 20px 12px;
}
</style>