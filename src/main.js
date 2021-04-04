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

//导入文件工具
import fileUtil from './utils/fileUtil';
Vue.prototype.$fileUtil = fileUtil;
//导入权限校验的工具
import rightUtil from './utils/rightUtil';
Vue.prototype.$rightUtil = rightUtil

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

//判断页面是否需要登陆
router.beforeEach((to,from,next)=>{
  if(to.meta.requireAuth){  //该页面需要身份验证
    if (store.state.user.username) {
      next()
    }else{
      next({
        path:'/',
        query:{redirect:to.fullPath}  //存储档期那访问的页面路径，用于登陆后跳转
      })
    }
  }else{
    next()
  }
})

new Vue({
  router,
  render: h => h(App),
  store,
}).$mount('#app')

