<template>

  <!-- 加载更多 -->
  <div class="wallpaper-wrapper"
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="busy"
       infinite-scroll-distance="10">

    <!-- 左侧图片 -->
    <div class="album-item">
      <div v-show="dataList.length > 0"
           v-for="data in dataList"
           @click="selectDetails(data)">
        <!-- 通过url将图片加载到控件中 -->
        <v-album-item :info="data"></v-album-item>
      </div>
    </div>
  </div>

</template>

<script>
  import vImg from '../widget/lazyimg.vue';
  import vAlbumItem from '../item/albumItem.vue';

  export default {
    data() {
      return {
        dataList: [], // 数据列表
        busy: false, // 数据是否正在加载
        noMore: false, // 没有更多数据
        page: 0 // 起始页面
      };
    },
    components: {
      vImg,
      vAlbumItem
    },
    created() {
    },
    methods: {
      loadData() {
        let limit = 10; // 请求限制数量
        let skip = (this.page - 1) * limit; // 每次加载跳过的页面
        let order = 'hot'; // 排序方式('new','hot')
        let api = `http://service.picasso.adesk.com/v1/wallpaper/album?order=${order}&adult=false&first=1&limit=${limit}&skip=${skip}`;
        this.$http
          .get(api) // 请求数据
          .then((response) => { // 响应处理
            let data = response.data.res.album;
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
        }, 500);
        // 开始加载数据
        this.loadData();
      },

      // 图片详情
      selectDetails(data) {
        this.$router.push({
          name: 'albumInfo',
          query: {
            albumID: data.id
          }
        });
      }

    }
  };
</script>

<style scoped>

  .album-item{
    width: 100%;
/*    column-width: 200px;
    column-gap: 15px;
    max-width: 1100px;*/
  }

</style>
