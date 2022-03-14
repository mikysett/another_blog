<template>
	<div class="post-preview">
		<h2 class="title">
			<router-link class="title-link" :to="{name: 'Post', params: {id: post._id}}">
				{{ post.title }}
			</router-link>
		</h2>
		<div class="info">
			<!-- <small>by: {{ post.author}}</small> -->
			<small>Posted on: {{ printDateFromString(post.date_posted) }}
			</small>
		</div>
		<p>{{ post.description }}</p>
		<div>
			<div>
				<router-link :to="{name: 'Edit', params: {id: post._id}}">Edit Post </router-link>
				<button v-on:click="deletePost(post._id)">Delete Post</button>
			</div>
		</div>

	</div>
</template>

<script setup>
/* eslint-disable */
import { server } from "../../utils/helper"
import axios from "axios"
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()

const props = defineProps(['post'])

const printDateFromString = (dateString) => {
	let date = new Date(dateString)
	return (date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear())
}

const deletePost = (id) => {
	axios.delete(`${server.baseURL}/blog/delete?postID=${id}`).then(data => {
		console.log(data);
		window.location.reload();
	})
};

console.log(props.post)

</script>

<style scoped>
.post-preview {
	padding: 20px 0;
}

.title {
	font-size: 42px;
}

.info {
	text-align: right;
}

.title-link {
	color: var(--secondary_color);
	text-decoration: none;
}
</style>
