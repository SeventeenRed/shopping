<template>
  <div id="app">
<!--    不让首页随便进行销毁 exclude去除 | 不包括 -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tar-bar/>
  </div>
</template>

<script>
import MainTarBar from "components/contents/maintarbar/MainTarBar";

  export default {
    name: 'app',
    components: {
      MainTarBar
    }
  }
</script>

<style>
  /*css 引入方式*/
  @import "assets/css/base.css";
</style>
