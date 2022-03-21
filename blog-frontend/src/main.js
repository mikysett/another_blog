import { createApp } from 'vue/dist/vue.esm-bundler'
import App from './App.vue'
import router from './router'
import './assets/reset.css'
import store from '@/store/index'

createApp(App).use(router).use(store).mount('#app')
