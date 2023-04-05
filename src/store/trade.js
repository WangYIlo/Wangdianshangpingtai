import { reqAddressInfo,reqOrderInfo } from '@/api/index'

const state = {
    address:[],
    order:{}
}
const mutations = {
    GETUSERADDRESS(state,address){
        state.address=address
    },
    GETORDERINFO(state,order){
        state.order=order
    }
}
const actions = {
    //获取用户地址信息
    async getUserAddress({commit}) {
        let result = await reqAddressInfo()
        if(result.code==200){
            commit('GETUSERADDRESS',result.data)
            return 'ok'
        }
    },
    //获取商品清单信息
    async getOrderInfo({commit}){
        let result = await reqOrderInfo()
        console.log(result);
        if(result.code==200){
            commit('GETORDERINFO',result.data)
            return 'ok'
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}