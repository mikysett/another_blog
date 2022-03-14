<template>
  <div>
       <div>
         <h2> Create Post </h2>
         <form @submit.prevent="createPost">
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
                 <textarea id="body" cols="30" rows="5" v-model="postData.body"></textarea>
             </div>
             <div>
                 <label for="author"> Author </label>
                 <input type="text" id="author" v-model="postData.author" name="author">
             </div>

             <div>
            	<button type="submit"> Create Post </button>
             </div> 
         </form>
       </div>
   </div>
</template>

<script setup>
/* eslint-disable */
import { ref } from "vue"
import axios from "axios"
import { server } from "../../utils/helper"
import router from "../../router"

const postData = ref({
	title: "",
	description: "",
	body: "",
	author: "",
})

const createPost = () => {
	submitToServer(postData.value)
}

const submitToServer = (data) => {
	axios
		.post(`${server.baseURL}/blog/post`, data)
		.then(data => {
			console.log(data);
			router.push({ name: "home" });
		});
}
</script>
