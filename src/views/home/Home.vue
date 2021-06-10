<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
<!--    轮播图-->
    <home-swiper :banners='banners'/>
<!--    推荐信息-->
    <recommen-view :recommends="recommends"/>
<!--    -->
    <feature-view/>

<!--    ul>li{流行$}*100-->
    <ul>
      <li>流行1</li>
      <li>流行2</li>
      <li>流行3</li>
      <li>流行4</li>
      <li>流行5</li>
      <li>流行6</li>
      <li>流行7</li>
      <li>流行8</li>
      <li>流行9</li>
      <li>流行10</li>
      <li>流行11</li>
      <li>流行12</li>
      <li>流行13</li>
      <li>流行14</li>
      <li>流行15</li>
      <li>流行16</li>
      <li>流行17</li>
      <li>流行18</li>
      <li>流行19</li>
      <li>流行20</li>
      <li>流行21</li>
      <li>流行22</li>
      <li>流行23</li>
      <li>流行24</li>
      <li>流行25</li>
      <li>流行26</li>
      <li>流行27</li>
      <li>流行28</li>
      <li>流行29</li>
      <li>流行30</li>
      <li>流行31</li>
      <li>流行32</li>
      <li>流行33</li>
      <li>流行34</li>
      <li>流行35</li>
      <li>流行36</li>
      <li>流行37</li>
      <li>流行38</li>
      <li>流行39</li>
      <li>流行40</li>
      <li>流行41</li>
      <li>流行42</li>
      <li>流行43</li>
      <li>流行44</li>
      <li>流行45</li>
      <li>流行46</li>
      <li>流行47</li>
      <li>流行48</li>
      <li>流行49</li>
      <li>流行50</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
//导入轮播图
import HomeSwiper from "./childComps/HomeSwiper";
//导入推荐信息展示
import RecommenView from "./childComps/RecommenView";
//导入流行信息
import FeatureView from "./childComps/FeatureView";

//当导出不是default是 需要用{}进行命名
import {getHomeMultidata} from "network/home";


export default {
  name: "home",
  components:{
    NavBar,
    HomeSwiper,
    RecommenView,
    FeatureView
  },
  data(){
    return{
      // result:null
      //存储服务数据
      banners:[],
      recommends:[]
    }
  },
  //创建生命周期 当已加载就进行请求数据
  created() {
    getHomeMultidata().then(res=>{
      // console.log(res)
      // this.banners=res.data.banner
      //存储数据
      // this.result=res
      this.banners=res.data.banner.list
      this.recommends=res.data.recommend.list
    })
  }
}
</script>

<style scoped>
  #home{
    padding-top: 44px;
  }

  .home-nav{
    background-color: var(--color-tint);
    font-size: 20px;
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
</style>
