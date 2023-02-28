import "@total-typescript/ts-reset";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Icon } from '@iconify/vue';
import DateInput from './components/DateInput.vue'
import With from './components/With'
import { useModules } from './fresca'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('Icon', Icon)
app.component('DateInput', DateInput)
app.component('With', With)

app.mount('#app')
