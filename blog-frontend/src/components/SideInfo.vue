<template>
	<div class="side-info">
		<div v-if="store.getters.getLoginStatus === 'success'">
			<div>
				<router-link class="std-btn" to="/admin">Admin</router-link>
				<br><br><br>
			</div>
			<div>
				<router-link class="std-btn" to="/create">Create</router-link>
				<br><br><br>
			</div>
			<button class="std-btn" type="button" @click="logout">Logout</button>
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
import router from "../router"

const logout = () => {
	axios
		// This command is NOT actually invalidating the token
		// on server side
		.post(`${server.baseURL}/blog/logout`)
		.then(() => {
			store.commit('setLoginStatus', 'failed')
			router.push('/home')
		})
}
</script>

<style scoped>
.side-info {
	padding: 20px 12px;
}
</style>