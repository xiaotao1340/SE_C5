/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// addition
import router from './router'
import store from './store'

const app = createApp(App)

registerPlugins(app)

// 添加路由
app.use(router)
// 添加状态管理
app.use(store)
app.mount('#app')
