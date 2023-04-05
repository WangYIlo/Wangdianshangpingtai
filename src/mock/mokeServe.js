//引入mockjs模块
import Mock from 'mockjs'
//将JSON数据格式引入进来
//webpack默认对外暴露的:图片,JSON数据格式---不需要额外的export
import banner from './banner.json'
import floor from './floors.json'


//mock数据: 第一个参数请求地址,第二个参数:请求数据
Mock.mock('/mock/banner',{code:200,data:banner}) //模拟首页轮播图的数据
Mock.mock('/mock/floors',{code:200,data:floor})