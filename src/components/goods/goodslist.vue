<template>
  <div class='tpl-comonstyle'>
    <ul class="mui-table-view mui-grid-view">
      <li class="mui-table-view-cell mui-media mui-col-xs-6 " v-for="item in goodsDatas">
       <div class="goodslist-item">
        <router-link :to="'/goods/goodsdetail/'+item.id">
          <img class="mui-media-object" :src="item.img_url">
          <p class="good-content">{{item.title}}</p>
          <div class="goods-price">
            <span>{{item.sell_price}}</span>&nbsp;&nbsp;
            <s>{{item.market_price}}</s>
          </div>
          <div class="goods-detail-info">
            <span>热卖中</span>
            <span>剩余<strong>{{item.stock_quantity}}</strong>件</span>
          </div>
        </router-link>
       </div>
      </li>
    </ul>
  </div>
</template>
  
<style scoped>
.goodslist-item{
  // border:1px solid #333;
  box-shadow:0 3px 3px gray;
}
  .mui-table-view-cell p.good-content {
    font-size: 16px;
    color: black;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
   .mui-table-view-cell .goods-price{
     text-align:left;
     padding:10px 0;
     color:gray;
   }
    .mui-table-view-cell .goods-price span{
     color:red;
     font-size:20px;
   }
   .mui-table-view-cell .goods-detail-info{
     display:flex;
     justify-content:space-between;
     color:#666;
   }

</style>
  
<script>
  import common from '../../statics/js/common.js'
  export default {
    data() {
      return {
        goodsDatas: []
      }
    },
    created() {
      this.getGoodsList();
    },
    methods: {
      getGoodsList() {
        var url = common.apihost + "api/getgoods";
        this.$http.get(url).then(res => {
          this.goodsDatas = res.body.message;
        })
      }
    }
  }
</script>