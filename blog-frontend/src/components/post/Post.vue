<template>
	<div class="line-numbers">
		<h2 class="title">{{ post.title }}</h2>
		<div class="extra-info">
			<div v-if="Object.keys(post).length !== 0 && post.tags.length !== 0" class="tags">
				<span v-for="tag in post.tags" :key="tag" class="sgl-tag">
					{{ tag }}
				</span>
			</div>
			<h5>{{ printDateFromString(post.date_posted) }}</h5>
		</div>
		<div class="editor-content" v-html="post.body"></div>
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
const slug = ref(0)
const post = ref({})

const getPost = () => {
	axios
		.get(`${server.baseURL}/blog/post/${slug.value}`, { withCredentials: true })
		.then(data => {
			post.value = data.data
			Prism.highlightAll()
		});
}

// This function is reimplemented also in PostPreview, very bad code repetition
const printDateFromString = (dateString) => {
	let date = new Date(dateString)
	return (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
}

onUpdated(() => {
	Prism.highlightAll()
})

slug.value = route.params.slug
getPost()
</script>
