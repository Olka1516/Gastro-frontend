import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { i18n } from './lang'
import App from './App.vue'
import router from './router'

import 'leaflet/dist/leaflet.css'

const app = createApp(App)

app.use(createPinia()).use(router).use(i18n)

app.mount('#app')
