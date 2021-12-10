<template>
<div>
  <div class="comment-info" v-if="Object.keys(commentInfo).length != 0" @click="commentClick">
    <div class="info-header">
      <div class="header-title">
        宝贝评论
      </div>
      <div class="header-more">
        更多<i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar">
      <td class="user-td">
        <tr class="user-name">{{commentInfo.user.uname}}</tr>
        <tr class="date">{{showDate}}</tr>
      </td>
    </div>
    <div class="info-detail">
      <div class="info-other">
        <span>{{commentInfo.style}}</span>
      </div>
      <p>{{commentInfo.content}}</p>
      <div class="info-imgs">
        <img :src="item" v-for="(item,index) in commentInfo.images" :key="index">
      </div>
    </div>
  </div>
  <div v-else class="else-comment-info" @click="commentClick">
    <div class="info-header">
      <div class="else-header-title">
        宝贝评论(0)
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import {formatDate} from '@/common/utils.js'

  export default {
    name: 'DetailCommentInfo',
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showDate() {
        // 问题：如何将时间戳转成时间格式字符串？
        // 时间戳：1535693819，十位的是秒，13位的是毫秒
        // 1.将时间戳转成Date对象
        let date = new Date(this.commentInfo.created * 1000)
        // 2.将date进行格式化
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    methods: {
      commentClick() {
        console.log('查看评论暂未开放');
      }
    }
  }

</script>

<style scoped>
  .comment-info {
    padding: 1rem 0.5rem;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
    background-color: white;
  }
  .else-comment-info {
    padding: 0 0.5rem;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
    background-color: white;
  }
  .info-header {
    height: 35px;
  }
  .header-title {
    float: left;
    font-size: 1rem;
  }
  .else-header-title {
    float: left;
    line-height: 35px;
    font-size: 1rem;
  }
  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 0.9rem;
  }
  .arrow-right {
    width: 10px;
    height: 10px;
    border-top: 1px solid #777;
    border-right: 1px solid #777;
    transform: rotate(45deg);
    float: right;
    position: relative;
    top: 2px;
  }
  .info-user {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding: 10px 0 5px;
    height: 65px;
    width: 100%;
  }
  .info-user img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .info-user .user-td {
    /* height: 100%; */
    position: relative;
    top: -45px;
    left: 60px;
    /* margin-left: 100px; */
  }
  .info-user .user-name {
    font-size: 1rem;
  }
  .date {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #777;
  }
  .info-detail {
    padding: 0 5px 5px;
  }
  .info-detail p {
    font-size: 0.9rem;
    color: black;
    line-height: 1.5;
  }
  .info-detail .info-other {
    font-size: 0.9rem;
    color: #999;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .info-imgs {
    margin-top: 10px;
  }
  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
    border-radius: 3px;
  }

</style>
