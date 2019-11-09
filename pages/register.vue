<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo" />
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" />
          <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="4" />
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="pwd2">
          <el-input v-model="ruleForm.pwd2" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">同意以下协议并注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">用户协议</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
  layout: 'blank',
  data () {
    return {
      ruleForm: {
        name: '',
        email: '',
        code: '',
        pwd: '',
        pwd2: ''
      },
      statusMsg: '',
      error: '',
      rules: {
        name: [{ required: true, type: 'string', message: '请输入用户名', trigger: 'blur' }],
        email: [{ required: true, type: 'email', message: '请输入邮箱', trigger: 'blur' }],
        pwd: [{ required: true, message: '创建密码', trigger: 'blur' }],
        pwd2: [
          { required: true, message: '确认密码', trigger: 'blur' },
          {
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
          }
        ]
      }
    }
  },
  methods: {
    sendMsg () {
      let nameErr
      let emailErr
      if (this.timerid) {
        return false
      }
      this.$refs.ruleForm.validateField('name', (error) => {
        nameErr = error
      })
      this.statusMsg = ''
      if (nameErr) {
        return false
      }
      this.$refs.ruleForm.validateField('email', (error) => {
        emailErr = error
      })
      if (!nameErr && !emailErr) {
        this.$axios.post('/user/verify', {
          username: this.ruleForm.name,
          email: this.ruleForm.email
        }).then(({ data }) => {
          if (data.code === 0) {
            let count = 60
            this.statusMsg = `验证码已发送，剩余${count}秒`
            this.timerid = setInterval(() => {
              count--
              this.statusMsg = `验证码已发送，剩余${count}秒`
              if (count === 0) {
                clearInterval(this.timerid)
                this.timerid = null
              }
            }, 1000)
          } else {
            this.statusMsg = data.msg
          }
        })
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/user/signup', {
            username: this.ruleForm.name,
            password: CryptoJS.MD5(this.ruleForm.pwd).toString(),
            email: this.ruleForm.email,
            code: this.ruleForm.code
          }).then(({ data }) => {
            if (data && data.code === 0) {
              location.href = '/login'
            } else {
              this.error = data.msg
            }
          }).catch((error) => {
            this.error = `服务器出错，错误码：${error.response.status}`
            setTimeout(() => {
              this.error = ''
            }, 1500)
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>
