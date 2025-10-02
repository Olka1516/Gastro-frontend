import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { i18n } from './lang'
import App from './App.vue'
import router from './router'
import Toast, { POSITION, type PluginOptions } from 'vue-toastification'

import 'leaflet/dist/leaflet.css'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 2000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
}

app.use(createPinia()).use(router).use(i18n).use(Toast, options)

app.mount('#app')
