<template>
  <div class='tpl-comonstyle'>
      <h3>{{getdescData.title}}</h3>
     <div v-html="getdescData.content"></div>
  </div>
</template>
  
<style scoped>
</style>
  
<script>
  import common from '../../statics/js/common.js'
  export default {
    data() {
      return {
        getdescData:{}
      }
    },
    created() {
      this.getdesc();
    },
    methods: {
      getdesc() {
       var url=common.apihost+"api/goods/getdesc/"+this.$route.params.goodsId;
       this.$http.get(url).then(res=>{
         console.log(res.body.message);
         this.getdescData=res.body.message[0];
       })
      }
    }
  }
</script>