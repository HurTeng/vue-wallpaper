<template>
  <div class="header">
    <div class="left-btn" @click="back">
      <span :class="leftIcon"></span>
      <!--<span class="iconfont icon-fenlei"></span>-->
    </div>
    <div class="title">{{title}}</div>

  </div>


</template>

<script>
  export default {
    name: 'backbar',
    props: {
      title: {
        type: String
      },
      leftIcon: {
        type: String,
        default: 'iconfont icon-fanhui'
      }
    },
    methods: {
      // 后退
      back() {
        // go(-1): 返回上一页，原页面表单中的内容会丢失；
        // window.history.go(-1);
        // back(-1): 返回上一页，原页表表单中的内容会保留，一般还是back(-1)
        window.history.back();
        return false; // 兼容性处理
      }
    }
  };
</script>

<style scoped lang="stylus">
  .header {
    display flex;
    padding 15px;
    background-color: white;
  }

  .title {
    width 100%
    text-align center
  }
</style>
