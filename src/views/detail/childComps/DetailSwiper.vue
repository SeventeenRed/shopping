<template>
    <swiper class="detail-swiper">
      <swiper-item  v-for="item in topImages">
        <img :src="item" alt=""/>
      </swiper-item>
    </swiper>
</template>

<script>
//传入轮播图
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: "DetailSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    //存储轮播图图片
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
</style>
