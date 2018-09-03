<template>
  <div class="selection-page">
    <!-- 描述信息 -->
    <div class="desc">
      <span class="day">{{getDay(time)}}</span>
      <span class="month">/{{getMonth(time)}}</span>
      <span>{{ title }}</span>
    </div>

    <!-- 图片列表 -->
    <div class="pic-container">
      <div class="img-content"
           v-show="pics.length>0"
           v-for="data in pics"
           @click="selectDetails(data)">
        <!--<img class="img" :src="data.thumb"/>-->
        <v-img class="img" :imgUrl="data.thumb"></v-img>
      </div>
    </div>
  </div>
</template>

<script>
  import vImg from '../widget/lazyimg.vue';

  export default {
    name: 'selection',
    components: {
      vImg
    },
    props: {
      time: { // 时间
        type: Number
      },
      title: { // 标题
        type: String
      },
      pics: { // 图片列表
        type: Array
      }
    },
    data() {
      return {};
    },
    methods: {
      // 图片详情
      selectDetails(data) {
        this.$router.push({
          name: 'imgInfo',
          query: {
            data: data
          }
        });
      },
      formatDate(timestamp) {
        let time = new Date(timestamp);
        let month = time.getMonth() + 1;
        let day = time.getDate();
        return day + '/' + month + '月';
      },
      getDay(timestamp) {
        return new Date(timestamp).getDate();
      },
      getMonth(timestamp) {
        let time = new Date(timestamp);
        let month = time.getMonth() + 1;
        return month + '月';
      }
    },
    computed: {}
  };
</script>

<style scoped>

  .selection-page {
    width: 100%;
    height: auto;
    left: 0;
    top: 0;
    background-color: #f9f9f9;
  }

  .desc {
    padding: 10px;
    text-align: center;
  }

  .desc .day {
    color: #ec971f;
    font-size: 18pt;
    font-weight: inherit;
  }

  .desc .month {
    color: #ec971f;
    font-size: 10pt;
    font-weight: inherit;
  }

  .pic-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .img-content {
    /*width: 100px;*/
    /*height: 100px;*/
    line-height: 0;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .img {
    width: 150px;
    /*height: 200px;*/
    /*flex: 1 1 auto;*/

    border-radius: 10px;
    box-shadow: 5px 5px 5px #888888;
  }
</style>
