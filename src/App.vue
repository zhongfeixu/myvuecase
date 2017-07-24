<template>
  <div>
    <mt-header class="header-fixed" fixed title="深圳，你好"></mt-header>
    <div @click="goBack()" class="back" v-show='isShow'>&lt;返回</div>
    <router-view></router-view>
    <mt-tabbar fixed v-show='!isShow'>
      <mt-tab-item href="#/home">
        <img     slot="icon" src="http://img06.jiuxian.com/bill/2016/0224/cccd8df26a754c139de800406af82178.png">
      </mt-tab-item>
      <mt-tab-item href="#/category">
        <img slot="icon" src="http://img09.jiuxian.com/bill/2016/0224/36a49b28ec5e4cdf9dbe37988199487d.png">
      </mt-tab-item>
      <mt-tab-item class="shopcartstyleicon" href="#/shopcart">
        <img slot="icon" src="http://img09.jiuxian.com/bill/2016/0224/42baf46987b6460bb43b3396e9941653.png">
        <span class="shopcartstyle">{{goodscount}}</span>
      </mt-tab-item>
      <mt-tab-item href="#/mime">
        <img slot="icon" src="http://img08.jiuxian.com/bill/2016/0224/cba9029a8f4444a989a2ab5aa84c6538.png">
      </mt-tab-item>
    </mt-tabbar>
    <div @click="pageScroll()" id="backToTop">回<br>到<br>顶<br>部</div>
  </div>
</template>
<style scoped >
$
  .mint-tabbar>.mint-tab-item {
    background-color: #fdfdfd;
  }
  .header-fixed {
    z-index: 100;
  }
  img {
    width: 42px;
    height: 35px;
  }
  .back {
    position: fixed;
    left: 4px;
    top: 4px;
    z-index: 120;
    width: 80px;
    height: 30px;
    color: white;
    font-size: 20px;
  }
  .shopcartstyleicon {
    position: relative;
  }
  .shopcartstyleicon .shopcartstyle {
    position: absolute;
    right: 15px;
    top: -5px;
    text-align: center;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    background: red;
    color: white;
  }
  #backToTop {
    position: fixed;
    right: 10px;
    bottom: 10px;
    color: gray;
    font-family: "Miscosoft Yahei";
    box-shadow: 0 0 3px gray;
    display: none;
  }
</style>
<script>
  // import {
  //   bus
  // } from "./statics/js/commonVue.js";
  import $ from "jquery";
  import {
    getLocalStorageCount
  } from "./statics/js/shopCartTool.js"
  $(window).on("touchmove", function(e) {});
  export default {
    data: function() {
      return {
        isShow: false,
        goodscount: 0
      }
    },
    methods: {
      goBack() {
        //路由返回
        this.$router.go(-1)
      },
      isShowHidde: function(newValueString) {
        var newValue = newValueString || "/home"
        if (newValue != "/home") {
          this.isShow = true;
        } else {
          $("#backToTop").css("display", "none")
          this.isShow = false;
        }
      },
      pageScroll() {
        window.scrollTo(0, 0);
      }
    },
    created: function() {
      //获取页面的滚动距离
      this.goodscount = getLocalStorageCount();
      $(window).scroll(function() {
        var myscrollTop = $(document).scrollTop();
        var myclientHeight = $(window).height();
        var mydocumentHeight = $(document).height();
        // console.log(myscrollTop,myclientHeight,mydocumentHeight);
        if (myclientHeight / (mydocumentHeight - myscrollTop) > 0.9) {
          $("#backToTop").slideDown(500);
        } else {
          $("#backToTop").slideUp(500);
        }
      });
      //非父子组件传值
      var that = this;
      //这里是使用了在全局main.js中，添加了公共的bus。
      this.$root.newBus.$on('countCart', function(count) {
        var count = count || 0;
        that.goodscount += count;
        console.log(this)
      })
      this.isShowHidde(this.$route.path)
    },
    watch: {
      "$route": function(newValue, oldValue) {
        this.isShowHidde(newValue.path);
      }
    },
    mounted() {
      var startY = 0;
      var endY = 0;
      window.addEventListener('touchstart', function(event) {
        startY = event.changedTouches[0].clientY
      });
      window.addEventListener('touchmove', function(event) {
        endY = event.changedTouches[0].clientY;
      });
      window.addEventListener('touchend', function(event) {
        if (endY - startY > 230) {
          alert("下拉功能实现，马上就开始Ajax数据请求了！")
          startY = 0;
          endY = 0;
          return;
        }
      }, true);
      window.onbeforeunload = function() {
        //你想干的事,比如删localStorage
        var goodslist = localStorage.getItem("goodsList");
        console.log(goodslist)
        localStorage.clear()
        localStorage.setItem("goodsList", goodslist)
        //这一句如果写了，会弹窗提示是否要关掉页面，如果没这个需求，可以不写
      };
    }
  }
</script>

