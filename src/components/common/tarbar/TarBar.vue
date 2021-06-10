<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "TarBar",
    }
</script>



<style scoped>
  #tab-bar {
    display: flex;
    background-color: #f6f6f6;
    /*  定位属性*/
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /*样式渲染 颜色的阴影 左右x轴，上下y轴，阴影值，颜色值（r红，g绿，b蓝，透明度）  */
    box-shadow: 0 -1px 1px rgba(100,100,100,.2);
  }

</style>
