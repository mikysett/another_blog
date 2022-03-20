<template>
	<form class="post-form" @submit.prevent="validateLogin">
		<div>
			<label class="text-label" for="username">Username</label>
			<input
				class="text-input"
				type="text"
				id="username"
				v-model="username"
				name="username">
		</div>
		<div>
			<label class="text-label" for="password">Password</label>
			<input
				class="text-input"
				type="password"
				id="password"
				v-model="password"
				name="password">
		</div>
		<div v-if="formError !== ''">
			<br>
			<p class="error-msg">{{ formError }}</p>
		</div>
		<br>
		<div>
			<button class="std-btn" type="submit">Login</button>
		</div> 
	</form>
</template>

<script setup>
import { ref } from 'vue'

const username = ref("")
const password = ref("")
const formError = ref("")

const validateLogin = () => {
	if (username.value === "" || password.value === "")
	{
		formError.value = "All fields are mandatory"
	}
}

</script>