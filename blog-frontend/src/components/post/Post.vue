<template>
	<div class="line-numbers">
		<h4>
			<small><button v-on:click="navigate()"> View All Posts </button></small>
		</h4>
		<hr>
		<h2>{{ post.title }}</h2>
		<h5>Post by {{post.author}}, {{post.date_posted}}.</h5>
		<div v-html="post.body"></div>
	</div>
</template>

<script setup>
/* eslint-disable */
import { onUpdated, ref } from 'vue'
import { server } from "../../utils/helper"
import axios from "axios"

// eslint-disable-next-line
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-lisp'

import router from "../../router"
import { useRoute } from 'vue-router'

const route = useRoute()
const id = ref(0)
const post = ref({})

const getPost = () => {
	axios
		.get(`${server.baseURL}/blog/post/${id.value}`)
		.then(data => {
			post.value = data.data
			Prism.highlightAll()
		});
}

const navigate = () => {
	router.go(-1)
}

onUpdated(() => {
	Prism.highlightAll()
})

id.value = route.params.id
getPost()
</script>
