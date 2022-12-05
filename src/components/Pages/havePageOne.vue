<template>
  <div class="pageOne">
    <div v-for="(message,index) in messages" :key="index" class="post">
      <div class="avatar">
        <img :src="message.avatar" style="height:50px;width: 50px">
      </div>
      <div class="content1">
        <div class="content2">
          <div style="font-size: 20px;font-weight: 700;">发帖人：{{username}}</div>
          <div class="content4">{{content}}</div>
          <div  class="content3">
            {{ time }}
          </div>
        </div>
        <div>
          <el-button @click="deletes">删除该贴</el-button>
          <el-button style="margin-right: 10px" @click="detail">查看该贴</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "havePageOne",
  data() {
    return {
      messages: [{
        username: '',
        avatar: require('../../assets/user2.jpg'),
        content: '',
        time: new Date().toLocaleTimeString()
      }],
      page:{
        page_id:0
      }
    }
  },
  methods:{
    detail:function (){
      this.page.page_id=this.page_id
      console.log(this.page)
      this.$router.push({
        name: 'page',
        params:{
          id:this.page.page_id
        }
      })
    },
    deletes:function (){
      this.axios.get("http://43.143.211.83:8080/forum_page_delete?page_id="+this.page_id)
      alert("删除成功")
      location.reload();
    }
  },
  props: {
    page_id: {
      type: Number,
      default: 0
    },
    username: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    time: {
      type: String,
      default: ""
    }
  }
}
</script>

<style scoped>
.pageOne {
  width: 90%;
  /*border: 2px solid red;*/
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

}

.avatar {
  height: 100%;
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content3{
  font-size: 20px;
  font-weight:bold;
  color: rgba(0,0,0,0.4);
  position: absolute;
  bottom: 0px;
  /*border:2px solid red;*/
}

.content1 {
  width: 85%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content2 {
  padding: 20px;
  padding-top: 30px;
  height: 100%;
  width: 50%;
  position: relative;
}

.post {
  height: 200px;
  margin: 30px;
  width: 100%;
  display: flex;
  background-color: white;
  border-radius: 20px;
  box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);

}

.content4{
  font-size: 15px;
  color: rgba(0,0,0,0.6);
  margin-top: 10px;
  /*border: 2px solid red;*/
  width: 100%;
  height: 60%;
  word-break: break-all;
  overflow: hidden;
}
</style>
