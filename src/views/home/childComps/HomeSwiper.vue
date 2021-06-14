<template>
  <!--轮播图-->
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
//导入轮播图
import {Swiper, SwiperItem} from "components/common/swiper"
export default {
  name: "HomeSwiper",
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      isLoad : false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    //获取图片加载
    imageLoad(){
      // console.log('----')
      if(!false){ //当图片没有加载 则加载图片  否则加载了 就不让他再次加载
        //自定义发出事件
        this.$emit('swiperImageLoad')
        //当数据加载了一次 后 把isLoad 修改为true 不让他再次加载
        this.isLoad=true
      }
    }
  }
}
</script>

<style scoped>

</style>
