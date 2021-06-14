<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/images/common/back.svg" alt="">
      </div>
      <div slot="center" class="titles">
        <div v-for="(item,index) in titles"
             class="titles-item"
             :class="{active : index === currentIndex}"
             @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
//导入导航栏
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components:{
    NavBar
  },
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    titleClick(index){
      this.currentIndex = index
    },
    //点击返回
    backClick(){
      // this.$router.go(-1)
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .titles{
    /*布局*/
    display: flex;
    font-size: 13px;
  }
  .titles-item{
    /*均等分*/
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  /*设置图片*/
  .back img{
    margin-top: 12px;
  }
</style>
