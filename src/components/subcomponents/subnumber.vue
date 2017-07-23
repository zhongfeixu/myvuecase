<template>
  <div>
    <span class="cut" @click="cutCount()">-</span>
    <span class="dataCount">{{count}}</span>
    <span class="add" @click="addCount()">+</span>
  </div>
</template>
  
<style scoped>
  .cut,
  .add {
    display: inline-block;
    border: 1px solid gray;
    width: 40px;
    height: 30px;
    border-radius: 5px;
    text-align: center;
    line-height: 30px;
    font-size: 30px;
  }
  .dataCount {
    text-align: center;
    vertical-align: center;
    display: inline-block;
    width: 40px;
    height: 30px;
  }
</style>
  
<script>
  import common from '../../statics/js/common.js'
  export default {
    data() {
      return {
        count:1
      }
    },
    created() {
    },
    methods: {
      cutCount(){
        if(this.count<=1) return;
        this.count--;
        this.sendData();
      },
      addCount(){
        this.count++;
        this.sendData();
        
      },
      sendData(){
        this.$emit("changnumber",this.count)
      }
    }
  }
</script>