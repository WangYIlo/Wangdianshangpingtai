//登录注册模块
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogOut} from '@/api/index'


const state={
    code:'',
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
}
const mutations={
    GETCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    CLEAR(state){
        //清除相关用户信息
        state.token=''
        state.userInfo={}
         //清除本地存储
        localStorage.removeItem('TOKEN')
    }
}
const actions={
    //获取验证码
    async getCode({commit},phone){
        let result= await reqGetCode(phone)
        if(result.code==200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            throw new Error('bad message')
        }
    },
    //用户注册
    async userRegister({commit},data){
        let result=await reqUserRegister(data)
        if(result.code==200){
            return 'ok'
        }else{
            throw new Error(result.message)
        }
    },
    //用户登录--登录业务[token]
    async userLogin({commit},data){
        let result=await reqUserLogin(data)
        //服务器下发token,用户唯一的标识
        if(result.code==200){
            commit('USERLOGIN',result.data.token)
            //持久化存储token
            localStorage.setItem('TOKEN',result.data.token)
            return 'ok'
        }else{
            throw new Error(result.message)
        }
        
    },
    //获取用户信息
   async getUserInfo({commit}){
       let result=await reqUserInfo()
       if(result.code==200){
        commit('GETUSERINFO',result.data)
        return 'ok'
       }else{
        throw new Error('faile')
       }
    },
    async userLogOut({commit}){
        //只是向服务器发起一次请求,通知服务器清除token
       let result=await reqLogOut()
       if(result.code==200){
            commit('CLEAR')
            return 'ok'
       }else{
        throw new Error('faile')
       }
    }
}
const getters={}

export default{
    state,
    mutations,
    actions,
    getters
}
