import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex); // 使用vuex

// 创建一个对象来保存应用启动时的初始状态
const state = {
  'picCategory': {}, // 图片分类
  'loadingShow': false // 是否显示加载动画
};

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  // 更新壁纸分类信息
  UPDATE_PIC_CATEGORY(state, category) {
    console.log(category);
    state.picCategory = category;
  },
  // 更新数据加载状态
  UPDATE_LOADING(state, data) {
    state.loadingShow = data;
  }
};

// store中设置初始状态以及变更函数
export default new Vuex.Store({
  state,
  mutations
});
