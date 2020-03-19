import Vue from 'vue'
import App from './App.vue'
import makeRouter from './router'
import makeStore from './store'
import './registerServiceWorker'
import api from '@/services/api'

import './assets/styles/custom.scss'

Vue.config.productionTip = false

Vue.prototype.$api = api

const store = makeStore(api)
const router = makeRouter(store)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
