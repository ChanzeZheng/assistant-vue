//权限校验的工具
const rightUtil = {

    //用于页面校验是否是管理员
    pageCheckRightAdmin(store, router) {
        if (!store.getters.isAdmin) {
            alert(store.getters.isAdmin)
            router.push('/')
        }
    },

}

module.exports = rightUtil