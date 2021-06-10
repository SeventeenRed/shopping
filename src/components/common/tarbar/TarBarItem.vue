<template>
  <div class="tab-bar-item" @click="itemClick">
    <!--使用插槽进行页面修改-->
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div :style="isStyleActive">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TarBarItem",
        props: {
          //定义属性类型
            path: {
              //类型
                type: String,
            },
            activeStyle: {
                //类型
                type: String,
                //默认值
                default: 'coral'
            }
        },
        data () {
            return {
            }
        },
        methods: {
            itemClick() {
              //如果想 不可以返回使用replace() 想可以返回使用push()
              this.$router.replace(this.path)
            }
        },
        computed: {
            isActive() {
              //当前选择的页面地址内容(设未活跃),当点击切换时 换另一个
              return this.$route.path.indexOf(this.path) !== -1
            },
            isStyleActive() {
              //判断颜色
              return this.isActive ? {color:this.activeStyle} : {}
            }
        }
    }
</script>

<style scoped>

  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    color:black;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin: 4px 0 2px 0;
  }

  .actived {
    color:coral;
    font-weight: bolder;
  }

</style>
