import Vue from 'vue'; // 引入Vue
import App from './App.vue'; // App组件
import axios from 'axios'; // 网络库
import VueRouter from 'vue-router'; // 引入vue-router
import routes from './routers'; // 引入路由配置
import store from './vuex/store'; // 引入store
import {loadFromlLocal} from './common/js/store';  // 公共方法：本地缓存
import infiniteScroll from 'vue-infinite-scroll';  // 引入滑动模块
import VueLazyload from 'vue-lazyload';  // 引入图片懒加载模块
import 'common/css/index.css'; // 引入公共样式

// 注册组件
Vue.use(VueRouter); // 使用路由
Vue.use(infiniteScroll); // 滑动组件
Vue.prototype.$http = axios; // 使用axios请求数据

// error，loading是图片路径, 用require引入
Vue.use(VueLazyload, {
    error: require('./assets/404.jpg'),
    loading: require('./assets/loading.gif'),
    attempt: 1
  }
);

/**
 * 创建 router 实例，然后传入routes配置
 * @type {VueRouter}
 */
const router = new VueRouter({
  'linkActiveClass': 'active', // 更改激活状态的Class值
  routes: routes //  routes: routes -> routes（缩写）
});

/**
 * App.vue是vue渲染的入口
 * 创建和挂载根实例。
 * 记得要通过 router 配置参数注入路由，
 * 从而让整个应用都有路由功能
 */
const routerApp = new Vue({
  store: store, // 存储
  router: router, // 路由
  el: '#app', // 挂载点
  components: {App} // vue组件
});

export default routerApp;

/**
 * loadFromlLocal()是读取本地缓存数据，具体common/js/store.js 查看
 *
 *
 */
const isCache = loadFromlLocal('wallpager', 'wecome', false);
if (!isCache) { // 没有缓存数据的话,显示欢迎界面
  router.push('/wecome');
} else { // 显示主界面
  router.push('home');
}
