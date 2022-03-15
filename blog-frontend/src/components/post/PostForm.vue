<template>
	<form @submit.prevent="validatePost">
		<div>
			<label for="title"> Title </label>
			<input type="text" id="title" v-model="postData.title" name="title" placeholder="Enter title">
		</div>
		<div>
			<label for="description"> Description </label>
			<input type="text" id="description" v-model="postData.description" name="description" placeholder="Enter Description">
		</div>
		<div>
			<label for="body"> Write Content </label>
			<tip-tap
				:content="postData.body"
				@contentUpdated="(body) => updateBody(body)" />
		</div>
		<div>
			<label for="author"> Author </label>
			<input type="text" id="author" v-model="postData.author" name="author">
		</div>
		<div>
			<input type="checkbox" id="hidden_checkbox" v-model="postData.hidden" />
			<label for="hidden_checkbox">Hidden post</label>
		</div>
		<div>
			<button type="submit"> {{ isNewPost ? 'Create' : 'Edit' }} Post </button>
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
	description: "",
	body: "",
	author: "",
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

console.log(postData.value)

</script>
