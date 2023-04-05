//当前这个模块:API进行统一管理
import requests from './ajax'
import mockRequests from './mockAjax'
import request from './ajax'

//三级联动接口
// /api/product/getBaseCategoryList get 无参
//发请求:axios发请求返回结果Promise对象
export const reqCategoryList = () => {
    return requests({
        method: 'GET',
        url: '/product/getBaseCategoryList'
    })
}

//获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => {
    return mockRequests.get('/banner')
}

//获取floors数据
export const reqFloorList = () => {
    return mockRequests.get('/floors')
}

//获取搜索模块数据 地址:/api/list 请求方式:post 需要带10个参数
//当前这个函数需要接收外部传递参数params---至少是一个空对象(否则请求会失败)
export const reqGetSearchInfo = (params) => {
    return requests({
        method: 'POST',
        url: '/list',
        data: params
    })
}

//获取产品详情信息的接口 URL：/api/item/{ skuId } 请求方式:get 参数id
export const reqGetGoodsInfo = (skuId) => {
    return requests({
        method: 'GET',
        url: `item/${skuId}`
    })
}

//将产品添加到购物车中,或者更新商品个数 URL:/api/cart/addToCart/{ skuId }/{ skuNum }   请求方式:post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return requests({
        method: 'POST',
        url: `/cart/addToCart/${skuId}/${skuNum}`
    })
}

//获取购物车列表接口 URL:/api/cart/cartList   请求方式:get
export const reqGetCartList = () => {
    return requests({
        method: 'GET',
        url: '/cart/cartList'
    })
}

//删除购物车商品 URL: /api/cart/deleteCart/{skuId}  请求方式:delete
export const reqDeleteCartById = (skuId) => {
    return requests({
        method: 'DELETE',
        url: `/cart/deleteCart/${skuId}`
    })
}

//切换商品选中状态 URL：/api/cart/checkCart/{skuId}/{isChecked}   请求方式:GET
export const reqUpdateCheckedById = (skuId, isChecked) => {
    return requests({
        method: 'GET',
        url: `/cart/checkCart/${skuId}/${isChecked}`
    })
}

//获取验证码 URL:/api/user/passport/sendCode/{phone}  请求方式:GET
export const reqGetCode = (phone) => {
    return requests({
        method: 'GET',
        url: `/user/passport/sendCode/${phone}`
    })
}


//注册用户 URL:/api/user/passport/register 请求方式:POST
export const reqUserRegister = (data) => {
    return requests({
        method: 'POST',
        url: '/user/passport/register',
        data
    })

}

//登录用户 URL:/api/user/passport/login   请求方式:POST
export const reqUserLogin=(data)=>{
    return request({
        method:'POST',
        url:'/user/passport/login',
        data
    })
}


//获取用户信息【需要带着用户的token向服务器要用户信息】
//URL：/api/user/passport/auth/getUserInfo  method: get
export const reqUserInfo=()=>{
    return requests({
        method:'GET',
        url:'/user/passport/auth/getUserInfo'
    })
}


//退出登录 URL：/api/user/passport/logout  method:GET
export const reqLogOut=()=>{
    return requests({
        method:'GET',
        url:'/user/passport/logout'
    })
}


//获取用户地址信息 URL:/api/user/userAddress/auth/findUserAddressList  method:GET
export const reqAddressInfo=()=>{
    return requests({
        method:'GET',
        url:'/user/userAddress/auth/findUserAddressList'
    })
}


// 获取订单交易页信息 URL:  /api/order/auth/trade   method:GET
export const reqOrderInfo=()=>{
    return requests({
        method:'GET',
        url:'/order/auth/trade'
    })
}


//提交订单  URL：/api/order/auth/submitOrder?tradeNo={tradeNo}  method:POST
export const reqCommitOrder=(tradeNo,data)=>{
    return requests({
        method:'POST',
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data
    })
}

//获取订单支付信息 URL：/api/payment/weixin/createNative/{orderId}  method:GET
export const reqGetOrder=(orderId)=>{
    return requests({
        method:'GET',
        url:`/payment/weixin/createNative/${orderId}`
    })
}


//获取支付订单状态  URL: /api/payment/weixin/queryPayStatus/{orderId}  method:get
export const reqPayStatus=(orderId)=>{
    return requests({
        method:'GET',
        url:`/payment/weixin/queryPayStatus/${orderId}`
    })
}

//获取我的订单列表  URL：/api/order/auth/{page}/{limit}  method:get
export const reqMyOrderList=(page,limit)=>{
    return requests({
        method:'GET',
        url:`/order/auth/${page}/${limit}`
    })
}