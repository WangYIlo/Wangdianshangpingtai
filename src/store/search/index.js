import { reqGetSearchInfo } from '@/api/index'
//search 模块的小仓库
const state = {
    searchList: {}
}
const mutations = {
    GETSEARCHILIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    //获取search模块数据
    //params形参: 是当用户派发action的时候,第二个参数传递过来的参数
    async getSearchList(context, params = {}) {
        let result = await reqGetSearchInfo(params)
        if (result.code === 200) {
            context.commit('GETSEARCHILIST', result.data)
        }
    }
}
//getters作用:简化数据---可以将需要的数据简化一下
const getters = {
    goodsList(state) {
        //如果服务器数据没有得到需要返回一个空数组处理
        return state.searchList.goodsList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
}

//对外暴露
export default {
    state,
    mutations,
    actions,
    getters
}