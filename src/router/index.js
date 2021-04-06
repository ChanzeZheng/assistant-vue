import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
    {
        path: '/home',
        name: 'Home',
        //懒加载
        component: () => import('../views/Home'),
        children: [
            //用户信息管理模块
            {
                path: '/PersonInfo',
                name: '个人信息',
                component: () => import('../views/User/PersonInfo'),
                meta:{
                    requireAuth:true        //该页面需要登陆
                }
            },
            {
                path: '/ChangePassword',
                name: '修改密码',
                component: () => import('../views/User/ChangePassword'),
                meta:{
                    requireAuth:true        //该页面需要登陆
                }
            },
            //用户作业模块
            {
                path: '/HomeworkView',
                name: '查看作业',
                component: () => import('../views/Homework/HomeworkView'),
                meta:{
                    requireAuth:true        //该页面需要登陆
                }
            },
            {
                path: '/SubmitHomework',
                name: '提交作业',
                component: () => import('../views/Homework/SubmitHomework'),
                meta:{
                    requireAuth:true        //该页面需要登陆
                }
            },
            {
                path: '/ModifyHomework',
                name: '修改作业内容',
                component: () => import('../views/Homework/ModifyHomework'),
                meta:{
                    requireAuth:true        //该页面需要登陆
                }
            },
            //消息管理模块
            {
                path: '/NotificationView',
                name: '查看所有消息',
                component: () => import('../views/Notification/AllNotification'),
                meta:{
                    requireAuth:true        //该页面需要登陆
                }
            },
            {
                path: '/UnReadNotification',
                name: '查看未读消息',
                component: () => import('../views/Notification/UnReadNotification'),
                meta:{
                    requireAuth:true        //该页面需要登陆
                }
            },
            {
                path: '/UnReadHomeworkStudent',
                name: '查看未读某条作业通知的学生',
                component: () => import('../views/Notification/UnReadHomeworkStudent'),
                meta:{
                    requireAuth:true        //该页面需要登陆
                }
            },
            {
                path: '/UnReadStudent',
                name: '某条通知未读的学生',
                component: () => import('../views/Notification/UnReadStudent'),
                meta:{
                    requireAuth:true        //该页面需要登陆
                }
            },
            // 班级管理模块
            {
                path: '/ClassInfo',
                name: '查看班级信息',
                component: () => import('../views/ClassManage/ClassInfo'),
                meta:{
                    requireAuth:true        //该页面需要登陆
                }
            },
            {
                path: '/FirstLoginStudent',
                name: '查看还未登陆过系统的学生',
                component: () => import('../views/ClassManage/FirstLoginStudent'),
                meta:{
                    requireAuth:true        //该页面需要登陆
                }
            },
            {
                path: '/ClassInfoMaintain',
                name:'班级信息维护',
                component:()=>import('../views/ClassManage/ClassInfoMaintain'),
                meta:{
                    requireAuth:true        //该页面需要登陆
                }
            },
            {
                path: '/PublishNotification',
                name: '发布通知',
                component: () => import('../views/ClassManage/PublishNotification'),
                meta:{
                    requireAuth:true        //该页面需要登陆
                }
            },
            {
                path: '/ResetStudentPassword',
                name: '重置学生密码',
                component: () => import('../views/ClassManage/ResetStudentPassword'),
                meta:{
                    requireAuth:true        //该页面需要登陆
                }
            },
            // 班级作业管理模块
            {
                path: '/PublishHomework',
                name: '发布新作业',
                component: () => import('../views/HomeworkManage/PublishHomework'),
                meta:{
                    requireAuth:true        //该页面需要登陆
                }
            },
            {
                path: '/SubmitSituation',
                name: '查看作业提交情况',
                component: () => import('../views/HomeworkManage/SubmitSituation'),
                meta:{
                    requireAuth:true        //该页面需要登陆
                }
            },
            {
                path: '/ZipHomework',
                name: '打包下载班级作业',
                component: () => import('../views/HomeworkManage/ZipHomework'),
                meta:{
                    requireAuth:true        //该页面需要登陆
                }
            },
            {
                path: '/SystemSetting',
                name: '系统设置',
                component: () => import('../views/User/SystemSetting'),
                meta:{
                    requireAuth:true        //该页面需要登陆
                }
            },
            //管理员系统管理模块
            {
                path: '/GlobalClassInfo',
                name: '全局班级信息',
                component: () => import('../views/Admin/GlobalClassInfo'),
                meta:{
                    requireAuth:true        //该页面需要登陆
                }
            },
            {
                path: '/ChangeAdminPassword',
                name: '管理员修改密码',
                component: () => import('../views/Admin/ChangeAdminPassword'),
                meta:{
                    requireAuth:true        //该页面需要登陆
                }
            }
        ]
    },
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/Login'),
        children: [
            {
                path: '/userLogin',
                name: '用户登陆',
                component: () => import('../views/UserLogin')
            },
            {
                path: '/adminLogin',
                name: '管理员登陆',
                component: () => import('../views/AdminLogin')
            }
        ]
    },

]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router
