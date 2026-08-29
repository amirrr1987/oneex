import '@/assets/css/main.css'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { MotionPlugin } from '@vueuse/motion'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { queryClient } from '@api/query-client'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(VueQueryPlugin, { queryClient })
app.use(MotionPlugin)

const auth = useAuthStore()
void auth.hydrate()

app.mount('#app')
