<template>
  <div class='tpl-comonstyle'>
    <div class="carousel-style">
      <carousel :carouselUrl="'api/getthumimages/'+this.$route.params.goodsId" :carouselduration="1500"></carousel>
    </div>
    <div class="goods-info">
      <h4>{{goodsInfoData.title}}</h4>
      <p>市场价：￥{{goodsInfoData.market_price}}&nbsp; 销售价：￥<span>{{goodsInfoData.sell_price}}</span></p>
      <subnumber @changnumber="getsubnumber"></subnumber>
      <mt-button type="primary" size="small">立即购买</mt-button>
      <mt-button @click="addcarts()" type="danger" size="small">加入购物车</mt-button>
    </div>
    <div class="goods-description">
      <h4>商品参数</h4>
      <p>商品货号：{{goodsInfoData.goods_no}}</p>
      <p>库存情况：剩余 {{goodsInfoData.stock_quantity}} 件</p>
      <p>上架时间：剩余{{goodsInfoData.add_time|myFilter("YYYY-MM-DD hh:mm:ss")}}</p>
    </div>
    <div class="pic-introduce">
      <mt-button @click="picIntro()" plain type="primary" size="large">图文介绍</mt-button>
      <mt-button @click="getcommet()" class="goods-comment" plain type="danger" size="large">商品评论</mt-button>
    </div>
  </div>
</template>
 
<style scoped>
  .carousel-style,
  .goods-info,
  .goods-description,
  .pic-introduce {
    padding: 10px;
  }
  .goods-info h4 {
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc; // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
  }
  .goods-description p {
    margin: 0;
    padding: 0;
  }
  .goods-description h4 {
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
  }
  .pic-introduce .goods-comment {
    margin-top: 10px;
  }
</style>
  
<script>
  import common from '../../statics/js/common.js'
  import carousel from '../subcomponents/carouselcomponent.vue'
  import subnumber from '../subcomponents/subnumber.vue'
  import {
    bus
  } from "../../statics/js/commonVue.js"
  import {
    addStorageData
  } from '../../statics/js/shopCartTool.js'
  export default {
    data() {
      return {
        goodsInfoData: {},
        mycountnumber: 1
      }
    },
    created() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        var url = common.apihost + "api/goods/getinfo/" + this.$route.params.goodsId;
        this.$http.get(url).then(res => {
          this.goodsInfoData = res.body.message[0]
        })
      },
      picIntro() {
        this.$router.push({
          name: 'pictureAndText',
          params: {
            goodsId: this.$route.params.goodsId
          }
        })
      },
      getcommet() {
        this.$router.push({
          path: '/goods/goodscomment',
          query: {
            goodsId: this.$route.params.goodsId
          }
        })
      },
      getsubnumber(count) {
        console.log("我是goodsdetail中的数" + count);
        this.mycountnumber = count;
        // console.log(bus)
      },
      addcarts() {
        //非父子组件传参数的事件￥emit
        this.$root.newBus.$emit('countCart', this.mycountnumber);
        //将数据保存在本地的localStorage中。
        let obj = {
          "goodsId": this.$route.params.goodsId,
          "count": this.mycountnumber
        }
        let datas = JSON.stringify(obj)
        addStorageData(datas);
        
      }
    },
    components: {
      carousel,
      subnumber
    }
  }
</script>