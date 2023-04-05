//Vue插件一定暴露一个对象
let myPlugins={}

myPlugins.install=function(Vue,options){
  Vue.directive(options.name,(element,params)=>{
    console.log(element);
    console.log(params);
    console.log('自定义指令');
    element.innerHTML=params.value.toUpperCase()
  })
}

export default myPlugins