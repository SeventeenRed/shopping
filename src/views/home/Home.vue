<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentscroll"
            :pull-up-load="true"
            @pullingUp="loadMore">

      <!--    轮播图-->
      <home-swiper :banners='banners' @swiperImageLoad="swiperImageLoad"/>
      <!--    推荐信息-->
      <recommen-view :recommends="recommends"/>
      <!--    流行推荐-->
      <feature-view/>
      <!--    商品分类-->
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <!--    商品内容-->
      <goods-list :goods="showGoods"/>
    </scroll>
    <!--      在我们需要监听一个组件的原生事件时，必须给一个事件加上.native修饰符，才能进行监听-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
<!--    ul>li{流行$}*100-->
  </div>
</template>

<script>
//导入轮播图
import HomeSwiper from "./childComps/HomeSwiper";
//导入推荐信息展示
import RecommenView from "./childComps/RecommenView";
//导入流行信息
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/contents/tabContol/TabControl";
//商品内容
import GoodsList from "components/contents/goods/GoodsList";
//引入滚动页面
import Scroll from "components/common/scroll/Scroll";
//设置回到顶部的按钮
import BackTop from "components/contents/backTop/BackTop";

//当导出不是default是 需要用{}进行命名
//网络请求数据
import {getHomeMultidata,getHomeGoods} from "network/home";
//导入防止页面抖动
import {debounce} from "common/utils";


export default {
  name: "home",
  components:{
    HomeSwiper,
    RecommenView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return{
      // result:null
      //存储服务数据
      banners:[],
      recommends:[],
      goods:{
        //内容  页数     数据
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      //当传入的值小于一千时 默认false 则 大于 显示 true
      isShowBackTop:false,
      //保存吸顶效果位置
      tabOffsetTop: 0,
      //决定首页是否吸顶  默认不吸顶
      isTabFixed:true,
      saveY:0
    }
  },
  computed:{
    //计算属性
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  activated() {
    // 当前的位置
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    //刷新
    this.$refs.scroll.refresh()
  },
  deactivated() {
    //保存当前的函数
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY)

    //取消全局事件监听
    this.$bus.$off('itemImageLoad')
  },
  //创建生命周期 当已加载就进行请求数据
  created() {
    //抽取抽取的数据进行封装调用

    //网络请求多个数据
    this.getHomeMultidata()

    //网络请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted() {
    //1.监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh,50)
    this.$bus.$on('itemImageLoad',() => {
      refresh()
    })
    // this.$bus.$on('itemImageLoad',()=>{
    //   // console.log('-----')
    //   this.$refs.scroll.refresh()
    // })

    //2.获取tabControl的offsetTop
    //所有组件都有个属性$el:用于获取组件中的元素
    // this.tabOffsetTop = this.$refs.tabControl.offsetTop
  },
  methods:{
    /**
     * 事件监听相关的方法
     */

    tabClick(index){
      // console.log(index)
      // this.currentType=Object.keys(this.goods)[index]

      switch (index){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
      }
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index;
    },
    contentscroll(position){
      // console.log(position)
      // position.y < 1000  y轴 大于一千 显示回到顶部  小于则不显示 按键
      //1.判断BackTop是否显示  | 判断上拉加载图标是否显示
      this.isShowBackTop = (-position.y) > 1000

      //2.决定tabControl是否吸顶（position:fixed） | 决定首页分类是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      // console.log('上拉加载')
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      // console.log(this.$refs.tabControl.$el.offsetTop)
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
    },

    /**
     * 网络请求相关的方法
     */
    //将网络请求数据抽取出来进行封装
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        // console.log(res)
        // this.banners=res.data.banner
        //存储数据
        // this.result=res
        this.banners=res.data.banner.list
        this.recommends=res.data.recommend.list
      })
    },
    getHomeGoods(type){
      //动态绑定页数
      const page=this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        // console.log(res)
        //获取数据
        // for(let n of res.data.list){
        //   this.goods[type].list.push(n)
        // }
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page+=1

        //因为scroll只能加载一次，所以需要调用finishPullUp 加载更多
        this.$refs.scroll.finishPullUp()
      })
    },
    backClick(){
      // console.log('点击')
      this.$refs.scroll.scrollTo(0,0)
      // this.$refs.scroll.message
    }
  }
}
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    /*设置height:100vh，该元素会被撑开屏幕高度一致*/
    height: 100vh;
    /*相对定位*/
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    /*font-size: 20px;*/
    color: #fff;

    /*固定定位*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*层叠样式*/
    /*z-index: 9;*/
  }

  .tab-control{
    /*相对定位*/
    position: relative;
    /*重叠样式*/
    z-index: 9;
  }

  .content{
    /*隐藏溢出*/
    overflow: hidden;
    /*绝对定位*/
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*.content{*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
