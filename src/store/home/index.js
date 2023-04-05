//home 模块的小仓库

import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api/index'

const state={
    //三级列表的数据
    categoryList:[],
    //轮播图的数据
    bannerList:[],
    //floor数据
    floorList:[]
}
const mutations={
    REQCATEGORYLIST(state,categoryList){
        categoryList.pop()
        state.categoryList=categoryList
    },
    REQGETBANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    REQFLOORLIST(state,floorList){
        state.floorList=floorList
    }
}
const actions={
    //通过API里面的接口函数调用,向服务器发请求,获取数据
    //三级列表
    async categoryList(context){
        let result= await reqCategoryList()
        if(result.code===200){
            context.commit('REQCATEGORYLIST',result.data)
        }
    },
    //轮播图
    async getBannerList(context){
       
        let result=await reqGetBannerList() 
        if(result.code==200){
            context.commit('REQGETBANNERLIST',result.data)
        }
    },
    //floor
    async getFloorList(context){    
        let result=await reqFloorList() 
        if(result.code==200){
            context.commit('REQFLOORLIST',result.data)
        }
    }
}
//计算属性
const getters={}

//对外暴露
export default{
    state,
    mutations,
    actions,
    getters
}