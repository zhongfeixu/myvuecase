<template>
  <div class='tpl-comonstyle'>
    <div class="goods-detail">
      <div class="header">
        <h4>{{detailData.title}}</h4>
        <span>{{detailData.add_time|myFilter("YYYY-MM-DD hh-mm-ss")}}</span>&nbsp;&nbsp;
        <span>{{detailData.click}}次的浏览量</span>&nbsp;&nbsp;
        <span>分类：民生经济</span>&nbsp;&nbsp;
      </div>
      <div class="content">
        <div v-html="detailData.content"></div>
      </div>
      <comment v-bind:commentId="this.$route.params.newsId"></comment>
    </div>
  </div>
</template>
<style scoped>
  .goods-detail {
    padding: 8px;

  }
  .goods-detail .header {
    padding-bottom: 10px;
    border-bottom: 2px solid #ccc;
  }
  .goods-detail .header h4 {
    font-size: 16px;
    color: #26A2FF;
    padding-bottom: 5px;
  }
  .goods-detail .header span {
    font-size: 14px;
  }
  .goods-detail .content {
    padding-top: 5px;
  }
</style>
<script>
  import common from '../../statics/js/common.js';
  import comment from '../subcomponents/subcomment.vue'
  export default {
    data() {
      return {
        detailData: {}
      }
    },
    created() {
      this.newsdetail(this.$route.params.newsId)
    },
    methods: {
      newsdetail: function(newsId) {
        var url = common.apihost + "api/getnew/" + newsId;
        this.$http.get(url).then((res) => {
          this.detailData = res.body.message[0];
        })
      }
    },
    components: {
      comment: comment
    }
  }
</script>