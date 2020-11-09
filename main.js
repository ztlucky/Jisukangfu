import Vue from 'vue'
import App from './App'
import api from './config/api'
import base from './common/app'
 import zhouWeiNavBar from "@/components/zhouWei-navBar";
 Vue.component("nav-bar", zhouWeiNavBar);
 
 Vue.prototype.$api = api
Vue.prototype.$app = base

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
