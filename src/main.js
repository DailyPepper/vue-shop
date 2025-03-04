import App from './App.vue'
import { createApp } from 'vue'
import './index.css'
import {createRouter, createWebHistory} from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import Favorites from './pages/Favorites.vue'
import Home from './pages/Home.vue'

const routes = [
    { path: '/', name:"home", component: Home },
    { path: '/favorites', name:"favorites", component: Favorites },
  ]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)

app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
