<template>
  <div class="page">
    <!-- 封面 -->
    <div class="cover">
      <!-- 左侧按钮(点击隐藏) -->
      <span class="iconfont icon-fanhui back-btn" @click="back"></span>
      <p class="album-title">{{album.name}}</p>
      <button class="albun-concern" @click="concernAlbum">{{getConcernStr()}}</button>
      <img class="cover-img" :src="album.cover"/>
    </div>

    <!-- 作者信息 -->
    <div class="user" v-if="album.user">
      <img class="user-avatar" :src="album.user.avatar"/>
      <span class="user-name">{{ album.user.name }}</span>
      <p>{{ album.desc }}</p>
    </div>

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

    <div v-if="leftData.length <= 0">
      <div class="limit-info">
        服务器User-Agent限制,无法获取到图片列表
        <p>如需获取数据,请修改User-Agent(格式:[User-Agent:picasso,213,xiaomi])</p>
      </div>
    </div>
  </div>

</template>

<script>
  import vImg from '../widget/lazyimg.vue';

  export default {
    name: 'albumInfo',
    components: {
      vImg
    },
    props: {
      albumID: {
        type: String
      }
    },
    data() {
      return {
        album: {}, // 专辑信息
        wallpapers: [], // 壁纸列表
        leftData: [],
        rightData: [],
        concern: false, // 是否关注
        busy: false, // 数据是否正在加载
        noMore: false, // 没有更多数据
        page: 0 // 起始页面
      };
    },
    computed: {},
    created() { // created初始化时调用
      this.albumID = this.$route.query.albumID;
    },
    methods: {
      loadData() {
        let limit = 10; // 请求限制数量
        let skip = (this.page - 1) * limit; // 每次加载跳过的页面
        let order = 'new'; // 类别('new','hot')
        let api = `http://service.picasso.adesk.com/v1/wallpaper/album/${this.albumID}/wallpaper?order=${order}&adult=false&first=1&limit=${limit}&skip=${skip}`;
        console.log(api);
        this.$http
          .get(api) // 请求数据
          .then((response) => { // 响应处理
            this.album = response.data.res.album;
            let data = response.data.res.wallpaper;
            console.log(response);

            // 设置左右两边的图片数据
            this.wallpapers = this.wallpapers.concat(data); // 合并数据
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
      },
      back() {
        this.$router.go(-1);
      },
      concernAlbum() { // 关注专辑
        this.concern = !this.concern;
      },
      getConcernStr() {
        return (this.concern ? '已关注' : '关注专辑');
      }
    }
  };
</script>

<style scoped>
.page {
  background-color: white;
}
  .cover {
    position: relative;
  }

  .cover-img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  .back-btn {
    position: absolute;
    margin-left: 15px;
    margin-top: 20px;
    font-weight: bolder;
    font-size: 20pt;
    color: white;
  }

  .album-title {
    position: absolute;
    margin-left: 15px;
    bottom: 10px;
    font-size: 20pt;
    font-weight: bolder;
    color: white;
  }

  .albun-concern {
    position: absolute;
    right: 15px;
    bottom: 15px;
    padding: 5px 10px;
    color: white;
    background-color: #F6712E;
    font-size: 8pt;
    font-weight: bolder;
    border-radius: 5px;
    border: none;
  }

  .user {
    padding-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .user-avatar {
    width: 30px;
    height: 30px;
  }

  .user-name {
    font-size: 14pt;
    text-align: center;
  }

  .limit-info {
    padding: 30px;
    text-align: center;
  }
</style>
