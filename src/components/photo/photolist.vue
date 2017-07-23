<template>
  <div class='tpl-comonstyle'>
    <div class="photo-nav-style">
      <ul>
        <li>全部</li>
        <li v-for="item in navData" :key="item.id">{{item.title}}</li>
      </ul>
    </div>
    <div class="photo-list-container">
      <ul>
        <li v-for="item in photoData" :key="item.id">
          <router-link :to="'/photo/photodetail/'+item.id">
            <img :src="item.img_url" alt="">
            <div class="photo-info">
              <h4>{{item.title}}</h4>
              <p>{{item.zhaiyao}}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
  .photo-nav-style ul {
    overflow: auto;
    white-space: nowrap;
    font-size: 18px;
    margin: 0;
    padding: 0;
    list-style: none;
    padding-top: 10px;
    padding-bottom: 16px;
  }
  .photo-nav-style ul li {
    display: inline;
    color: #26A2FF;
    margin: 0 5px;
  }
  .photo-list-container ul {
    margin: 0;
    padding: 0 5px;
    list-style: 0;
  }
  .photo-list-container ul li {
    position: relative;
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
  }
  .photo-list-container ul li img {
    width: 100%;
  }
  .photo-list-container ul li .photo-info {
    background-color: rgba(0, 0, 0, 0.1);
    position: absolute;
    left: 2px;
    bottom: 3px;
    color: skyblue;
  }
  .photo-list-container ul li .photo-info p {
    font-size: 12px;
    color: white;
  }
</style>
<script>
  import common from '../../statics/js/common.js';
  export default {
    data() {
      return {
        navData: [],
        photoData: []
      }
    },
    created() {
      this.getNavData();
      this.getPhotoData(0);
    },
    methods: {
      getNavData() {
        var url = common.apihost + "api/getimgcategory";
        this.$http.get(url).then(res => {
          this.navData = res.body.message;
        })
      },
      getPhotoData(categoryId) {
        var url = common.apihost + "api/getimages/" + categoryId;
        this.$http.get(url).then(res => {
          this.photoData = res.body.message;
        })
      }
    }
  }
</script>

