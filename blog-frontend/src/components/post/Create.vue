<template>
	<div>
		<div>
			<PostForm @post-validated="(post) => createPost(post)" />
		</div>
	</div>
</template>

<script setup>
/* eslint-disable */
import axios from "axios"
import { server } from "../../utils/helper"
import router from "../../router"
import PostForm from '@/components/post/PostForm'

const createPost = (postData) => {
	submitToServer(postData.value)
}

const submitToServer = (data) => {
	axios
		.post(`${server.baseURL}/blog/post`, data, { withCredentials: true })
		.then(() => {
			router.push({ name: "home" });
		});
}
</script>
