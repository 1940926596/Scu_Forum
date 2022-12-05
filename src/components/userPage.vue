<template>
  <div style="height: 100%;width: 100%">
    <margin-header :is-u-active="this.$store.state.user.isUserActive"></margin-header>
    <div class="page">
      <div class="posts">
        <div class="yourPost">
          <div class="content1">你发出的贴子</div>
          <div style="display: flex;flex-direction: column;align-items: center;justify-content: center">
            <have-page-one v-for="(page1,index) in page" :key='index' :content="page1.page_send_content"
                           :page_id="page1.page_id" :time="page1.page_send_time"
                           :username="page1.page_sender_name"></have-page-one>
          </div>
        </div>
        <div class="information">
          <div class="content3">
            <p>你的账号:</p>
            <p>{{ user.forum_name }}</p>
            <p>你的邮箱:</p>
            <p>{{ user.forum_email }}</p>
          </div>
          <div class="pic">
            <img :src="avatar" style="height:100px;width: 100px">
            <el-button style="margin-top: 20px;margin-left: 20px">修改信息</el-button>
          </div>
        </div>
      </div>
      <div class="newPosts">
        <div class="newPost">
          <div class="content2">你的发帖</div>
          <el-form :model="pageForm" class="inputs">
            <el-input v-model="pageForm.page_send_content" class="input1" placeholder="说点什么吧："
                      style="overflow-y: hidden"></el-input>
            <el-button style="align-self: flex-end" @click="submit">提交</el-button>
          </el-form>
        </div>
      </div>

    </div>
    <margin-footer></margin-footer>
  </div>
</template>
<script>
import MarginHeader from "./Margin/marginHeader";
import MarginFooter from "./Margin/marginFooter";
import CommentOne from "./Pages/commentOne";
import HavePageOne from "./Pages/havePageOne";
import {isLogin} from "./api/getData";

export default {
  name: "UserPage",
  components: {HavePageOne, CommentOne, MarginFooter, MarginHeader},
  data() {
    return {
      avatar: require('../assets/user3.jpg'),
      pageForm: {
        page_sender_id: '',
        page_sender_name: '',
        page_send_time: '',
        page_send_content: ''
      },
      page: {
        page_id: '',
        page_sender_id: '',
        page_sender_name: '',
        page_send_time: '',
        page_send_content: ''
      },
      user: {
        forum_id: '',
        forum_name: '',
        forum_email: ''
      }
    }
  },
  methods: {
    mountLogIn: function () {
      const self = this
      isLogin().then((res) => {
        self.user.forum_id = self.$store.state.user.forum_user_id
        self.user.forum_name = self.$store.state.user.forum_user_name
        self.user.forum_email = self.$store.state.user.forum_user_email
        console.log(self.user.forum_id)
        console.log(self.user.forum_name)
        console.log(self.user.forum_email)
        self.axios.get('http://43.143.211.83:8080/forum_AllPage_list?' + 'page_sender_id=' + self.user.forum_id + '&page_sender_name=' + self.user.forum_name)
            .then((response) => {
              self.page = response.data
              console.log(self.page)
              console.log(response.data)
              console.log(this.$store.state.user.isUserActive)
            })
      })

      // const promise=new Promise((resolve,reject)=>{
      //
      // })
      // const self=this
      // this.axios.get("http://43.143.211.83:8080/getUserCookie").then((response) => {
      //   console.log(response.data)
      //   this.$store.commit('setForum_user_cookie',response.data)
      //   console.log(this.$store.state.user.cookie)
      //   if (response.data !== "no cookie") {
      //     this.$store.state.user.forum_user_email=this.$store.state.user.cookie
      //     this.axios.get("http://43.143.211.83:8080/forum_oneUser_email_list?forum_user_email=" + this.$store.state.user.forum_user_email).then((response) =>{
      //       this.$store.state.user.forum_user_id=response.data[0].forum_id
      //       this.$store.state.user.forum_user_pwd=response.data[0].forum_pwd
      //       this.$store.state.user.forum_user_name=response.data[0].forum_name
      //       self.user.forum_id = self.$store.state.user.forum_user_id
      //       self.user.forum_name = self.$store.state.user.forum_user_name
      //       self.user.forum_email = self.$store.state.user.forum_user_email
      //       console.log(self.user.forum_id)
      //       console.log(self.user.forum_name)
      //       console.log(self.user.forum_email)
      //       self.axios.get('http://43.143.211.83:8080/forum_AllPage_list?' + 'page_sender_id=' + self.user.forum_id + '&page_sender_name=' + self.user.forum_name)
      //       .then((response) => {
      //         self.page = response.data
      //         console.log(self.page)
      //         console.log(response.data)
      //       })
      //     })
      //   }
      //   else this.$store.state.user.forum_user_email=''
      // }).catch((err)=>{
      //   console.log(err)
      // })
    },
    submit: function () {
      const self = this
      self.pageForm.page_send_time = new Date().toLocaleTimeString()
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
      const time = currentDate + ' ' + self.pageForm.page_send_time
      self.pageForm.page_sender_id = self.user.forum_id
      self.pageForm.page_sender_name = self.user.forum_name
      console.log(time)
      console.log(self.pageForm.page_sender_id)
      console.log(self.pageForm.page_sender_name)
      console.log(this.user)
      if (self.pageForm.page_send_content === '') {
        alert("发送消息不能为空")
        return
      }
      self.axios.post('http://43.143.211.83:8080/forum_page_add', {
        "page_id": self.pageForm.page_sender_id,
        "page_sender_id": self.pageForm.page_sender_id,
        "page_sender_name": self.pageForm.page_sender_name,
        "page_send_time": time,
        "page_send_content": self.pageForm.page_send_content
      }).then(() => {
        console.log(currentDate + ' ' + self.pageForm.page_send_time)
        alert("发帖成功")
        self.pageForm.page_send_content = ''
        location.reload()
      })
    }
  },
  mounted() {
    console.log(123)
    this.mountLogIn()
  },

  destroyed() {
    console.log("destroy")
  }

}
</script>

<style scoped>
.page {
  height: 85%;
  width: 100%;
  /*border: 2px solid red;*/
  background-color: rgb(226, 226, 226);
}

.newPosts {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30%
}

.posts {
  padding-top: 20px;
  height: 65%;
  display: flex;
  /*border: 2px solid purple;*/
  justify-content: space-around;
}

.yourPost {
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 60%;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);
  /*border: 2px solid red;*/
  overflow: scroll;
  overflow-x: hidden;
}

.content3 {
  margin-left: 20px;
  font-weight: 50;
  line-height: 40px;
  /*border: 2px solid orange;*/
  font-size: 20px;
  width: 50%;
  height: 50%;
}

.pic {
  /*border: 2px solid orange;*/
  width: 50%;
}

.information {
  background-color: white;
  margin-top: 50px;
  display: flex;
  width: 30%;
  height: 50%;
  /*border: 2px solid red;*/
  /*justify-content: center;*/
  border-radius: 20px;
  box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);
}

.newPost {
  height: 100%;
  /*border: 2px solid pink;*/
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  /*border: 2px solid pink;*/
  width: 60%;
  border-radius: 20px;
  box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);
}

.content1 {
  /*border:2px solid purple;*/
  margin-top: 20px;
  padding-bottom: 10px;
  font-size: 20px;
  font-weight: 30;
  margin-left: 20px;
  margin-right: 20px;
  height: 10%;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
}

.content2 {
  /*border: 2px solid purple;*/
  margin-top: 10px;
  margin-bottom: 5px;
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
