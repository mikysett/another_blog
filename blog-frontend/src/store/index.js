import { createStore } from 'vuex'
import axios from 'axios';
import { server } from "../utils/helper"
import { tokenAlive } from '@/shared/jwtHelper';

const store = createStore({
	state: {
		authData: {
			username: "",
			exp: "",
		},
		loginStatus: ""	
	},
	getters: {
		getAuthData(state) {
			return state.authData
		},
		getLoginStatus(state) {
			return state.loginStatus
		},
		isTokenActive(state) {
			if (!state.authData.exp) {
				return false
			}
			return tokenAlive(state.authData.exp)
		}
	},
	mutations: {
		saveTokenData(state, data) {   
			state.authData = data;
			console.log("STATE AUTHDATA")
			console.log(state.authData)
		},
		setLoginStatus(state, value) {
			state.loginStatus = value;
		}
	},
	actions: {
		async login({commit}, payload) {
			const response = await axios
				.post(`${server.baseURL}/blog/login`, payload, { withCredentials: true })
				.catch((err) => {
					console.log(err)
					commit('setLoginStatus','failed');
				})
			if (response && response.data) {
				const tokenData = await axios
					.get(`${server.baseURL}/blog/user`, { withCredentials: true })
					.catch((err) => {
						console.log(err)
						commit('setLoginStatus','failed');
					})
				if (tokenData && tokenData.data)
				{
					console.log("TOKEN DATA")
					console.log(tokenData.data)
					commit('saveTokenData', tokenData.data);
					commit('setLoginStatus','success');
				}
			} else {
				commit('setLoginStatus','failed');
			}
		},
	}
})

export default store