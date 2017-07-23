<template>
  <div class="tpl-comonstyle">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media list-my-css" v-for="item in newslistArr" :key="item.id">
        <router-link :to="'/news/newsdetail/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            {{item.title}}
            <p class='mui-ellipsis'>{{item.zhaiyao}}</p>
            <span>{{item.add_time|myFilter("YYYY年MM月DD hh:mm:ss")}}</span> <span class="right">阅读量{{item.click}}次</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<style scoped>
  .mui-table-view .list-my-css .mui-media-object{
    height:60px;
   max-width:60px;
  }
   .mui-table-view .list-my-css .mui-media-body{
     font-size:16px;
         overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
   }
    .mui-table-view .list-my-css .mui-ellipsis{
     font-size:14px;
     margin:10px 0;
   }
    .mui-table-view .list-my-css .mui-media-body span {
      font-size:14px;
      color:skyblue;
    }
     .mui-table-view .list-my-css .mui-media-body span.right{
       float:right;
     }
</style>
<script>
  import common from "../../statics/js/common.js";
  import {newsListDataCache} from '../../statics/js/shopCartTool.js'
  export default {
    data: function() {
      return {
        newslistArr: [],
        cacheName:"newsList"
      }
    },
    created: function() {
      var newsListCache=localStorage.getItem(this.cacheName)
      if(newsListCache){
            this.newslistArr=JSON.parse(newsListCache)
      } else{
      this.newsList(newsListCache);
      }
    },
    methods: {
      newsList: function(newsListCache) {
        var url = common.apihost + "api/getnewslist";
        this.$http.get(url).then(function(res) {
          this.newslistArr = res.body.message;
          newsListDataCache(this.cacheName,res.body.message)
        })
      }
    }

  }
</script>

