<template>
  <div style="height: 150%;width: 100%">
    <margin-header :is-u-active="this.$store.state.user.isUserActive"></margin-header>
    <div class="page">
      <div class="head">
        <page-one :page_id="page.page_id" :time="page.page_send_time" :username="page.page_sender_name" :content="page.page_send_content"></page-one>
      </div>
      <div class="otherReply">
        <div class="content1">评论</div>
        <comment-one v-for="(comment1,index) in comment" :key='index'  :username="comment1.message_sender_name" :time="comment1.message_send_time" :content="comment1.message_content"></comment-one>
      </div>
      <div class="yourReply">
        <div class="content2">你的回复</div>
<!--        <el-form class="inputs">-->
        <el-form :model="submitData" class="inputs">
<!--          <el-input class="input1" placeholder="你说："></el-input>-->
          <el-input v-model="submitData.message_content" class="input1" placeholder="你说："></el-input>
<!--          <el-button style="align-self: flex-end">提交</el-button>-->
          <el-button style="align-self: flex-end" @click="submit">提交</el-button>
        </el-form>
      </div>
    </div>
    <margin-footer></margin-footer>
  </div>
</template>

<script>
import MarginHeader from "../Margin/marginHeader";
import MarginFooter from "../Margin/marginFooter";
import PageOne from "./pageOne";
import CommentOne from "./commentOne";
import {isLogin} from "../api/getData";

export default {
  name: "page",
  components: {CommentOne, PageOne, MarginFooter, MarginHeader},

  data() {
    return {
      page:{
        page_id:0,
        page_sender_id:'',
        page_sender_name:'',
        page_send_content:'',
        page_send_time:''
      },
      comment:{
        message_id:0,
        message_content_id:0,
        message_sender_name:'',
        message_content:'',
        message_send_time:''
      },
      submitData:{
        message_id:0,
        message_content_id:0,
        message_sender_name:this.$store.state.user.forum_user_name,
        message_content:'',
        message_send_time:''
      }
    }
  },
  methods: {
    getData1() {
      this.page.page_id = this.$route.params.id
      console.log(this.page.page_id)
      const self=this
      this.axios.get("http://43.143.211.83:8080/forum_onePage_list?forum_page_id="+self.page.page_id).then(
        (response)=>{
          self.page.page_sender_id=response.data[0].page_sender_id
          self.page.page_sender_name=response.data[0].page_sender_name
          self.page.page_send_content=response.data[0].page_send_content
          self.page.page_send_time=response.data[0].page_send_time
          console.log(this.page)
        }
      )
    },
    getData2(){
      this.page.page_id = this.$route.params.id
      console.log(this.page.page_id)
      const self=this
      this.axios.get("http://43.143.211.83:8080/forum_AllMessage_list?message_content_id="+this.page.page_id).then(
        (response)=>{
          self.comment=response.data
          console.log(this.comment)
        }
      )
    },
    submit:function () {
      if (this.$store.state.user.forum_user_id === '') {
        alert("请先登录")
        return
      }
      this.submitData.message_sender_name=this.$store.state.user.forum_user_name
      const self = this
      self.submitData.message_send_time = new Date().toLocaleTimeString()
      const date = new Date();
      const separator = "-";
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let currentDate = year + separator + month + separator + strDate;
      const time = currentDate + ' ' + self.submitData.message_send_time
      this.page.page_id = this.$route.params.id
      this.submitData.message_send_time=time
      this.submitData.message_content_id=this.page.page_id
      console.log(this.submitData.message_content_id)
      self.axios.post('http://43.143.211.83:8080/forum_message_add', {
        "message_id":self.submitData.message_id,
        "message_content_id":self.submitData.message_content_id,
        "message_sender_name":self.submitData.message_sender_name,
        "message_content":self.submitData.message_content,
        "message_send_time":self.submitData.message_send_time
      }).then(() => {
        alert("回复成功")
        self.submitData.message_content=''
        location.reload()
      })
    }
  },
  created() {
    this.getData1()
    this.getData2()
  },
  mounted() {
    isLogin()
  }
}


</script>

<style scoped>
.page {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  /*border: 2px solid red;*/
  height: 90%;
  background-color: rgb(225, 225, 225);
}

.head {
  /*background-color: white;*/
  /*border: 2px solid pink;*/
  height: 25%;
  width: 60%;
}

.otherReply {
  background-color: white;
  /*border: 2px solid pink;*/
  flex-wrap: wrap;
  height: 50%;
  overflow: scroll;
  overflow-x: hidden;
  width: 60%;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.yourReply {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  /*border: 2px solid pink;*/
  width: 60%;
  height: 20%;
  border-radius: 20px;
  box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);
}

.content1 {
  /*border:2px solid purple;*/
  width: 100%;
  margin-top: 20px;
  font-size: 30px;
  font-weight: 30;
  margin-left: 20px;
  margin-right: 20px;
  height: 10%;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
}

.content2 {
  /*border: 2px solid purple;*/
  margin-top: 10px;
  font-size: 20px;
  font-weight: 30;
  width: 95%;
  height: 20%;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
}

.inputs {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 95%;
  height: 60%;
}

.input1 {
}
</style>
