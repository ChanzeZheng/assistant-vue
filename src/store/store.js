import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

//新建store
const store = new Vuex.Store({
    state: {
        rightCode: {
            user: false,
            admin: false,
            monitor: false,
            studyMember: false,
        }
    },
    getters: {
        //实时监听state值的变化
        isUser(state) {
            return state.rightCode.user
        },
        isAdmin(state) {
            return state.rightCode.admin
        },
        isMonitor(state) {
            return state.rightCode.monitor
        },
        isStudyMember(state) {
            return state.rightCode.studyMember
        }
    },
    mutations: {
        rightUser(state) {
            //授予用户权限，更改state中的user
            state.rightCode.user = true
        },
        rightAdmin(state) {
            //授予管理者权限，更改state中的admin
            state.rightCode.admin = true
        },
        rightMonitor(state) {
            state.rightCode.monitor = true;
            state.rightCode.user = true;
        },
        rightStudyMember(state) {
            state.rightCode.studyMember = true
            state.rightCode.user = true
        },
        rightAllRightCode(state, rightCode) {
            //直接授权整个权限
            alert('right222：'+rightCode)
            state.rightCode = rightCode
        }
    },
    //全局改变值
    actions: {
        addRightUserAction(context) {
            context.commit('rightUser')
        },
        addRightAdmin(context) {
            context.commit('rightAdmin')
        },
        addRightMonitor(context) {
            context.commit('rightMonitor')
        },
        addRightStudyMember(context) {
            context.commit('rightStudyMember')
        },
        addRightCode(context,rightCode) {
            context.commit('rightAllRightCode',rightCode)
        }
    }

})

export default store;