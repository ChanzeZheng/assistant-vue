import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

//新建store
const store = new Vuex.Store({
    state: {
        //权限代码
        rightCode: {
            user: false,
            admin: false,
            monitor: false,
            studyMember: false,
        },

        //学校层级
        departmentLevel: [
            {
                departmentName: '计算机工程学院',
                gradeList: [
                    {
                        gradeName: '2017',
                        majorList: [
                            {
                                majorName: '软件工程',
                                alias: '软工',
                            },
                            {
                                majorName: '计算机科学与技术',
                                alias: '计科',
                            },
                            {
                                majorName: '网络工程',
                                alias: '网工',
                            },
                            {
                                majorName: '信息科学与技术',
                                alias: '信科',
                            }
                        ]
                    },
                    {
                        gradeName: '2018',
                        majorList: [
                            {
                                majorName: '软件工程',
                                alias: '软工',
                            },
                            {
                                majorName: '计算机科学与技术',
                                alias: '计科',
                            },
                            {
                                majorName: '网络工程',
                                alias: '网工',
                            },
                            {
                                majorName: '信息科学与技术',
                                alias: '信科',
                            }
                        ]
                    },
                    {
                        gradeName: '2019',
                        majorList: [
                            {
                                majorName: '软件工程',
                                alias: '软工',
                            },
                            {
                                majorName: '计算机科学与技术',
                                alias: '计科',
                            },
                            {
                                majorName: '网络工程',
                                alias: '网工',
                            },
                            {
                                majorName: '信息科学与技术',
                                alias: '信科',
                            }
                        ]
                    },
                    {
                        gradeName: '2020',
                        majorList: [
                            {
                                majorName: '软件工程',
                                alias: '软工',
                            },
                            {
                                majorName: '计算机科学与技术',
                                alias: '计科',
                            },
                            {
                                majorName: '网络工程',
                                alias: '网工',
                            },
                            {
                                majorName: '信息科学与技术',
                                alias: '信科',
                            }
                        ]
                    },
                ]

            },
            {
                departmentName: '管理学院',
                gradeList: [
                    {
                        gradeName: '2017',
                        majorList: [
                            {
                                majorName: '公共管理',
                                alias: '公管',
                            },
                            {
                                majorName: '工商管理',
                                alias: '工商',
                            },
                            {
                                majorName: '人力资源管理',
                                alias: '人资',
                            },
                            {
                                majorName: '会计',
                                alias: '会计',
                            }
                        ]
                    },
                    {
                        gradeName: '2018',
                        majorList: [
                            {
                                majorName: '公共管理',
                                alias: '公管',
                            },
                            {
                                majorName: '工商管理',
                                alias: '工商',
                            },
                            {
                                majorName: '人力资源管理',
                                alias: '人资',
                            },
                            {
                                majorName: '会计',
                                alias: '会计',
                            }
                        ]
                    },
                    {
                        gradeName: '2019',
                        majorList: [
                            {
                                majorName: '公共管理',
                                alias: '公管',
                            },
                            {
                                majorName: '工商管理',
                                alias: '工商',
                            },
                            {
                                majorName: '人力资源管理',
                                alias: '人资',
                            },
                            {
                                majorName: '会计',
                                alias: '会计',
                            }
                        ]
                    },
                    {
                        gradeName: '2020',
                        majorList: [
                            {
                                majorName: '公共管理',
                                alias: '公管',
                            },
                            {
                                majorName: '工商管理',
                                alias: '工商',
                            },
                            {
                                majorName: '人力资源管理',
                                alias: '人资',
                            },
                            {
                                majorName: '会计',
                                alias: '会计',
                            }
                        ]
                    },
                ]
            }
        ],

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
        },
        getDepartmentLevel(state) {
            return state.departmentLevel
        },
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
        addRightCode(context, rightCode) {
            context.commit('rightAllRightCode', rightCode)
        }
    }

})

export default store;