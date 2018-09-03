<template>
  <!-- 加载更多 -->
  <div class="category-page">

    <!-- 左侧图片 -->
    <div class="wrapper-center">
      <figure v-show="leftData.length > 0"
              v-for="data in leftData"
              @click="goParticular(data)">
        <!-- 通过url将图片加载到控件中 -->
        <div class="img-container card">
          <!--<v-img :imgUrl="data.cover"></v-img>-->
          <img class="img" :src="data.cover"/>
          <div class="text"> {{data.rname}}</div>
        </div>
      </figure>
    </div>

    <!-- 右侧图片 -->
    <div class="wrapper-center">
      <figure v-show="rightData.length > 0"
              v-for="data in rightData"
              @click="goParticular(data)">
        <div class="img-container card">
          <img class="img" :src="data.cover"/>
          <div class="text"> {{data.rname}}</div>
        </div>
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
        rightData: [] // 右列数据
      };
    },
    components: {
      vImg
    },
    created() {
      this.loadData();
    },
    methods: {
      loadData() { // 加载数据
        this.$store.commit('UPDATE_LOADING', true);
        // 定时器处理(显示加载动画)
        setTimeout(() => {
          this.$nextTick(() => { // 关闭加载动画(dom渲染完后执行)
            this.$store.commit('UPDATE_LOADING', false);
          });
        }, 500);

        // 获取数据
        let api = `http://service.picasso.adesk.com/v1/vertical/category`;
        this.$http.get(api) // 请求数据
          .then((response) => { // 响应处理
            let data = response.data.res.category;
            console.log(response);
            console.log(data);

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

            // 记录分类信息
            this.recordCategory(data);
          });
      },
      // 记录分类信息
      recordCategory(data) {
        let picCategory = {};
        for (let i = 0; i < data.length; i++) {
          let key = data[i].id; // key值
          picCategory[key] = data[i].name; // value
        }
        console.log(picCategory);
        this.$store.commit('UPDATE_PIC_CATEGORY', picCategory);
      },
      // 图片详情
      goParticular(data) {
        this.$router.push({
          name: 'particular',
          query: {
            categoryID: data.id
          }
        });
      }
    }
  };
</script>

<style>

  .category-page {
    display: flex;
    padding-bottom: 60px;
  }

  .wrapper-center {
    width: 50%;
    column-width: 200px;
    column-gap: 15px;
    max-width: 1100px;
  }

  .img-container {
    position: relative;
    display: inline-block;
    line-height: 0;
    margin: 20px;
  }

  .img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .text {
    position: absolute;
    left: 20px;
    bottom: 20px;
    text-align: center;
    font-size: 18pt;
    color: white;
  }

</style>
