<template>
   <div class='tpl-comonstyle'>
    <subcomment :commentId="this.$route.query.goodsId"></subcomment>
   </div>
</template>
  
<style scoped>
  
</style>
  
<script>
  import common from '../../statics/js/common.js'
  import subcomment from '../subcomponents/subcomment.vue'
  export default {
    components:{
      subcomment
    }
  }
</script>