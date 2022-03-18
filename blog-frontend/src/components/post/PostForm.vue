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
			<label class="text-label" for="tags">Tags</label>
			<input class="text-input" type="text" @keydown.enter.prevent="addTag()" id="tags" v-model="newTag" name="tags" placeholder="Press Enter to add a tag">
			<div v-if="postData.tags.length !== 0" class="tags-wrapper">
				<span v-for="tag in postData.tags" :key="tag" class="sgl-tag">
					{{ tag }}
					<span class="remove-tag" @click="removeTag(tag)">X</span>
				</span>
			</div>
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

const newTag = ref("")
const isNewPost = ref(true)
const postData = ref({
	title: "",
	slug: "",
	description: "",
	body: "",
	author: "mikysett",
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

const updateSlug = () => {
	console.log(postData.value)
	console.log(postData.value.slug);
	if (postData.value.slug === "") {
		postData.value.slug = postData.value.title
			.trim()
			.toLowerCase()
			.replace(/ /g, "-")
			.replace(/[^a-z,-]+/gi, '');
	}
}

const addTag = () => {
	newTag.value = newTag.value.trim()

	if (newTag.value != ""
		&& postData.value.tags.includes(newTag.value) == false)
	{
		postData.value.tags.push(newTag.value)
		newTag.value = ""
	}
}

const removeTag = (tag) => {
	postData.value.tags.splice(postData.value.tags.indexOf(tag), 1)
}

if (props.post != null) {
	isNewPost.value = false
	// eslint-disable-next-line
	postData.value = props.post
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

.sgl-tag {
	padding: 4px 8px;
	background: var(--secondary_bg);
	margin-right: 4px;
}

.tags-wrapper {
	padding: 20px 0;
}

.remove-tag {
	opacity: 0;
	cursor: pointer;
	padding-left: 4px;
}

.sgl-tag:hover {
	background: var(--third_bg);
}

.sgl-tag:hover .remove-tag {
	opacity: 1;
}
</style>