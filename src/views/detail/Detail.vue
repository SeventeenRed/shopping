<template>
  <div id="detail">
<!--    导航栏-->
    <detail-nav-bar class="detail-nav"/>

    <scroll class="content" ref="scroll">
      <!--    轮播图-->
      <detail-swiper :top-images="topImages"/>
      <!--    详情信息-->
      <detail-base-info :goods="goods"/>
      <!--    店铺信息-->
      <detail-shop-info :shop="shop"/>
      <!--    评论信息-->
      <detail-images-info :images-info="detailInfo" @imageLoad="imageLoad"/>
      <!--    商品信息-->
      <detail-param-info :param-info="parmInfo"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
//导入详情数据的文字参数
import DetailBaseInfo from "./childComps/DetailBaseInfo";
//导入店铺信息
import DetailShopInfo from "./childComps/DetailShopInfo";
//评论信息
import DetailImagesInfo from "./childComps/DetailImagesInfo";
//商品信息
import DetailParamInfo from "./childComps/DetailParamInfo";

//滚动样式
import Scroll from "components/common/scroll/Scroll";


//网络请求数据
import {getDetail,Goods,Shop,GoodsParam} from "network/detail";

export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailImagesInfo,
    DetailParamInfo
  },
  data(){
    return{
      //保存传输过来的iid数据
      iid:null,
      //保存图片参数
      topImages:[],
      //存储商品信息
      goods: {},
      shop: {},
      detailInfo:{},
      parmInfo:{}
    }
  },
  created() {
    // console.log(this.$route.params.iid)
    //1.保存传入的iid
    this.iid = this.$route.params.iid

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res=>{
      console.log(res)

      const data=res.result;

      //让res请求过来的图片数据保存在一个参数里
      //1.获取顶部的图片轮播图数据
      this.topImages = res.result.itemInfo.topImages

      //2.获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      //3.创建店铺信息
      this.shop = new Shop(data.shopInfo)

      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //5.获取参数信息
      this.parmInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

    })
  },
  methods:{
    imageLoad(){
      //获取详情信息 进行刷新
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
  #detail{
    /*相对定位*/
    position: relative;
    /*层叠样式*/
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  /*设置导航栏样式*/
  .detail-nav{
    /*相对定位*/
    position: relative;
    /*重叠样式*/
    z-index: 9;
    background-color: #fff;
  }

  /*设置滚动高度*/
  .content{
    height: calc(100% - 44px);
  }
</style>
