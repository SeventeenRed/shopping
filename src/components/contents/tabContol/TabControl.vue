<template>
<!--  首页分类-->
  <div class="tab-control">
      <div v-for="(item,index) in titles"
           class="tab-control-item"
           :class="{active: index === currentIndex}"
           @click="itemClick(index)">
        <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      //类型
      type:Array,
      //默认值
      default(){
        return[]
      }
    }
  },
  //文字被选择之后修改样式
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      //将点击的下标赋值
      this.currentIndex=index
      //将请求到的数据传入到页面中
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
  .tab-control{
  /*  布局*/
    display: flex;
    text-align: center;
    /*高度*/
    height: 40px;
    /*字体高度*/
    line-height: 40px;
    font-size: 15px;
    background: #fff;
  }

  .tab-control-item{
  /*  平分*/
    flex: 1;
  }

  .tab-control-item span{
    padding: 5px;
  }

  .active{
    color: var(--color-high-text);
  }
  .active span{
    /*设置样式的下划线*/
    border-bottom: 3px solid var(--color-tint);
  }
</style>
