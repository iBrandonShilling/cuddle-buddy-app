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
  { path: '/results', name: 'Results', component: Results },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const pinia = createPinia()

// Add error handling
try {
  const app = createApp(App)
  app.use(pinia)
  app.use(router)
  app.mount('#app')
} catch (error) {
  console.error('Vue app failed to mount:', error)
  document.getElementById('app').innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(135deg, #FFB6C1, #FFC0CB, #DDA0DD); font-family: 'Dancing Script', cursive; color: #FF7F7F; font-size: 2rem; text-align: center;">
      <div>
        <div style="font-size: 4rem; margin-bottom: 1rem;">💕</div>
        <div>Oops! Something went wrong loading the Cuddle Buddy Application.</div>
        <div style="font-size: 1rem; margin-top: 1rem;">Please refresh the page.</div>
      </div>
    </div>
  `
}
