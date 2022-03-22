import store from './store'
import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '@/views/Home'
import EditComponent from '@/components/post/Edit'
import CreateComponent from '@/components/post/Create'
import PostComponent from '@/components/post/Post'
import LoginComponent from '@/components/Login'
import AdminComponent from '@/views/Admin'

	const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: [
		{ path: '/', redirect: { name: 'home' } },
		{ path: '/home', name: 'home', component: HomeComponent, meta: { requiredAuth: false } },
		{ path: '/create', name: 'Create', component: CreateComponent, meta: { requiredAuth: true } },
		{ path: '/edit/:id', name: 'Edit', component: EditComponent, meta: { requiredAuth: true } },
		{ path: '/post/:slug', name: 'Post', component: PostComponent, meta: { requiredAuth: false } },
		{ path: '/login', name: 'Login', component: LoginComponent, meta: { requiredAuth: false } },
		{ path: '/admin', name: 'Admin', component: AdminComponent, meta: { requiredAuth: true } }
	]
});

const routeIfLogin = (to, from, next) => {
	const loginStatus = store.getters.getLoginStatus;
 
	if(to.fullPath == "/"){
		return next();
	}
	else if (to.meta.requiredAuth) {
		if (loginStatus === 'success')
			return next()
		else
			return next({path: '/login'});
	}
	return next()
}

router.beforeEach((to,from, next) => {
	routeIfLogin(to, from, next)
});

export default router
