<template>
  <div class="container">

    <!-- 顶部bar -->
    <v-back-bar title="壁纸"></v-back-bar>


    <!-- 图片信息 -->
    <img :src="data.thumb" class="img-responsive" @click="previewPic"/>
    <!--<img :src="data.img" class="img-responsive"/>-->
    <!-- 壁纸信息 -->
    <div class="info">
      <div class="info-item iconfont icon-dianzan"> {{data.rank}}</div>
      <div class="info-item iconfont icon-buoumaotubiao15"> {{data.favs}}</div>
      <div class="info-item iconfont icon-kanguo"> {{data.ncos}}</div>
    </div>
    <!-- 标签 -->
    <div class="info-tag">
      <div class="info-item iconfont icon-leimupinleifenleileibie"> {{getCategory(data.cid[0])}}</div>
      <div class="info-item iconfont icon-biaoqian" v-if="data.tag.length>0">
      <span v-for="tag in data.tag">
        {{tag}}
      </span>
      </div>
    </div>

    <!-- 热门评论 -->
    <div class="comment" v-show="hots.length>0">
      <div class="comment-category iconfont icon-remen"> 热门评论</div>
      <ul>
        <li v-for="comment in hots">
          <v-comment :comment="comment"></v-comment>
        </li>
      </ul>

    </div>

    <!-- 最新评论 -->
    <div class="comment" v-show="comments.length>0">
      <div class="comment-category iconfont icon-pinglun"> 最新评论</div>
      <ul>
        <li v-for="comment in comments">
          <v-comment :comment="comment"></v-comment>
        </li>
      </ul>
    </div>


    <div class="operate">
      <!--<button class="operate-btn" @click="exportData(data.wp)">下载</button>-->
      <a class="operate-btn" :href="data.wp" download>下载</a>
      <a class="operate-btn" href="javascript:void(0)" @click="previewPic">预览</a>
    </div>

    <!-- 图片详情 -->
    <v-pic ref="details" :pic="data.preview"></v-pic>

  </div>

</template>

<script type="text/ecmascript-6">
  import vComment from './comment.vue';
  import vPic from '../page/pic.vue';
  import vBackBar from '../widget/backbar.vue';

  export default {
    name: 'v-day',
    props: {
      data: {
        type: Object
      }
    },
    data() {
      return {
        category: {}, // 图片分类
        content: false,
        comments: [],
        hots: []
      };
    },
    components: {
      vComment,
      vPic,
      vBackBar
    },
    created() { // created初始化时调用
      this.data = this.$route.query.data;
      this.gainComment();
      // this.loadData();
    },
    methods: {
      clearStyle() { // 清除样式
        this.$nextTick(() => {
          // 将图片的样式移除
          let tags = this.$el.getElementsByTagName('img');
          for (let i = 0; i < tags.length; i++) {
            tags[i].removeAttribute('style');
          }
        });
      },
      gainComment() { // 获取评论信息
        console.log(this.data.id);
        this.$http
          .get(`http://service.picasso.adesk.com/v2/vertical/vertical/${this.data.id}/comment`) // 请求数据
          // .get(`http://service.picasso.adesk.com/v2/vertical/vertical/5ab8a9c4e7bce7356a197a07/comment`) // 请求数据
          .then((response) => { // 响应处理
            this.comments = response.data.res.comment; // 最新评论
            this.hots = response.data.res.hot; // 热门评论
            console.log(response);
          });
      },
      loadData() { // 测试使用
        this.$http
          .get('http://service.picasso.adesk.com/v1/vertical/vertical?limit=1&skip=0&order=hot') // 请求数据
          .then((response) => { // 响应处理
            let data = response.data.res.vertical[0];
            this.data = data;
            console.log(data);
            console.log(data.id);
            // 获取评论信息
            this.gainComment();
          });
      },
      getCategory(key) { // 根据id获取分类名
        let picCategory = this.$store.state.picCategory;
        console.log(picCategory);
        return picCategory[key];
      },
      back() { // 后退
        this.$router.go(-1);
      },
      downloadPic(url) { // 下载图片
        window.open(url);
      },
      previewPic() { // 预览图片
        this.$refs.details.show();
      }
    }
  };
</script>
<style >

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    /*height: 100vh*/
  }

  .img-responsive {
    width: 100%;
    height: auto;
    /*max-width: 100%;*/
    /*max-height: 50vh;*/
  }

  .info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    background-color: white;
  }

  .info-tag {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    background-color: white;
  }

  .comment {
    background-color: #f2f2f2;
  }

  .comment-category {
    margin-top: 10px;
    padding: 10px;
    background-color: #fafafa;
  }

  .operate {
    align-self: center;
    padding: 15px;
  }

  .operate-btn {
    background-color: #F6712E;
    border: none;
    color: white;
    padding: 10px 50px;
    border-radius: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    flex: 1
  }
</style>
