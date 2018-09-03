<template>
  <!-- 加载更多 -->
  <div class="wallpaper-wrapper"
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="busy"
       infinite-scroll-distance="10">

    <!-- 列表数据 -->
    <div class="container">
      <div class="item"
           v-show="dataList.length > 0"
           v-for="data in dataList">
        <v-selection :pics="data.items" :title="data.title" :time="data.stime"></v-selection>
      </div>
    </div>

  </div>
</template>

<script>
  import vSelection from '../item/selection.vue';

  export default {
    data() {
      return {
        dataList: [], // 右列数据
        busy: false, // 数据是否正在加载
        noMore: false, // 没有更多数据
        page: 0 // 起始页面
      };
    },
    components: {
      vSelection
    },
    created() {
    },
    methods: {
      loadData() {
        let limit = 5; // 请求限制数量
        let skip = (this.page - 1) * limit; // 每次加载跳过的页面
        let first = 0;
        let adult = true;
        let api = `http://service.picasso.adesk.com/v1/wallpaper/recommend?adult=${adult}&first=${first}&limit=${limit}&skip=${skip}`;
        this.$http
          .get(api) // 请求数据
          .then((response) => { // 响应处理
            let data = response.data.res.recommend;
            console.log(response);

            // 设置左右两边的图片数据
            this.dataList = this.dataList.concat(data); // 合并数据

            // 没有更多数据的处理
            if (data.length <= 0) {
              this.noMore = true;
            }
          });
      },
      // 加载更多
      loadMore() {
        // 数据全部加载完成的话,不再进行加载
        if (this.noMore) {
          return;
        }

        this.page++; // 页面+1
        this.busy = true; // 开启无限滚动
        this.$store.commit('UPDATE_LOADING', true); // 开启加载动画
        // 定时器处理(显示加载动画)
        setTimeout(() => {
          this.busy = false; // 关闭无限滚动
          this.$nextTick(() => { // 关闭加载动画(dom渲染完后执行)
            this.$store.commit('UPDATE_LOADING', false);
          });
        }, 1500);
        // 开始加载数据
        this.loadData();
      },
      // 图片详情
      selectDetails(data) {
        this.$router.push({
          name: 'imgInfo',
          query: {
            data: data
          }
        });
      }
    }
  };
</script>

<style>
/*
  .container {
    display: flex;
    flex-direction: column;
    align-items center
    background-color #8a6de9
  }
*/

  .item {
    margin-bottom: 15px;
    margin-left: 5px;
    margin-right: 5px;
  }
</style>
