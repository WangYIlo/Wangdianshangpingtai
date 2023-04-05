<template>
  <div>
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层 Floor这个组件: 自己在组件内部是没有发请求的,数据是父组件给的 -->
    <Floor v-for="(floor) in floorList" :key="floor.id"  :list="floor" />
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
import Brand from "./Brand/Brand";
import Floor from "./Floor/Floor";
import Like from "./Like/Like";
import ListContainer from "./ListContainer/ListContainer";
import Rank from "./Rank/Rank";
import TodayRecommend from "./TodayRecommend/TodayRecommend";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    TodayRecommend,
  },
  mounted(){
    //派发action,获取floor组件的数据
    this.$store.dispatch('getFloorList')
    //派发action,获取用户信息首页展示
    this.$store.dispatch('getUserInfo')
  },
  computed:{
    ...mapState({floorList:(state)=>state.home.floorList})
  }
};
</script>

<style lang="less" scoped>
</style>