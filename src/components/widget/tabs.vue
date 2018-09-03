<template>

  <div class="father">

    <div class="tabs">
      <!--命名路由-->
      <ul>
        <!--this inspection reports XML/HTML tags with missing mandatory attrbutes ,you can specify attrbute name that should not  be reported-->
        <!--home被点击后，一直处于激活状态，因此需要使用精确匹配模式，在router-link中添加exact属性-->
        <!-- 首页 -->
        <router-link :to="{name:'home'}" tag="li" exact>
          <div><i class="icon iconfont icon-shouye"></i></div>
          <div class="tabs-title">首页</div>
        </router-link>

        <router-link :to="{name:'new'}" tag="li" exact>
          <div><i class="icon iconfont icon-31_xinpin"></i></div>
          <div class="tabs-title">最新</div>
        </router-link>

        <!-- 热门 -->
        <router-link :to="{name:'hot'}" tag="li">
          <div><i class="icon iconfont icon-remen1"></i></div>
          <div class="tabs-title">热门</div>
        </router-link>

        <!-- 分类 -->
        <router-link :to="{name:'category'}" tag="li">
          <div><i class="icon iconfont icon-fenlei"></i></div>
          <div class="tabs-title">分类</div>
        </router-link>

        <!-- 专辑 -->
        <router-link :to="{name:'album'}" tag="li">
          <div><i class="icon iconfont icon-zhuanji"></i></div>
          <div class="tabs-title">专辑</div>
        </router-link>

      </ul>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'tabs'
  };
</script>

<style scoped>
  .tabs {
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    margin: 0 auto;
    background-color: white;
    box-shadow: 0 2px 4px #000;
    width: 100%;
  }

  .tabs ul {
    display: table;
    width: 100%;
  }

  .tabs ul li {
    text-align: center;
    display: table-cell;
    padding: 5px;
  }

  /* 图标 */
  .tabs .icon {
    font-size: 30px;
  }

  /* 字体 */
  .tabs-title {
    font-size: 10px;
    padding-top: 3px;
  }

  /* 活动页颜色 */
  .router-link-active,
  .router-link-exact-active {
    color: #ec971f;
  }

</style>
