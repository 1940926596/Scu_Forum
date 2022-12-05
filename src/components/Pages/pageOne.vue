<template>
  <div class="pageOne">
    <div class="post">
      <div class="avatar">
        <img :src="messages.avatar" style="height:50px;width: 50px">
      </div>
      <div class="content1">
        <div class="content2">
          <div style="font-size: 20px;font-weight: 700;">发帖人：{{ username }}</div>
          <div style="font-size: 15px;word-break: break-all;color: rgba(0,0,0,0.6);margin-top: 10px">{{ content }}</div>
          <div style="font-size: 20px;font-weight:bold;color: rgba(0,0,0,0.4);position: absolute;bottom: 0px;">
            {{ time }}
          </div>
        </div>
        <el-button style="margin-right: 40px" @click="detail">查看详情</el-button>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "pageOne",
  data() {
    return {
      messages: {
        username: '',
        avatar: require('../../assets/user1.jpg'),
        content: '',
        time: new Date().toLocaleTimeString()
      },
      page: {
        page_id: this.page_id,
        page_sender_name: this.username,
        page_send_content: this.content,
        page_send_time: this.time
      }
    }
  },
  methods: {
    detail: function () {
      console.log(this.page)
      this.$router.push({
        name: 'page',
        params: {
          id: this.page_id
        }
      })
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
  width: 100%;
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
</style>
