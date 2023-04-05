import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from './router/index'
//引入仓库
import store from './store'

//三级联动组件---全局组件
import TypeNav from './components/TypeNav'
//轮播图---全局组件
import Carsousel from './components/Carsousel'
//分页器---全局组件
import Pagination from './components/Pagination'
import { MessageBox } from 'element-ui'


//第一个参数:全局组件的名字 第二个参数:哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsousel.name, Carsousel)
Vue.component(Pagination.name, Pagination)


//引入MockServere.js---mock数据
import '@/mock/mokeServe'
//引入swiper样式
import 'swiper/css/swiper.css'

//统一接口api文件夹里面的全部请求函数
import * as API from '@/api'
import lazyImg from './assets/logo.png'
//引入插件
import VueLazyload from 'vue-lazyload'


//引入自定义插件
import myPlugins from '@/plugins/myPlugins'

//引入校验插件
import './plugins/validate'

Vue.use(myPlugins,{
  name:"upper"
})


Vue.use(VueLazyload, {
  //懒加载默认图片
  loading: lazyImg
})


Vue.config.productionTip = false
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
  render: h => h(App),
  //全局事件总线$bus的配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //注册路由
  router,
  //注册仓库:组件实例的身上会多一个属性$store
  store
}).$mount('#app')
