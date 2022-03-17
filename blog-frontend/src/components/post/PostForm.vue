<template>
	<form class="post-form" @submit.prevent="validatePost">
		<div>
			<label class="text-label" for="title"> Title </label>
			<input @blur="updateSlug()" class="text-input" type="text" id="title" v-model="postData.title" name="title" placeholder="Enter title">
		</div>
		<div>
			<label class="text-label" for="slug">Slug</label>
			<input class="text-input" type="text" id="slug" v-model="postData.slug" name="slug" placeholder="a-very-nice-article">
		</div>
		<div>
			<label class="text-label" for="description"> Small description </label>
			<textarea class="text-input" v-model="postData.description" name="description" id="description"></textarea>
		</div>
		<div>
			<label class="text-label" for="body">Content</label>
			<tip-tap
				:content="postData.body"
				@contentUpdated="(body) => updateBody(body)" />
		</div>
		<div>
			<label class="text-label" for="author"> Author </label>
			<input class="text-input" type="text" id="author" v-model="postData.author" name="author">
		</div>
		<div class="checkbox-wrapper">
			<input type="checkbox" id="hidden_checkbox" v-model="postData.hidden" />
			<label for="hidden_checkbox">Hidden post</label>
		</div>
		<div>
			<button class="std-btn" type="submit"> {{ isNewPost ? 'Create' : 'Edit' }} Post </button>
		</div> 
	</form>
</template>

<script setup>
import { ref } from 'vue'
// eslint-disable-next-line
import { useEditor, EditorContent } from '@tiptap/vue-3'
// eslint-disable-next-line
import StarterKit from '@tiptap/starter-kit'
import TipTap from '@/components/post/TipTap'

const props = defineProps(['post'])
const emit = defineEmits(['postValidated'])

const isNewPost = ref(true)
const postData = ref({
	title: "",
	slug: "",
	description: "",
	body: "",
	author: "",
	tags: [],
	hidden: true,
})

const validatePost = () => {
	// Here maybe I could introduce data validation in the future
	emit('postValidated', postData)
}

const updateBody = (body) => {
	postData.value.body = body
}

if (props.post != null) {
	isNewPost.value = false
	// eslint-disable-next-line
	postData.value = props.post
}

const updateSlug = () => {
	if (postData.value.slug === '') {
		postData.value.slug = postData.value.title
			.trim()
			.toLowerCase()
			.replace(/ /g, "-")
			.replace(/[^a-z]+/gi, '');
	}
}

console.log(postData.value)
</script>

<style>
.text-label {
	display: block;
	margin: 12px 0 4px;
}

.text-input {
	display: block;
	width: 100%;
	padding: 12px;
	background: var(--secondary_bg);
	color: var(--primary_color)
}

.checkbox-wrapper {
	padding: 12px 0
}

.checkbox-wrapper label {
	margin-left: 12px;
}
</style>