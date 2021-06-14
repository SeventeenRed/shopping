<template>
<!--存放商品-->
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components:{
    GoodsListItem
  },
  props:{
    //存放商品的内容
    goods:{
      //类型
      type:Array,
      //默认值
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods{
    /*灵活布局*/
    display: flex;
    /*定义横轴  定义必要的时候拆行或拆列*/
    flex-wrap: wrap;
    /*定义盒子元素在主轴（横轴）方向上的对齐方式*/
    justify-content: space-evenly;
  }
</style>
