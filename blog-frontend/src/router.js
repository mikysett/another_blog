import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '@/views/Home'
import EditComponent from '@/components/post/Edit'
import CreateComponent from '@/components/post/Create'
import PostComponent from '@/components/post/Post'

const router = createRouter({
 history: createWebHistory(process.env.BASE_URL),
 routes: [
   { path: '/', redirect: { name: 'home' } },
   { path: '/home', name: 'home', component: HomeComponent },
   { path: '/create', name: 'Create', component: CreateComponent },
   { path: '/edit/:id', name: 'Edit', component: EditComponent },
   { path: '/post/:slug', name: 'Post', component: PostComponent }
 ]
});

export default router
