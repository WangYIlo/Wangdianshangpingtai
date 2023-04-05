<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carsouel",
  props:['list'],
  watch: {
    list: {
      //立即监听(因为floor数据是父亲给的,list不会发生变化,所以需要immediate立即执行handler一次
      immediate: true,
      handler(newValue, oldValue) {
        //因为floor数据需要immediate,但是别的轮播图不需要立即执行handler一次(排除bug)
        if(this.list.length===0){
          return
        }
        this.$nextTick(function () {
          var swiper = new Swiper(this.$refs.cur, {
            loop: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style scoped>
</style>