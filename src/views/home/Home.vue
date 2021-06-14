<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentscroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
    >
      <!--    轮播图-->
      <home-swiper :banners='banners'/>
      <!--    推荐信息-->
      <recommen-view :recommends="recommends"/>
      <!--    流行推荐-->
      <feature-view/>
      <!--    商品分类-->
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
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
      isShowBackTop:false
    }
  },
  computed:{
    //计算属性
    showGoods() {
      return this.goods[this.currentType].list;
    }
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
  methods:{
    /**
     * 事件监听相关的方法
     */
    tabClick(index){
      // console.log(index)
      this.currentType=Object.keys(this.goods)[index]

      // switch (index){
      //   case 0:
      //     this.currentType='pop'
      //     break
      //   case 1:
      //     this.currentType='new'
      //     break
      //   case 2:
      //     this.currentType='sell'
      // }
    },
    contentscroll(position){
      // console.log(position)
      // position.y < 1000  y轴 大于一千 显示回到顶部  小于则不显示 按键
      this.isShowBackTop = (-position.y) > 1000
    },
    loadMore(){
      // console.log('上拉加载')
      this.getHomeGoods(this.currentType)
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
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    /*层叠样式*/
    z-index: 9;
  }

  .tab-control{
    /*粘贴定位  滚动到某个位置是 进行粘贴  例如头部44是 粘贴*/
    position: sticky;
    top: 44px;
    /*设置层次*/
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
