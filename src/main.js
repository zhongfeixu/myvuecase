import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Mint from 'mint-ui' //这种引用暴露的只会是js代码的接口，如果没有样式就要单独引入样式。
import moment from 'moment'
import {Indicator} from 'mint-ui';//这里是加载模块框
import VuePreview from 'vue-preview';
import Vuex from "vuex"
// import mui from "muiv3"
// import "./statics/js/mui.js";
// import "./statics/js/mui.zoom.js";
// import "./statics/js/mui.previewimage.js";
import 'mint-ui/lib/style.css'
import './statics/css/mui.css'
import './statics/css/site.css'
Vue.use(Mint); //是为了给Vue实例添加扩展功能。
Vue.use(VueRouter); //中间件引用vue扩展包
Vue.use(VueResource);
Vue.use(VuePreview);
Vue.use(Vuex);

// console.log(mui)
// 这里是过滤器的设置
Vue.filter('myFilter', function (input, stringType) {
  // 返回处理后的值
  var reciveStringType = stringType || "YYYY-MM-DD hh-mm-ss"
  return moment(input).format(reciveStringType)
})
//全局配置ajax前后的请求状态
Vue.http.interceptors.push(function (request, next) {
  // 调用等待框，此处的 this 为发起请求的 component
  Indicator.open({
    text: '黄sir，你好',
    spinnerType: 'fading-circle'
  });
  next(function (response) {
    // 消掉等待框，此处的 this 为发起请求的 component
    Indicator.close();
  })
})


//导入home组件
import home from "./components/home/home.vue";
import category from "./components/category/category.vue";
import mime from "./components/mime/mime.vue";
import shopcart from "./components/shopcart/shopcart.vue";
import newslist from "./components/news/newslist.vue";
import newsdetail from "./components/news/newsdetail.vue";
import photolist from "./components/photo/photolist.vue";
import photodetail from "./components/photo/photodetail.vue";
import goodslist from "./components/goods/goodslist.vue";
import goodsdetail from "./components/goods/goodsdetail.vue";
import pictureAndText from "./components/goods/pictureAndText.vue"
import goodscomment from "./components/goods/goodscomment.vue"
//创建路由对象，设置路由规则
const router = new VueRouter({
  routes: [{
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: home
    },
    {
      path: "/category",
      component: category
    },
    {
      path: "/mime",
      component: mime
    },
    {
      path: "/shopcart",
      component: shopcart
    },
    {
      path: "/news/newslist",
      component: newslist
    },
    {
      path: "/news/newsdetail/:newsId",
      component: newsdetail
    },
    {
      path: "/photo/photolist",
      component: photolist
    },
    {
      path: "/photo/photodetail/:photoId",
      component: photodetail
    },
    {
      path: "/goods/goodslist",
      component: goodslist
    },
    {
      path: "/goods/goodsdetail/:goodsId",
      component: goodsdetail
    },
     {
       name:"pictureAndText",
      path: "/goods/pictureAndText",
      component: pictureAndText
    },
    {
      path:"/goods/goodscomment",
      component:goodscomment
    }
  ]
})
//将创建好的路由注入到根实例中去
import App from './App.vue'
new Vue({
  el: "#app",
  router: router,
  render: function (createElement) {
    return createElement(App);
  },
  data:{
    newBus:new Vue()
  }
})