import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)



const routes = [
    {
        path: '/home',
        name: 'Home',
        //懒加载
        component: () => import('../views/Home'),
        children:[
            //用户信息管理模块
            {
                path: '/PersonInfo',
                name: '个人信息',
                component: () => import('../views/User/PersonInfo')
            },
            {
                path: '/ChangePassword',
                name:'修改密码',
                component:()=>import('../views/User/ChangePassword')
            },
            //用户作业模块
            {
                path:'/HomeworkView',
                name:'查看作业',
                component:()=>import('../views/Homework/HomeworkView')
            },
            {
                path: '/SubmitHomework',
                name:'提交作业',
                component:()=>import('../views/Homework/SubmitHomework')
            },
            {
                path: '/ModifyHomework',
                name:'修改作业内容',
                component:()=>import('../views/Homework/ModifyHomework')
            },
            //消息管理模块
            {
                path: '/NotificationView',
                name:'查看所有消息',
                component:()=>import('../views/Notification/AllNotification')
            },
            {
                path:'/UnReadNotification',
                name:'查看未读消息',
                component:()=>import('../views/Notification/UnReadNotification')
            },
            {
                path:'/UnReadHomeworkStudent',
                name: '查看未读某条作业通知的学生',
                component:()=>import('../views/Notification/UnReadHomeworkStudent')
            },
            {
                path: '/UnReadStudent',
                name: '某条通知未读的学生',
                component:()=>import('../views/Notification/UnReadStudent')
            },
            // 班级管理模块
            {
                path:'/ClassInfo',
                name:'班级信息',
                component:()=>import('../views/ClassManage/ClassInfo')
            },
            {
                path: '/FirstLoginStudent',
                name:'查看还未登陆过系统的学生',
                component:()=>import('../views/ClassManage/FirstLoginStudent')
            },
            {
                path:'/PublishNotification',
                name: '发布通知',
                component:()=>import('../views/ClassManage/PublishNotification')
            },
            {
                path:'/ResetStudentPassword',
                name:'重置学生密码',
                component:()=>import('../views/ClassManage/ResetStudentPassword')
            },
            // 班级作业管理模块
            {
                path: '/PublishHomework',
                name: '发布新作业',
                component:()=>import('../views/HomeworkManage/PublishHomework')
            },
            {
                path:'/SubmitSituation',
                name:'查看作业提交情况',
                component:()=>import('../views/HomeworkManage/SubmitSituation')
            },
            {
                path: '/ZipHomework',
                name:'打包下载班级作业',
                component:()=>import('../views/HomeworkManage/ZipHomework')
            },
            {
                path: '/SystemSetting',
                name:'系统设置',
                component:()=>import('../views/User/SystemSetting')
            },
        ]
    },
    {
        path: '/',
        name: 'Login',
        component: ()=>import('../views/Login')
    },

]

const router = new VueRouter({
    routes,
    mode:'history'
})

export default router
