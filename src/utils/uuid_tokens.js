import { v4 as uuidv4 } from 'uuid';
//要生成一个随机字符串,且每次执行不能发生变化
export const getUUID=()=>{
    //先从本地存储获取uuid(看一下本地存储中是否有uuid)
    let uuid_token=localStorage.getItem('UUIDTOKEN')
    // //如果没有则生成
    if(!uuid_token){
        //生成游客临时身份
        uuid_token=uuidv4();
        //本地储存一次
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}