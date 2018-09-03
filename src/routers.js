// require.ensure 是 Webpack 的特殊语法，用来设置 组件到底路径
/**
 * 1.定义路由，每个路由应该映射一个组件
 * path : 浏览器的显示的路径
 * name ： 路由的名字
 * component : 路由的组件路径
 */
const routers = [
  { // 根路由
    path: '/',
    name: 'index',
    component: require('./App.vue'),
    children: [ // 内部子路由
      { // 首页
        path: '/home',
        name: 'home',
        component: require('./components/list/wallpaper.vue')
      },
      { // 最新
        path: '/new',
        name: 'new',
        component: require('./components/list/new.vue')
      }, { // 热门
        path: '/hot',
        name: 'hot',
        component: require('./components/list/hot.vue')
      },
      { // 分类
        path: '/category',
        name: 'category',
        component: require('./components/list/category.vue')
      },
      { // 专辑
        path: '/album',
        name: 'album',
        component: require('./components/list/album.vue')
      }
    ]
  }, { // 特定分类列表
    path: '/particular',
    name: 'particular',
    component(resolve) {
      require.ensure(['./components/list/particular.vue'], () => {
        resolve(require('./components/list/particular.vue'));
      });
    }
  }, { // 图片信息
    path: '/imgInfo',
    name: 'imgInfo',
    component(resolve) {
      require.ensure(['./components/item/imgInfo.vue'], () => {
        resolve(require('./components/item/imgInfo.vue'));
      });
    }
  }, { // 专辑信息
    path: '/albumInfo',
    name: 'albumInfo',
    component(resolve) {
      require.ensure(['./components/item/albumInfo.vue'], () => {
        resolve(require('./components/item/albumInfo.vue'));
      });
    }
  }, {// 欢迎页面
    path: '/wecome',
    name: 'wecome',
    component(resolve) {
      require.ensure(['./components/page/wecome.vue'], () => {
        resolve(require('./components/page/wecome.vue'));
      });
    }
  }
];

export default routers;
