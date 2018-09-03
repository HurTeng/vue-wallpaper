<template>

  <div class="page">
    <!-- 加载动画 -->
    <loading :show="loadingShow"></loading>
    <div class="content">
      <router-view></router-view>
    </div>
    <v-tabs></v-tabs>
  </div>

</template>

<script>
  import loading from './components/widget/loading.vue';
  import vTabs from './components/widget/tabs.vue';
  import {mapState} from 'vuex';

  export default {
    name: 'app',
    components: {
      loading,
      vTabs
    },
    created() {
      console.log('isKeep:' + this.$route.meta.keepAlive);
    },
    // 数据
    data() {
      return {
        firstShow: true,
        show: false
      };
    },
    // 计算属性
    computed: {
      ...mapState([
        'loadingShow'
      ])
    },
    // 方法
    methods: {
      // 是否显示加载view
      isShow() {
        this.show = !this.show;
      }
    }
  };
</script>

<style>

  #app {
    color: #2c3e50;
    width: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #app .show {
    transform: translateX(250px);
  }

  .page {
    overflow-y: hidden;
    width: 100%;
  }

  .page::-webkit-scrollbar {
    width: 0 !important
  }

  .router-container {
    background-color: #f9f9f9;
    padding-bottom: 50px;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
  }

</style>
