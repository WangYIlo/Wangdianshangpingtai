import {reqGetGoodsInfo,reqAddOrUpdateShopCart} from '@/api/index'
import {getUUID} from '@/utils/uuid_tokens'

const state={
    goodsInfo:{},
    //游客临时身份
    uuid_token: getUUID(),
}
const mutations={
    GETGOODSINFO(state, goodsInfo){
        state.goodsInfo=goodsInfo
    }
}
const actions={ 
    //获取产品信息的action
    async getGoodsInfo(context,skuId){
        let result=await reqGetGoodsInfo(skuId)
        if(result.code===200){
            context.commit('GETGOODSINFO',result.data)
        }
    },
    //将产品添加到购物车中
    async addorUpdateShopCart({commit},{skuId,skuNum}){
        //加入购物车以后(发请求),前台将参数带给服务器
        //服务器并没有返回任何数据,没并要进行state存储
        let result=await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code==200){
            return 'ok'
        }
        return Promise.reject(new Error('faile'))
    }
}
const getters={
    categoryView(state){
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList || []
    },
}

//对外暴露
export default{
    state,
    mutations,
    actions,
    getters
}