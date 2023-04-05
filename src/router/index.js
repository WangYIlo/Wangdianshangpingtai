//该文件夹专门用于创造整个应用的路由器
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

//使用插件
Vue.use(VueRouter)

//引入路由
import routes from './router'

// 重写push和replace方法
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}

//创建并暴露一个路由器
let router = new VueRouter({
    //配置路由
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

//全局守卫--前置守卫(在路由跳转之前进行判断)
router.beforeEach(async (to, from, next) => {
    //to:可以获取目标路由位置
    //from: 出发路由位置
    //next: 放行函数---next直接调用(放行)
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if (token) {
        //阻止已经登录的用户前往login
        if (to.path == '/login') {
            next('/home')
        } else {
            //前往别的地方,允许通过
            if (name) {
                next()
            } else {
                //防止用户在不是主页情况下，刷新
                //自己跳自己--导致getUserInfo没有派发--head组件数据消失
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    //token失效了---清空token
                   store.commit('CLEAR')
                   next('/login')
                }

            }


        }

    } else {
        //未登录:不能去交易相关页面,不能去支付相关[pay,paysuccess]，不能去个人中心[center]
        //能去(home|search|shopCart)
        let toPath=to.path
        if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            //把未登录的时候想去而去成的页面存储于query参数中
            next('/login?redirect='+toPath)
        }else{
            next() 
        }
       
    }
})


export default router