<template>
	<div>
		<h2 class="title">
			<router-link class="title-link" :to="{name: 'Post', params: {id: post._id}}">
				{{ post.title }}
			</router-link>
		</h2>
		<p>{{ post.body }}</p>
		<div>
			<div>
				<router-link :to="{name: 'Edit', params: {id: post._id}}">Edit Post </router-link>
				<button v-on:click="deletePost(post._id)">Delete Post</button>
			</div>
		</div>

		<div>
			<small>Posted on: {{ post.date_posted}}</small><br/>
			<small>by: {{ post.author}}</small>
		</div>
	</div>
</template>

<script setup>
/* eslint-disable */
import { server } from "../../utils/helper"
import axios from "axios"
import { useRoute } from 'vue-router'

const route = useRoute()

defineProps(['post'])

const deletePost = (id) => {
	axios.delete(`${server.baseURL}/blog/delete?postID=${id}`).then(data => {
		console.log(data);
		window.location.reload();
	})
};

</script>

<style scoped>
.title {
	font-size: 42px;
}

.title-link {
	color: var(--secondary_color);
	text-decoration: none;
}
</style>
