import { reqGetCartList,reqDeleteCartById,reqUpdateCheckedById } from '@/api/index'

const state={
    cartList:[]
}
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }
}
const actions={
    //获取购物车列表数据
    async getCartList({commit}){
        let result=await reqGetCartList()
        if(result.code==200){
            commit('GETCARTLIST',result.data)
        }
    },
    //删除购物车一个商品
    async deleteCartList({commit},skuId){
        let result=await reqDeleteCartById(skuId)
        if(result.code==200){
           return 'ok'
        }else{
            throw new Error('fail')
        }
    },
    //切换商品状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result=await reqUpdateCheckedById(skuId,isChecked)
        if(result.code==200){
            return 'ok'
         }else{
             throw new Error('fail')
         }
    },
    //删除全部勾选的商品
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll=[]
        getters.cartList.cartInfoList.forEach(cart => {
          let promise= cart.isChecked==1?dispatch('deleteCartList',cart.skuId):'';
          //将每一次返回的promise添加数组中
          PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
    }
}
const getters={
    cartList(state){
        return state.cartList[0] || {}
    },
    //计算出来购物车数据-----cartList[0]可能为undefined
    // cartInfoList(state){
    //     return state.cartList[0].cartInfoList|| []
    // }
}

export default{
    state,
    mutations,
    actions,
    getters
}