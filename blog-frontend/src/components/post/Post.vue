<template>
	<div>
		<h4>
			<small><button v-on:click="navigate()"> View All Posts </button></small>
		</h4>
		<hr>
		<h2>{{ post.title }}</h2>
		<h5>Post by {{post.author}}, {{post.date_posted}}.</h5>
		<p v-html="post.body"></p>
	</div>
</template>

<script setup>
/* eslint-disable */
import { onMounted, ref } from 'vue'
import { server } from "../../utils/helper"
import axios from "axios"
import router from "../../router"
import { useRoute } from 'vue-router'

const route = useRoute()
const id = ref(0)
const post = ref({})

onMounted(() => {
	Prism.highlightAll()
})

const getPost = () => {
	axios
		.get(`${server.baseURL}/blog/post/${id.value}`)
		.then(data => (post.value = data.data));
}

const navigate = () => {
	router.go(-1)
}

id.value = route.params.id
getPost()
</script>
