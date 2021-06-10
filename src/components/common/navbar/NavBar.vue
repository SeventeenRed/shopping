<template>
  <!--设置导航栏布局-->
  <div class="nav-bar">
    <!--左-->
    <div class="left"><slot name="left"></slot></div>
    <!--中-->
    <div class="center"><slot name="center"></slot></div>
    <!--右-->
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
  .nav-bar{
    /*布局*/
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    /*样式渲染 颜色的阴影 负左正右x轴，负上正下y轴，阴影值，颜色值（r红，g绿，b蓝，透明度）  */
    box-shadow: 0 5px 5px rgba(100,100,100,.1);
  }
  .left,.right{
    width: 60px;
  }
  .center{
    /*位置的占据
       flex: 1,1,1;//平分位置
    */
    /*将剩余的位置占有*/
    flex: 1;
  }
</style>
