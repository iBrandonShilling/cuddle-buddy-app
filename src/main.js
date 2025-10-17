import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Import pages
import Home from './views/Home.vue'
import Application from './views/Application.vue'
import Results from './views/Results.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/apply', name: 'Application', component: Application },
  { path: '/results', name: 'Results', component: Results }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')
