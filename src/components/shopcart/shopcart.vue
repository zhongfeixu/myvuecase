<template>
  <div class='tpl-comonstyle'>
    <div class="goodsListStyle">
      <div class="everyItemStyle" v-for="(item,index) in goodsDatas" :key="item.id">
        <!-- 1.0 开关 -->
        <mt-switch @change="calcTotalCountPrice()" v-model="checkStatus[index]"></mt-switch>
        <!-- 2.0 缩略图 -->
        <img :src="item.thumb_path">
        <!-- 3.0 商品价格和数量的信息 -->
        <div class="priceAndCountStyle">
          <h5>{{item.title}}</h5>
          <p>
            <span>{{item.sell_price}}</span>&nbsp;&nbsp;商品数量{{item.count}}
          </p>
        </div>
        <!-- 4.0 删除按钮 -->
        <mt-button @click="deleteGoods(index)" :disabled="!checkStatus[index]" class="deleteGoodsStyle" size="small" type="danger">删 除</mt-button>
      </div>
    </div>
    <!-- 2.0 关于商品的统计信息 -->
    <div class="goodsListStatisticsInfoStyle">
      <h5>总计(不含运费)</h5>
      <p>已经勾选商品 <span>{{totalCount}}</span> 件,总价 <span>{{totalPrice}}</span> 元</p>
      <mt-button class="checkStyle" size="small" type="danger">去结算</mt-button>
    </div>
  </div>
</template>
  
<style scoped>
  /* 1.0 商品数量列表样式 */
  .goodsListStyle {
    padding: 6px;
    position: relative;
    z-index: 10;
  }
  .everyItemStyle {
    display: flex;
    height: 100px;
    border-bottom: 1px solid rgba(92, 92, 92, 0.3);
    align-items: center;
  }
  .everyItemStyle img {
    width: 65px;
    height: 65px;
    border: 1px solid rgba(92, 92, 92, 0.3);
    padding: 5px;
    border-radius: 8px;
    margin-left: 10px;
  }
  .priceAndCountStyle {
    margin-left: 8px;
    flex: 1;
  }
  .priceAndCountStyle h5 {
    color: #0094ff;
  }
  .priceAndCountStyle p {
    margin-top: 8px;
  }
  .priceAndCountStyle p span {
    font-size: 16px;
    color: red;
  }
  .deleteGoodsStyle {
    width: 55px;
  }
  /* 2.0 商品统计信息的样式 */
  .goodsListStatisticsInfoStyle {
    height: 100px;
    background-color: rgba(92, 92, 92, 0.3);
    padding-left: 15px;
    padding-top: 20px;
    position: relative;
  }
  .goodsListStatisticsInfoStyle h5 {
    font-size: 16px;
    color: black;
    font-weight: 700;
  }
  .goodsListStatisticsInfoStyle p {
    margin-top: 10px;
  }
  .goodsListStatisticsInfoStyle span {
    font-size: 16px;
    color: red;
  }
  .checkStyle {
    position: absolute;
    top: 35px;
    right: 15px;
  }
</style>
  
<script>
  import common from '../../statics/js/common.js'
  import {
    getLocalStorage,deleteLocalStorageData
  } from "../../statics/js/shopCartTool.js";
  export default {
    data() {
      return {
        goodsDatas: [],
        checkStatus: [],
        totalCount: 0,
        totalPrice: 0
      }
    },
    created() {
      var localDatas = getLocalStorage();
      var resultDatas = {};
      // //89,4
      // //count:2    goodsId:"88"
      if(!localDatas.toString()) return;
      for (var i = 0; i < localDatas.length; i++) {
        let obj = localDatas[i];
        if (!resultDatas[obj.goodsId]) {
          resultDatas[obj.goodsId] = obj.count
        } else {
          resultDatas[obj.goodsId] += obj.count
        }
      }
      this.getshopcarlist(resultDatas);
    },
    methods: {
      getshopcarlist(option) {
        var goodsId = '';
        for (var key in option) {
          goodsId += key + ","
        }
        goodsId = goodsId.slice(0, -1)
        var url = common.apihost + "api/goods/getshopcarlist/" + goodsId;
        this.$http.get(url).then(res => {
          res.body.message.forEach(ele => {
            ele.count = option[ele.id]
            this.checkStatus.push(true)
          })
          this.goodsDatas = res.body.message;
          this.calcTotalCountPrice();
        })
      },
      calcTotalCountPrice() {
        let tempCount = 0;
        let tempPrice = 0;
        let that = this;
        this.checkStatus.forEach(function(item, index) {
          if (item) {
            tempCount += that.goodsDatas[index].count;
            tempPrice += that.goodsDatas[index].sell_price * that.goodsDatas[index].count;
          }
        })
        this.totalCount = tempCount;
        this.totalPrice = tempPrice
      },
      deleteGoods(index) {
        
        //  删除商品需要做的事
        // 1、 App.vue中徽标的值也要发生对应的更改
          console.log(index);
            this.$root.newBus.$emit("countCart",-this.goodsDatas[index].count)
        // 见代码
        // 2、 删除localStorage中该id对应的所有的商品
          deleteLocalStorageData(this.goodsDatas[index].id)
        // 见代码
        // 3、 将删除的索引的商品干掉
          this.goodsDatas.splice(index,1)
          this.checkStatus.splice(index,1)
        // 4、 重新统计我们的总数量和总价格
        this.calcTotalCountPrice();
        // 见代码
        // 条件:
        //   就是删除那一项的索引值
      }
    }
  }
</script>