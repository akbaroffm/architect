import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import reveal from './directives/reveal'
import { initLenis } from './composables/lenis'

initLenis()
createApp(App).use(router).directive('reveal', reveal).mount('#app')
