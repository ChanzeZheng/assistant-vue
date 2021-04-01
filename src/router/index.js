import Vue from 'vue'
import VueRouter from 'vue-router'
// import PersonInfo from "../components/PersonInfo";

Vue.use(VueRouter)



const routes = [
    {
        path: '/home',
        name: 'Home',
        //懒加载
        component: () => import('../views/Home')
    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // },
    {
        path: '/',
        name: 'Login',
        component: ()=>import('../views/Login')
    },
    {
        path:'/PersonInfo',
        name:'PersonInfo',
        component:()=>import('../views/PersonInfo')
    }
]

const router = new VueRouter({
    routes,
    mode:'history'
})

export default router
