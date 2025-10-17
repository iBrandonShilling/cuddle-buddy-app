import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Import pages
import Home from './views/Home.vue'
import CreateLink from './views/CreateLink.vue'
import Application from './views/Application.vue'
import Results from './views/Results.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/create', name: 'CreateLink', component: CreateLink },
  { path: '/apply', name: 'Application', component: Application },
  { path: '/results', name: 'Results', component: Results },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const pinia = createPinia()

// Add error handling and debugging
console.log('Starting Vue app...')

try {
  const app = createApp(App)
  console.log('Vue app created')
  
  app.use(pinia)
  console.log('Pinia added')
  
  app.use(router)
  console.log('Router added')
  
  app.mount('#app')
  console.log('App mounted successfully!')
} catch (error) {
  console.error('Vue app failed to mount:', error)
  document.getElementById('app').innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(135deg, #FFB6C1, #FFC0CB, #DDA0DD); font-family: 'Dancing Script', cursive; color: #FF7F7F; font-size: 2rem; text-align: center;">
      <div>
        <div style="font-size: 4rem; margin-bottom: 1rem;">💕</div>
        <div>Oops! Something went wrong loading the Cuddle Buddy Application.</div>
        <div style="font-size: 1rem; margin-top: 1rem;">Please refresh the page.</div>
        <div style="font-size: 0.8rem; margin-top: 0.5rem; color: #999;">Error: ${error.message}</div>
      </div>
    </div>
  `
}
