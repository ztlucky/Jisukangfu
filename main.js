import Vue from 'vue'
import App from './App'
import api from './config/api'
import base from './common/app'
 
 
 Vue.prototype.$api = api
Vue.prototype.$app = base

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
