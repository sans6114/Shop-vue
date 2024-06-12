import './assets/main.css'
import 'vue-toastification/dist/index.css'

import { createApp } from 'vue'

import { createPinia } from 'pinia'
import Toast from 'vue-toastification'

import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)
app.use(Toast)

app.mount('#app')
