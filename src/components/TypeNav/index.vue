<template>
  <div>
    <!-- 商品分类导航 -->
    <div class="type-nav">
      <div class="container">
        <div @mouseleave="restartIndex" @mouseenter="enterShow">
          <h2 class="all">全部商品分类</h2>
          <!-- 过渡动画 -->
          <transition name="sort">
            <!-- 三级联动 -->
            <div class="sort" v-show="show">
              <!-- 利用事件委派+编程式导航实现路由的跳转与传递参数 -->
              <div class="all-sort-list2" @click="goSearch">
                <div
                  class="item"
                  v-for="(c1, index) in categoryList"
                  :key="c1.categoryId"
                  :class="{ cur: currentIndex == index }"
                >
                  <h3 @mouseenter="changeIndex(index)">
                    <a
                      href="javascript:;"
                      :data-categoryName="c1.categoryName"
                      :data-category1Id="c1.categoryId"
                      >{{ c1.categoryName }}</a
                    >
                  </h3>
                  <!-- 二级，三级分类 -->
                  <div
                    class="item-list clearfix"
                    :style="{
                      display: currentIndex == index ? 'block' : 'none',
                    }"
                  >
                    <div
                      class="subitem"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dl class="fore">
                        <dt>
                          <a
                            href="javascript:;"
                            :data-categoryName="c2.categoryName"
                            :data-category2Id="c2.categoryId"
                            >{{ c2.categoryName }}</a
                          >
                        </dt>
                        <dd>
                          <em
                            v-for="c3 in c2.categoryChild"
                            :key="c3.categoryId"
                          >
                            <a
                              href="javascript:;"
                              :data-categoryName="c3.categoryName"
                              :data-category3Id="c3.categoryId"
                              >{{ c3.categoryName }}</a
                            >
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入lodash
import throttle from "lodash/throttle";
import Like from "@/pages/Home/Like/Like.vue";
export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标移上哪个一级分类
      currentIndex: -1,
      "data-categoryName": "",
      "data-categoryId": "",
      show: true,
    };
  },
  mounted() {
    // //通知Vuex发请求,获取数据，存储于store
    // this.$store.dispatch("categoryList");
    //当组件挂载完毕,通过判断路由路径让show属性变为false
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    //一级分类 鼠标进入修改响应式数据currentIndex属性
    //throttle 节流 回调函数别用箭头函数,可能出现上下文this
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    //一级分类 鼠标离开商品分类范围后,将它重置为-1 ,并且不展示show为false
    restartIndex() {
      this.currentIndex = -1;
      //限定范围 只有不在home模块下才允许列表消失
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    //进行路由跳转到search模块
    goSearch(event) {
      //最好的解决方案:编程式导航+事件委派
      //利用事件委派存在一些需要解决的问题
      //1.如何知道点击一定是a标签以及a标签如何区分是哪一个等级 2.如何获取参数

      //第一个问题:给a标签加上自定义属性
      //通过event.target获取触发事件的节点
      let element = event.target;
      //节点有一个dataset属性,可以获取节点的自定义属性与属性值,从而判断是否为a标签
      //并且取名data-xxxx data-会被忽略
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        //整理路由跳转参数
        let query = { categoryName: categoryname };
        //根据不同的级别id进行传参
        if (category1id) {
          query.category1Id = category1id;
        }
        if (category2id) {
          query.category2Id = category2id;
        }
        if (category3id) {
          query.category3Id = category3id;
        }

        //如果路由跳转的时候,有params参数,也要带过去
        let params
        if(this.$route.params){
           params=this.$route.params
        }
        this.$router.push({
          name: "search",
          query,
          params
        });
      }
    },
    //当鼠标移入的时候,控制鼠标
    enterShow() {
      //不需要限定范围 只有search模块show才为false，不会影响home模块
      this.show = true;
    },
  },
  components: { Like },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          //css 样式控制二三级分类的显示于隐藏
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }
    //过渡动画的样式
    //过渡动画开始进入的状态
    .sort-enter,.sort-leave-to{
      height: 0px;
      overflow: hidden;
    }
    //过渡动画开始结束的状态
    .sort-enter-to,.sort-leave{
      height: 461px;
    }
    .sort-enter-active,.sort-leave-active{
      transition: all .5s linear;
    }
  }
}

.cur {
  background-color: skyblue;
}
</style>