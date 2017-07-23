<template>
  <div class='tpl-comonstyle'>
    <div class="photo-info">
      <h4>{{photoInfoData.title}}</h4>
      <span>{{photoInfoData.add_time|myFilter("YYYY-MM-DD hh:mm:ss")}}</span>&nbsp;&nbsp;&nbsp;
      <span>浏览&nbsp;{{photoInfoData.click}}次</span>
    </div>
    <ul class="mui-table-view mui-grid-view">
      <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="(item,index) in photoUrlData" :key="item.src">
        <a href="javascript:;">
          <img  width="100" height="100" class="mui-media-object  preview-img" :src="item.src" @click="$preview.open(index,photoUrlData)">
        </a>
      </li>
    </ul>
    <div class="photo-content">
      <p v-html="photoInfoData.content"></p>
    </div>
    <subcomment :commentId="this.$route.params.photoId"></subcomment>
  </div>
</template>
  
<style scoped>
  .photo-info h3 {
    color: #26A2FF;
  }
  .photo-info span {
    color: #666;
    font-size: 14px;
  }
  .photo-content p {
    font-size: 16px;
  }
</style>
  
<script>
  import common from '../../statics/js/common.js';
  import subcomment from '../subcomponents/subcomment.vue';
  export default {
    data() {
      return {
        photoInfoData: {},
        photoUrlData: []
      }
    },
    created() {
      this.getImageInfo();
      this.getImageUrl();
    },
    methods: {
      getImageInfo() {
        var url = common.apihost + "api/getimageInfo/" + this.$route.params.photoId;
        this.$http.get(url).then(res => {
          this.photoInfoData = res.body.message[0]
        })
      },
      getImageUrl() {
        var url = common.apihost + "api/getthumimages/" + this.$route.params.photoId;
        this.$http.get(url).then(res => {
          console.log(res.body.message)
          res.body.message.forEach(ele=>{
            ele.w=640;
            ele.h=400;
          })
          this.photoUrlData = res.body.message;
        })
      }
    },
    components: {
      subcomment
    }
  }
</script>