<template>
	<form class="post-form" @submit.prevent="login">
		<div>
			<label class="text-label" for="username">Username</label>
			<input
				class="text-input"
				type="text"
				id="username"
				v-model="credentials.username"
				name="username"
				autofocus>
		</div>
		<div>
			<label class="text-label" for="password">Password</label>
			<input
				class="text-input"
				type="password"
				id="password"
				v-model="credentials.password"
				name="password">
		</div>
		<div v-if="formError !== ''">
			<br>
			<p class="error-msg">{{ formError }}</p>
		</div>
		<br>
		<div>
			<button class="std-btn" type="submit">Login</button>
			{{ loginStatus }}
		</div> 
	</form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import router from '../router'

const credentials = ref({
	username: "",
	password: "",
})
const formError = ref("")

const store = useStore()

const loginStatus = computed(() => store.getters.getLoginStatus)

const login = async () => {
	if (credentials.value.username === ""
		|| credentials.value.password === "")
	{
		formError.value = "All fields are mandatory"
	} else {
		await store.dispatch("login", {
			username: credentials.value.username,
			password: credentials.value.password
		});
		if (loginStatus.value === 'success') {
			formError.value = ""
			router.push('/admin')
		} else {
			formError.value = "Bad credentials!"
		}
	}
}
</script>