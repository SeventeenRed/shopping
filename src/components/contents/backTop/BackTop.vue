<template>
  <div class="back-top">
    <img src="~assets/images/common/top.png" alt=""/>
  </div>
</template>

<script>
export default {
  name: "BackTop",
}
</script>

<style scoped>
  .back-top{
    position: fixed;
    right: 8px;
    bottom: 55px;
    z-index: 9;
  }
  .back-top img{
    height: 43px;
    width: 43px;
  }
</style>
