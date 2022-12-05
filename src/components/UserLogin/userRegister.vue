<script src="../../store/index.js"></script>
<template>
  <div class="register" style="margin-left: 150px;margin-right: 150px;">
    <article class="header" style="margin-top: 10px">
      <header style="margin-right: 200px;display: flex;justify-content: flex-end;align-items: center;">
        <em class="bold">已有账号？</em>
        <el-button size="small" type="primary" @click="login">登录</el-button>
      </header>
    </article>
    <div class="page-register">
      <el-steps :active="active" finish-status="success" style="margin-left: 200px;margin-right: 200px">
        <el-step title="step1"></el-step>
        <el-step title="step2"></el-step>
      </el-steps>
      <section>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          autocomplete="off"
          class="demo-ruleForm"
          label-width="100px"
        >
          <div v-if="active==0">
            <el-form-item prop="textarea">
              <el-input :readonly="true"
                        :rows="15"
                        :value="ruleForm.textarea"
                        style="margin-left: 5px"
                        type="textarea"
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="agreed" style="margin-left: 5px">
              <el-checkbox v-model="ruleForm.agreed">同意注册协议</el-checkbox>
            </el-form-item>
          </div>
          <div v-if="active==1">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="ruleForm.name"/>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email"/>
              <el-button round size="mini" @click="sendMsg">发送验证码</el-button>
              <span class="status">{{ statusMsg }}</span>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-input v-model="ruleForm.code" maxlength="4"/>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="ruleForm.pwd" type="password"/>
            </el-form-item>
            <el-form-item label="确认密码" prop="cpwd">
              <el-input v-model="ruleForm.cpwd" type="password"/>
            </el-form-item>

          </div>
        </el-form>
      </section>
      <div class="footer">
        <el-button
          v-if="active>0"
          icon="el-icon-arrow-left"
          type="primary"
          @click="prev"
        >上一步
        </el-button>
        <el-button
          v-if="active<step-1"
          icon="el-icon-arrow-right"
          type="primary"
          @click="next"
        >下一步
        </el-button>
        <el-button
          v-if="active==step-1"
          type="primary"
          @click="register"
        >注册
        </el-button>
        <div class="error">{{ error }}</div>
      </div>
    </div>
    <margin-footer></margin-footer>
  </div>
</template>

<script>

import MarginFooter from "../Margin/marginFooter";

export default {
  components: {MarginFooter},
  data() {
    return {
      step: 2,
      active: 0,
      statusMsg: '',
      error: '',
      ruleForm: {
        textarea: '请仔细阅读以下协议\n' +
          '1、一切移动客户端用户在下载并浏览件时均被视为已经仔细阅读本条款并完全同意。凡以任何方式登陆网站，或直接、间接使用本资料者，均被视为自愿接受本网站相关声明和用户服务协议的约束。\n' +
          '2、转载的内容并不代表网站的意见及观点，也不意味着本网赞同其观点或证实其内容的真实性。\n' +
          '3、转载的文字、图片、音视频等资料均由用户提供，其真实性、准确性和合法性由信息发布人负责。不提供任何保证，并不承担任何法律责任。\n\n',
        agreed: false,
        name: '',
        code: '',
        pwd: '',
        cpwd: '',
        email: ''
      },
      rules: {
        agreed: [{
          required: true,
          validator: (rule, value, callback) => {
            console.log('value:' + value)
            if (value !== true) {
              callback(new Error('请确认同意注册协议'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }],
        name: [{
          type: 'string',
          message: '请输入用户名',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          type: 'string',
          message: '请输入邮箱',
          trigger: 'blur'
        }, {
          required: true,
          type: 'email',
          message: '请正确输入邮箱',
          trigger: 'blur'
        }],
        pwd: [{
          required: true,
          message: '创建密码',
          trigger: 'blur'
        }],
        cpwd: [{
          required: true,
          message: '确认密码',
          trigger: 'blur'
        }, {
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.ruleForm.pwd) {
              callback(new Error('两次输入密码不一致'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        },]
      }
    }
  },
  layout: 'blank',
  methods: {
    sendMsg: function () {
      const self = this
      let namePass
      let emailPass
      if (self.timerid) {
        return false
      }
      this.$refs['ruleForm'].validateField('name', (valid) => {
        namePass = valid
      })
      self.statusMsg = ''
      if (namePass) {
        return false
      }
      this.$refs['ruleForm'].validateField('email', (valid) => {
        emailPass = valid
      })
      // 模拟验证码发送
      if (!namePass && !emailPass) {
        let count = 60
        self.statusMsg = `验证码已发送,剩余${count--}秒`
        self.timerid = setInterval(function () {
          self.statusMsg = `验证码已发送,剩余${count--}秒`
          if (count === 0) {
            clearInterval(self.timerid)
          }
        }, 1000)
      }
    },

    next: function () {
      if (this.active === 0) {
        this.$refs['ruleForm'].validateField('agreed', (valid) => {
          if (valid === '') {
            this.active++
          }
        })
      }
    },

    prev: function () {
      if (--this.active < 0) this.active = 0
    },

    login: function () {
      this.$router.push('/login')
    },
    // 模拟登录
    register: function () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          alert(valid)
          setTimeout(
            this.$router.push('/'), 2000
          )
        }
      })
    }
  }
}
</script>

<style scoped>
.register{
  overflow: hidden;
}

body {
  border: 100px;

}

.header {
  min-width: 980px;
  color: #666;

}

header {
  margin: 0 auto;
  padding: 10px 0;
  width: 980px;

}

.bold {
  font-style: normal;
}



section {
  margin: 0 auto 30px;
  padding-top: 30px;
  width: 980px;
  min-height: 300px;
  padding-right: 550px;
  box-sizing: border-box;
}

.status {
  font-size: 12px;
  margin-left: 20px;
  color: #e6a23c;
}

.error {
  color: red;
}


.footer {
  text-align: center;
  background-color: rgb(255 255 255);
  padding: 25px;
}


</style>

