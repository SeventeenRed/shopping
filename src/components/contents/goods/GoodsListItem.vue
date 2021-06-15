<template>
  <div class="goods-item">
    <img :src="showImage" alt="" @load="imageLoad" @click="itemClick"/>
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props:{
    goodsItem:{
      //类型
      type:Object,
      //默认值
      default(){
        return {}
      }
    }
  },
  computed:{
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img || this.goodsItem.show.image
    }
  },
  methods:{
    //监听实现图片加载完成
    imageLoad(){
      // console.log('imageLoad')
      //发射监听的事件
      this.$bus.$emit('itemImageLoad')

      //通过路由监听 进行判断 当有/home时 进行监听判断 避免在另一个布局中监听到
      // if(this.$route.path.indexOf('/home')){
      //   this.$bus.$emit('homeItemImageLoad')
      // }else if(this.$route.path.indexOf('/detail')){
      //   //当另一个布局需要监听时 创建另一个监听对象
      //   this.$bus.$emit('detailItemImageLoad')
      // }
    },
    itemClick(){
      // console.log('跳转到详情')
      //详情跳转
      this.$router.push('/detail'+ this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
  /*设置一个商品的位置*/
  .goods-item{
    padding-bottom: 40px;
    /*相对定位*/
    position: relative;

    width: 48%;
  }
  .goods-item img{
    width: 100%;
    /*边框|边角 设置*/
    border-radius: 5px;
  }

  /*设置内容*/
  .goods-info{
    font-size: 12px;
    /*绝对定位*/
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    /*设置内容溢出 将溢出的内容修剪*/
    overflow: hidden;
    text-align: center;
  }
  /*文字样式*/
  .goods-info p{
    overflow: hidden;
    /*设置文字溢出  溢出的文字用省略号修剪*/
    text-overflow: ellipsis;
    /*设置空白内容  将空白内容会被浏览器省略*/
    white-space: nowrap;
    margin-bottom: 3px;
  }
  /*价格样式设置*/
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  /*收藏样式设置*/
  .goods-info .collect{
    /*相对定位*/
    position: relative;
  }
  .goods-info .collect::before{
    content: '';
    /*绝对定位*/
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/images/common/collect.svg");
  }
</style>
