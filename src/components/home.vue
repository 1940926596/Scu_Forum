<template>
  <div style="height: 100%;width: 100%;overflow: hidden">
    <margin-header :is-u-active="this.$store.state.user.isUserActive"></margin-header>
    <div class="page">
      <div class="posts">
        <page-one v-for="(page1,index) in page" :key='index' :content="page1.page_send_content" :page_id="page1.page_id"
                  :time="page1.page_send_time" :username="page1.page_sender_name"
                  class="box1"></page-one>
        <!--        <div class="post" v-for="(message,index) in messages" :key="index">-->
        <!--          <div class="avatar">-->
        <!--            <img :src="message.avatar" style="height:50px;width: 50px">-->
        <!--          </div>-->
        <!--          <div class="content1">-->
        <!--            <div class="content2">-->
        <!--              <div style="font-size: 20px;font-weight: 700;">发帖人：{{message.username}}</div>-->
        <!--              <div style="font-size: 15px;color: rgba(0,0,0,0.6);margin-top: 10px">{{ message.content }}</div>-->
        <!--              <div style="font-size: 20px;font-weight:bold;color: rgba(0,0,0,0.4);position: absolute;bottom: 10px;">{{message.time}}</div>-->
        <!--            </div>-->
        <!--            <el-button style="margin-right: 40px" @click="toPage">查看详情</el-button>-->
        <!--          </div>-->
        <!--        </div>-->

      </div>
      <div class="category">
        <div style="margin-top: 20px;font-size: 25px;font-weight: 700;letter-spacing: 2px;color: rgba(0,0,0,0.6)">所有板块
        </div>
        <div style="width: 80%;margin-top: 30px;border: 1px solid rgba(0,0,0,0.2)">
          <div
            style="width: 100%;height: 50px;border-bottom: 1px solid rgba(0,0,0,0.2);display: flex;align-items: center;font-size: 15px;font-weight: 700;">
            <p style="padding:0;margin-left: 20px">板块名</p></div>
          <div
            style="width: 100%;height: 200px;border-bottom: 1px solid rgba(0,0,0,0.2);display: flex;justify-content: center;flex-wrap: wrap">
            <div class="label1">唱歌</div>
            <div class="label1">跳舞</div>
            <div class="label1">说唱</div>
            <div class="label1">篮球</div>
          </div>
          <div
            style="width: 100%;height: 50px;display: flex;align-items: center;font-size: 15px;justify-content: center;font-weight: 700;color: rgba(0,0,0,0.6)">
            点击你感兴趣的版块
          </div>
        </div>
      </div>
    </div>
    <margin-footer></margin-footer>
  </div>

</template>

<script>
import marginHeader from "./Margin/marginHeader";
import marginFooter from "./Margin/marginFooter";
import PageOne from "./Pages/pageOne";
import {isLogin, login, logout, test} from "./api/getData";
import axios from "axios";

export default {

  data() {
    return {
      messages: [{
        username: '詹姆斯',
        avatar: require('../assets/user1.jpg'),
        content: '中国好，中国秒，中国顶呱呱',
        time: new Date().toLocaleTimeString()
      }, {
        username: '库里',
        avatar: require('../assets/user2.jpg'),
        content: '中国好，中国秒，中国顶呱呱',
        time: new Date().toLocaleTimeString()

      }, {
        username: '科比',
        avatar: require('../assets/user3.jpg'),
        content: '中国好，中国秒，中国顶呱呱',
        time: new Date().toLocaleTimeString()
      }],
      aaa: 1,
      page: {
        page_id: '',
        page_sender_id: '',
        page_sender_name: '',
        page_send_time: '',
        page_send_content: ''
      },
    }
  },
  methods: {
    toPage: function () {
      this.$router.push('/page');
    },
    mountLogIn: function () {
      const self = this
      function login() {
        isLogin()
        self.axios.get("http://43.143.211.83:8080/forum_page_list").then((response) => {
          self.page = response.data
        })
      }
      login()
    }
  },
  mounted() {
    this.mountLogIn()
  },
  beforeCreate() {
    console.log(this.$store.state.user.test)
    test()
  },

  components: {
    PageOne,
    marginHeader,
    marginFooter
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
  display: flex;
  justify-content: space-around;

}

.posts {
  margin-top: 30px;
  height: 90%;
  width: 70%;
  /*border: 2px solid red;*/
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: scroll;
  border-radius: 5px;
  overflow-x: hidden;
}

.category {
  margin-top: 30px;
  height: 90%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post {
  height: 200px;
  margin: 30px;
  display: flex;
  background-color: white;
  border-radius: 20px;
  box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);

}

.avatar {
  height: 100%;
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
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

.label1 {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(26, 187, 246, 1);
  color: rgba(26, 187, 246);
  font-size: 15px;
  padding: 10px;
  height: 40px;
  margin: 5px;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
}

.label1:hover {
  color: white;
  background-color: rgb(26, 187, 246);
}

.box1 {
  width: 100%;
  /*border: 2px solid red;*/
  padding-left: 100px;
  padding-right: 100px;
}

</style>
