<template>
  <div class="comment-cell">
    <!-- 头像 -->
    <div class="avatar">
      <img class="img" :src="info.cover"/>
      <div class="avatar-content">
        <div class="user-name">{{info.name}}</div>
        <span class="desc">{{ info.desc}}</span>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'albumInfo',
    props: {
      info: { // 专辑信息
        type: Object
      }
    },
    data() {
      return {
      };
    },
    methods: {

    }
  };
</script>

<style scoped >

  .comment-cell {
    background-color: #fafafa;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 10px;
  }

  .avatar {
    display: flex;
    display: -webkit-flex;
    align-items: center
  }

  .img {
    width: 150px;
    height: 150px;
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

  .desc {
    font-size: 10pt
  }
</style>
