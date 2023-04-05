<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li
              class="with-x"
              v-if="searchParmas.categoryName"
              @click="removeCategoryName"
            >
              {{ searchParmas.categoryName }}<i>×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li
              class="with-x"
              v-if="searchParmas.keyword"
              @click="removeKeyword"
            >
              {{ searchParmas.keyword }}<i>×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li
              class="with-x"
              v-if="searchParmas.trademark"
              @click="removeTrademark"
            >
              {{ searchParmas.trademark.split(":")[1] }}<i>×</i>
            </li>
            <!-- 平台的售卖的属性值展示 -->
            <li
              class="with-x"
              v-for="(prop, index) in searchParmas.props"
              :key="index"
              @click="removeProp(index)"
            >
              {{ prop.split(":")[1] }}<i>×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @trademarkInfo="trademarkInfo"
          @proposInfo="proposInfo"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder(1)">
                  <a href="#" v-show="!isOne">综合</a>
                  <a href="#" v-show="isAsc && isOne">综合⬆</a>
                  <a href="#" v-show="isDesc && isOne">综合⬇</a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder(2)">
                  <a href="#" v-show="!isTwo">价格</a>
                  <a href="#" v-show="isAsc && isTwo">价格⬆</a>
                  <a href="#" v-show="isDesc && isTwo">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 路由跳转到detail路由 -->
                    <router-link :to="`/detail/${good.id}`" >
                      <img v-lazy="good.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>&nbsp;
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 continues指一次显示多少页-->
          <Pagination
            :pageNo="searchParmas.pageNo"
            :pageSize="searchParmas.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      //带给服务器参数
      searchParmas: {
        //一级分类id
        category1Id: "",
        //二级分类id
        category2Id: "",
        //三级分类id
        category3Id: "",
        //分类名字
        categoryName: "",
        //搜索关键字
        keyword: "",
        //排序:初始状态为综合的降序
        order: "1:desc",
        //分页器用的: 代表的是当前第几页
        pageNo: 1,
        //代表每一页展示数据的个数
        pageSize: 10,
        //平台售卖属性操作带的参数
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  //整理searchParmas数据在mounted里进行发送
  beforeMount() {
    Object.assign(this.searchParmas, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
  },
  computed: {
    //mapGetters里面的写法:传递数据,因为getters是没有划分模块的(本身就是为了简化数据)
    ...mapGetters(["goodsList", "attrsList", "trademarkList"]),
    isOne() {
      return this.searchParmas.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParmas.order.indexOf("2") != -1;
    },
    isDesc() {
      return this.searchParmas.order.indexOf("desc") != -1;
    },
    isAsc() {
      return this.searchParmas.order.indexOf("asc") != -1;
    },
    //获取search模块数据总数
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
  },
  methods: {
    //向服务器发送请求获取search模块数据(根据参数不同返回不同的数据进行展示)
    //把这次请求封装为一个函数,当你需要调用的时候进行调用即可
    getData() {
      this.$store.dispatch("getSearchList", this.searchParmas);
    },
    //删除bread中的搜索分类名字
    removeCategoryName() {
      //将带给服务器的参数滞空
      //带给服务器参数说明可有可无,如果属性值为空的字符串还是会把数据带给服务器
      //设置为undefined就不会带空数据过去--优化性能
      this.searchParmas.categoryName = undefined;
      this.searchParmas.category1Id = undefined;
      this.searchParmas.category2Id = undefined;
      this.searchParmas.category3Id = undefined;
      this.getData();
      //地址栏也需要改变:进行路由跳转--跳回search首页
      //严谨: 本意是删除query参数，如果路径当中出现params参数，需要带回
      this.$router.push({
        name: "search",
        params: this.$route.params || {},
      });
    },
    //删除bread中的搜索关键字
    removeKeyword() {
      this.searchParmas.keyword = undefined;
      this.getData();
      //通知兄弟组件Header清除关键字
      this.$bus.$emit("clear");
      this.$router.push({
        name: "search",
        query: this.$route.query || {},
      });
    },
    //自定义事件回调
    trademarkInfo(trademark) {
      //将获得的数据进行凭借
      this.searchParmas.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    //删除bread中的品牌
    removeTrademark() {
      this.searchParmas.trademark = undefined;
      this.getData();
    },
    //自定义事件回调--手机平台属性
    proposInfo(attr, attrValue) {
      // ["属性ID:属性值:属性名"]
      //参数格式整理好
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //数组去重(只有不一样才发送请求)
      if (this.searchParmas.props.indexOf(props) == -1) {
        this.searchParmas.props.push(props);
        this.getData();
      }
    },
    //删除bread中的prop
    removeProp(index) {
      this.searchParmas.props.splice(index, 1);
      //删除数据后应该再次发请求
      this.getData();
    },
    //切换价格和综合的排序
    changeOrder(flag) {
      //flag为1 综合 flag为2 价格
      if (flag == 1) {
        this.searchParmas.order =
          this.searchParmas.order == "1:desc" ? "1:asc" : "1:desc";
      } else if (flag == 2) {
        this.searchParmas.order =
          this.searchParmas.order == "2:desc" ? "2:asc" : "2:desc";
      }
      this.getData();
    },
    //自定义事件--获取点击的页码
    getPageNo(pageNo){
      this.searchParmas.pageNo=pageNo
      this.getData()
    }
  },
  watch: {
    //通过监听$route---确保query和params的数据改变
    $route: {
      handler(newValue, oldValue) {
        //再次发请求之前需要再整理带给服务器参数
        Object.assign(this.searchParmas, this.$route.query, this.$route.params);
        this.getData();
        //每一次请求完毕,应该把相应的1,2,3级id滞空
        this.searchParmas.category1Id = undefined;
        this.searchParmas.category2Id = undefined;
        this.searchParmas.category3Id = undefined;
      },
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>