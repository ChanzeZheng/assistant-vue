import Vue from 'vue'
import App from './App.vue'
//导入element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//导入router
import router from './router'
//导入axios
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store/store";

//use方法相当于调用install
Vue.use(Element)
Vue.use(VueAxios,axios)
Vue.config.productionTip = false

//配置axios
Vue.prototype.$axios=axios
axios.defaults.timeout=5000;
axios.defaults.headers.post['Content-Type']='application/json;charset=UTF-8';
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials=true

new Vue({
  router,
  render: h => h(App),
  store,
}).$mount('#app')

