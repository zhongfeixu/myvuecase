<template>
  <div>
    <mt-swipe :auto="carouselduration" class="swiper-style">
      <mt-swipe-item v-for="(item,index) in swiperArr" :key="index">
        <a :href="item.url">
          <img :src="item.img" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
  
<style scoped>
  .swiper-style {
    height: 250px;
    box-shadow:0 0 5px gray;
    z-index: 2;
  }
  .swiper-style img {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
  
<script>
  import common from '../../statics/js/common.js'
  export default {
    data() {
      return {
        swiperArr:[]
      }
    },
    created() {
      this.getSwiper();
    },
    methods: {
      getSwiper: function() {
        var url = common.apihost + this.carouselUrl;
        this.$http.get(url).then(function(res) {
          this.swiperArr = res.body.message;
        })
      }
    },
    // props: ["carouselUrl"]
    props:{
      "carouselUrl":String,
      "carouselduration":Number
    }
  }
</script>