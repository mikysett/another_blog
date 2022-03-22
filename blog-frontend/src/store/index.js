import { createStore } from 'vuex'
import axios from 'axios';
import { server } from "../utils/helper"
import { tokenAlive } from '@/shared/jwtHelper';

const store = createStore({
	state: {
		authData: {
			access_token: "",
			username: "",
			exp: "",
		},
		axios_token: "",
		loginStatus: ""	
	},
	getters: {
		getAuthData(state) {
			return state.authData
		},
		getLoginStatus(state) {
			return state.loginStatus
		},
		getAxiosToken(state) {
			return state.axios_token
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
			state.authData.access_token = data.access_token;
			state.axios_token = {
				headers: {
					Authorization: "Bearer " + state.authData.access_token
				}
			}
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
				commit('saveTokenData', response.data);
				commit('setLoginStatus','success');
			} else {
				commit('setLoginStatus','failed');
			}
		},
	}
})

export default store