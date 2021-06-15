<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
    <div class="info-header">
      <!--用户评价更多信息-->
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right" />
      </div>
    </div>
    <div class="info-user">
      <!--用户头像与用户名称-->
      <img :src="commentInfo.user.avatar" alt="" />
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <div class="info-detail">
      <!--用户评价内容-->
      <p>{{ commentInfo.content }}</p>
      <div class="info-other">
        <!--用户评价时间    使用过滤器 过滤时间  | showDate  -->
        <span class="date">{{ commentInfo.created }}</span>
        <!--用户购买的商品样式-->
        <span>{{ commentInfo.style }}</span>
      </div>

      <div class="info-imgs">
        <!--买家秀图片-->
        <img :key="index" :src="item" alt="" v-for="(item, index) in commentInfo.images" />
      </div>
    </div>
  </div>
  <div class="comment-info" style="color: red;" v-else>暂无用户评论</div>
</template>

<script>
//导入时间戳格式化
import {formatDate} from "common/utils";

export default {
  name: "DetailCommentInfo",
  props:{
    commentInfo:{
      type:Object,
      default(){
        return {}
      }
    },
    //过滤器
    // filters: {
    //   //创建过滤对象
    //   showDate(value){
    //     //1.将时间戳装成Date对象
    //     const date = new Date(value * 1000);
    //     //2.将date进行格式化
    //     return formatDate(date, "yyyy-MM-dd");
    //   }
    // }
  }
}
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333333;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-header {
    line-height: 50px;
    height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .header-title {
    font-size: 15px;
    float: left;
  }
  .header-more {
    font-size: 13px;
    float: right;
    margin-right: 10px;
  }
  .info-user {
    padding: 10px 0 5px;
  }
  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  .info-user span {
    font-size: 15px;
    position: relative;
    top: -15px;
    margin-left: 10px;
  }
  .info-detail {
    padding: 0 5px 15px;
  }
  .info-detail p {
    font-size: 14px;
    line-height: 1.5;
    color: #777777;
  }
  .info-detail .info-other {
    font-size: 12px;
    margin-top: 10px;
    color: #999999;
  }
  .info-other .date {
    margin-right: 8px;
  }
  .info-imgs {
    margin-top: 10px;
  }
  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>
