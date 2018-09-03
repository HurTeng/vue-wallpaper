<template>
  <div class="comment-cell">
    <!-- 头像 -->
    <div class="avatar">
      <img class="img" :src="comment.user.avatar"/>
      <div class="avatar-content">
        <div class="user-name">{{comment.user.name}}</div>
        <span class="atime">{{ formatDate(comment.atime)}}</span>
      </div>
    </div>
    <!-- 评论内容 -->
    <div class="comment-content">
      <div>{{comment.content}}</div>
      <div class="info-item iconfont icon-dianzan"> {{comment.size}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'comment',
    props: {
      comment: { // 评论信息
        type: Object
      }
    },
    data() {
      return {
        // comment: {} // 评论信息
      };
    },
    methods: {
      formatDate(timestamp) {
        let time = new Date(timestamp);
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
      },
      add0(m) {
        return m < 10 ? '0' + m : m;
      }
    },
    created() {
      console.log('comment:' + this.comment);
    }
  };
</script>

<style scoped >
  .comment {
    background-color: #f2f2f2;
  }

  .comment-category {
    margin-top: 10px;
    padding: 10px;
    background-color: #fafafa
  }

  .comment-cell {
    background-color: #fafafa;
    padding-left: 10px;
    padding-right: 10px;
  }

  .comment-content {
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0
  }

  .avatar {
    display: flex;
    display: -webkit-flex;
    align-items: center
  }

  .img {
    width: 40px;
    height: 40px;
  }

  .avatar-content {
    flex: 1;
    padding: 0 10px;
    overflow: hidden;
    font-size: 10pt;
    color: #6d6d72;
  }

  .user-name {
    font-size: 12pt
  }

  .atime {
    font-size: 10pt
  }
</style>
