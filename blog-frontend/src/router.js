import store from './store'
import axios from 'axios'
import { server } from '@/utils/helper'
import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '@/views/Home'
import EditComponent from '@/components/post/Edit'
import CreateComponent from '@/components/post/Create'
import PostComponent from '@/components/post/Post'
import LoginComponent from '@/components/Login'

	const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: [
		{ path: '/', redirect: { name: 'home' } },
		{ path: '/home', name: 'home', component: HomeComponent, meta: { requiredAuth: false } },
		{ path: '/create', name: 'Create', component: CreateComponent, meta: { requiredAuth: true } },
		{ path: '/edit/:id', name: 'Edit', component: EditComponent, meta: { requiredAuth: true } },
		{ path: '/post/:slug', name: 'Post', component: PostComponent, meta: { requiredAuth: false } },
		{ path: '/login', name: 'Login', component: LoginComponent, meta: { requiredAuth: false } }
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
	if(!store.getters.getLoginStatus) {
		axios
			.get(`${server.baseURL}/blog/user`, { withCredentials: true })
			.then((tokenData) => {
				if (tokenData && tokenData.data)
				{
					console.log("TOKEN DATA")
					console.log(tokenData.data)
					store.commit('saveTokenData', tokenData.data);
					store.commit('setLoginStatus','success');
				}
				routeIfLogin(to, from, next)
			})
			.catch((err) => {
				console.log(err)
				store.commit('setLoginStatus','failed');
				routeIfLogin(to, from, next)
			})
	}
	else {
		routeIfLogin(to, from, next)
	}
	
});

export default router
