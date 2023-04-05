//路由配置信息

//引入路由组件
import Home from '@/pages/Home/'
import Search from '@/pages/Search/'
import Login from '@/pages/Login/'
import Register from '@/pages/Register/'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

//当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
//如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
//路由懒加载
const foo=()=>{
    return import('@/pages/Home')
}


//路由配置信息
export default [
    {
        path: '/home',
        component: foo,
        meta: { show: true }
    },
    {
        name: 'search',
        //加上？--params可传参可不传参
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true }
    },
    {
        path: '/login',
        //路由懒加载
        component: ()=>import('@/pages/Login')
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/detail/:skuId?',
        component: Detail,
        meta: { show: true }
    },
    {
        name:'addCartSuccess',
        path: '/addcartsuccess/',
        component:AddCartSuccess,
        meta: { show: true }
    },
    {
        name:'shopCart',
        path: '/shopcart/',
        component:ShopCart,
    },
    {
        path: '/trade',
        component: Trade,
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart'){
                next()
            }else{
                 next(false) 
            }
           
        }
    },
    {
        path: '/pay',
        component: Pay,
        beforeEnter:(to,from,next)=>{
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component: PaySuccess
    },
    {
        path: '/center',
        component: Center,
        //二级路由
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    //重定向,在项目跑起来的时候,访问的是Home
    {
        path: '*',
        redirect: '/home'
    }
]