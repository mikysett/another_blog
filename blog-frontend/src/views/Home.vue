<template>
<div>
	<div>
		<div v-if="posts.length === 0">
			<h2> No post found at the moment </h2>
		</div>
	</div>

	<div v-if="postFetched === true">
		<PostPreview v-for="post in posts" :post="post" :key="post._id" />
	</div>
	<div v-else>
		Loading posts...
	</div>
</div>
</template>

<script setup>
// @ is an alias to /src
import { ref } from 'vue'
import { server } from "@/utils/helper"
import axios from "axios"
import PostPreview from '@/components/post/PostPreview'

const posts = ref([]);
const postFetched = ref([false])

const fetchPosts = () => {
	axios
		.get(`${server.baseURL}/blog/posts`)
		.then(data => {
			posts.value = data.data
			postFetched.value = true
		})
};

fetchPosts();
</script>
