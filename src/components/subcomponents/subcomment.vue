<template>
  <div class='subcomment'>
    <div class="submit-comment">
      <h4>提交评论</h4>
      <textarea placeholder="请输入你的评论" cols="20" rows="10" ref="commentInfo"></textarea>
      <mt-button type="primary" size="large" class="btn" @click="submitComment">提交评论</mt-button>
    </div>
    <div class="comment-list">
      <h4>评论列表</h4>
      <div class="list-detail" v-for="item in commentData" >
        <p>{{item.content}}</p>
        <div class="litter-info">
          <span>{{item.user_name}}</span><span class="right">{{item.add_time |myFilter }}</span>
        </div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore()">加载更多</mt-button>
  </div>
</template>
<style scoped>
  .subcomment {
    margin-top: 20px;
  }

  .subcomment .submit-comment {
    padding: 5px 0;
  }

  .subcomment .submit-comment h4 {
    padding: 5px 0;
    border-bottom: 1px solid #ccc;
  }

  .subcomment .submit-comment .btn {
    margin-top: 5px;
  }

  .subcomment .comment-list {
    padding: 10px 0;
    margin-bottom: 10px;
  }

  .subcomment .comment-list p {
    padding: 5px;
    font-size: 16px;
  }

  .subcomment .comment-list span {
    color: #26A2FF;
    font-size: 14px;
  }

  .subcomment .comment-list span.right {
    float: right;
  }
</style>
<script>
  import common from '../../statics/js/common.js';

  export default {
    data() {
      return {
        pageIndex: 1,
        commentData:[]
      }
    },
    props: ['commentId'],
    created() {
      this.getCommentList()
    },
    methods: {
      getCommentList() {
        var url = common.apihost + "api/getcomments/"+this.commentId+"?pageindex="+this.pageIndex;
        this.$http.get(url).then(res => {
          this.commentData=this.commentData.concat(res.body.message);
        })
      },
      getMore(){
        this.pageIndex++;
        this.getCommentList()
      },
      submitComment(){
        var commentContent=this.$refs.commentInfo.value;
        var url=common.apihost+"api/postcomment/"+this.commentId;
        this.$http.post(url,{content:commentContent},{emulateJSON:true}).then(res=>{
          if(res.body.status==0){
            this.pageIndex=1;
            this.commentData=[];
            this.$refs.commentInfo.value=""
            this.getCommentList();
          }else{
            alert("评论失败！")
          }
        })
      }
    }
  }
</script>
