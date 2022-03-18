<template>
	<div class="post-preview">
		<h2 class="title">
			<router-link class="title-link" :to="{name: 'Post', params: {slug: getSlug(post.slug)}}">
				{{ post.title }}
			</router-link>
		</h2>
		<div class="extra-info">
			<div v-if="Object.keys(post).length !== 0 && post.tags.length !== 0" class="tags">
				<span v-for="tag in post.tags" :key="tag" class="sgl-tag">
					{{ tag }}
				</span>
			</div>
			<h5>{{ printDateFromString(post.date_posted) }}</h5>
		</div>
		<p class="description">{{ post.description }}</p>
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
	return (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
}

const deletePost = (id) => {
	axios.delete(`${server.baseURL}/blog/delete?postID=${id}`).then(data => {
		window.location.reload();
	})
};

const getSlug = (slug) => {
	if (!slug || slug === "")
		return ("404-no-slug")
	else
		return slug
}
</script>

<style scoped>
.post-preview {
	padding: 20px 0;
}

.title {
	font-size: 42px;
	font-family: 'Noto Serif';
}

.info {
	text-align: right;
	margin: 12px 0;
}

.title-link {
	color: var(--secondary_color);
	text-decoration: none;
}

.description {
	line-height: 1.4;
}
</style>
