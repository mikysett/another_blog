<template>
	<div>
		<h4>
		<small>
			<button v-on:click="navigate()"> View All Posts </button>
		</small>
	</h4>
		<div>
			<PostForm v-if="postFetched"
				:post="post"
				@post-validated="(editedPost) => editPost(editedPost)" />
		</div>
	</div>
</template>


<script setup>
import { server } from '../../utils/helper'
import axios from 'axios'
import router from '../../router'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useStore } from 'vuex'
import PostForm from '@/components/post/PostForm'

const route = useRoute()
const post = ref({})
const postFetched = ref(false)
const id = ref(0)

const store = useStore()

console.log(store.getters.getAxiosToken)

const editPost = (postData) => {
	axios
		.put(`${server.baseURL}/blog/edit?postID=${id.value}`, postData.value,
			store.getters.getAxiosToken)
		.then(() => {
			router.push({ name: "home" })
		})
}

const getPost = () => {
	axios
	.get(`${server.baseURL}/blog/post-id/${id.value}`,
		store.getters.getAxiosToken)
	.then(data => {
		post.value = data.data
		postFetched.value = true
	});
}

const navigate = () => {
	router.go(-1);
}

id.value = route.params.id;
getPost();

</script>



