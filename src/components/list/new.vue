<template>
  <!-- 加载更多 -->
  <div class="wallpaper-wrapper"
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="busy"
       infinite-scroll-distance="10">

    <!-- 左侧图片 -->
    <div class="wallpaper-center">
      <figure v-show="leftData.length > 0"
              v-for="data in leftData"
              @click="selectDetails(data)">
        <!-- 通过url将图片加载到控件中 -->
        <v-img :imgUrl="data.thumb"></v-img>
      </figure>
    </div>

    <!-- 右侧图片 -->
    <div class="wallpaper-center">
      <figure v-show="rightData.length > 0"
              v-for="data in rightData"
              @click="selectDetails(data)">

        <v-img :imgUrl="data.thumb"></v-img>
      </figure>
    </div>

  </div>
</template>

<script>
  import vImg from '../widget/lazyimg.vue';

  export default {
    data() {
      return {
        leftData: [], // 左列数据
        rightData: [], // 右列数据
        busy: false, // 数据是否正在加载
        noMore: false, // 没有更多数据
        page: 0, // 起始页面
        detailsData: {}, // 图片的详细信息
        time: '' // 图片的创建时间
      };
    },
    components: {
      vImg
    },
    created() {
    },
    methods: {
      loadData() {
        let limit = 10; // 请求限制数量
        let skip = this.page * limit; // 每次加载跳过的页面
        let order = 'new'; // 类别('new','hot')
        this.$http
          .get(`http://service.picasso.adesk.com/v1/vertical/vertical?limit=${limit}&skip=${skip}&order=${order}`) // 请求数据
          .then((response) => { // 响应处理
            let data = response.data.res.vertical;
            console.log(response);

            // 左列数据
            let left = data.filter((data, i) => {
              return (i + 1) % 2 === 1;
            });
            // 右列图片
            let right = data.filter((data, i) => {
              return (i + 1) % 2 !== 1;
            });

            // 设置左右两边的图片数据
            this.leftData = this.leftData.concat(left); // 合并数据
            this.rightData = this.rightData.concat(right);

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
          name: 'imgInfo',
          query: {
            data: data
          }
        });
      }

    }
  };
</script>

