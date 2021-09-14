import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'


createApp(App).use(store).use(mdiVue, {
    icons: mdijs
}).mount('#app')

try {
    store.state.scoreboard = JSON.parse(localStorage.getItem("scoreboard"))??[]
} catch (error) {
    
}

