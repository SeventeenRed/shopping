<template>
<!--滚动样式-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
//滚动架包
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props:{
    //将每个页面的监听传入存储
    probeType:{
      type:Number,
      default:0
    },
    // 设置上拉加载更多数据传入
    pullUpLoad: {
      type:Boolean,
      default: false
    }
  },
  data(){
    return{
      scroll:null,
      // message:'哈哈哈'
    }
  },
  mounted() {
    this.scroll=new BScroll(this.$refs.wrapper,{
      //点击
      click:true,
      //滚动监听
      probeType:this.probeType,
      //上拉加载更多
      pullUpLoad: this.pullUpLoad
    })

    // this.scroll.scrollTo(0,0)

    //实施监听滚动的位置
    if(this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll',(position)=>{
        // console.log(position)
        //自定义事件
        this.$emit('scroll',position)
      })
    }

    // 监听上拉加载更多
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{
        // console.log('上拉加载')
        //自定义事件
        this.$emit('pullingUp')
      })
    }

  },
  methods:{
    scrollTo(x,y,time=300){
      // x轴 y轴 time时间
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    refresh(){
      // console.log('-----')
      //获取图片加载 进行刷新
      this.scroll && this.scroll.refresh()
    },
    //继续加载更多数据
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    //用于保存当前的移动位置
    getScrollY(){
      //     判断当前的位置
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
