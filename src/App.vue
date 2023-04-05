<template>
  <div>
    <!-- <h1 v-upper="msg"></h1> -->
    <Header></Header>
    <router-link to="/home"></router-link>
    <!-- 路由呈现位置 -->
    <router-view></router-view>
    <!-- 优化方案--采用路由元信息meta -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";
export default {
  name: "App",
  components: { Header, Footer },
  data() {
    return {
      msg:'s'
    }
  },
  mounted(){
     //通知Vuex发请求,获取商品分类的三级列表数据，存储于store---不会在路由切换时重新发请求
     this.$store.dispatch("categoryList");
  }
};
</script>

<style scope>
</style>