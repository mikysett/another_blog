<template>
  <div>
       <div class="col-md-12 form-wrapper">
         <h2> Create Post </h2>
         <form id="create-post-form" @submit.prevent="createPost">
              <div class="form-group col-md-12">
               <label for="title"> Title </label>
               <input type="text" id="title" v-model="postData.title" name="title" class="form-control" placeholder="Enter title">
              </div>
             <div class="form-group col-md-12">
                 <label for="description"> Description </label>
                 <input type="text" id="description" v-model="postData.description" name="description" class="form-control" placeholder="Enter Description">
             </div>
             <div class="form-group col-md-12">
                 <label for="body"> Write Content </label>
                 <textarea id="body" cols="30" rows="5" v-model="postData.body" class="form-control"></textarea>
             </div>
             <div class="form-group col-md-12">
                 <label for="author"> Author </label>
                 <input type="text" id="author" v-model="postData.author" name="author" class="form-control">
             </div>

             <div class="form-group col-md-4 pull-right">
                 <button class="btn btn-success" type="submit"> Create Post </button>
             </div> 
         </form>
       </div>
   </div>
</template>

<script>
/* eslint-disable */
import { ref } from "vue"
import axios from "axios"
import { server } from "../../utils/helper"
import router from "../../router"

export default {
	setup() {
		const date_posted = ref(new Date().toLocaleDateString())
		const postData = ref({
			title: "",
			description: "",
			body: "",
			author: "",
			date_posted: date_posted
		})

		const createPost = () => {
			__submitToServer(postData.value)
		}

		const __submitToServer = (data) => {
			axios
				.post(`${server.baseURL}/blog/post`, data)
				.then(data => {
					console.log(data);
					router.push({ name: "home" });
				});
		}

		return {
			postData,
			createPost,
			__submitToServer,
		}
	}
}
</script>
