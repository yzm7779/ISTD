<script setup>
import { Iphone, Lock, Message, Search, User } from '@element-plus/icons-vue'
import { ref } from 'vue'
import router from '@/router/index.js'
import Captcha from '@/views/LoginRegister/components/Captcha.vue'
const isLogin = ref(true)
const registerType = ref('doctor')

const toHelp = async () => {
  await router.push('/help')
}
//获取最新的验证码
const currentCaptcha = ref('')
const loginModel = ref({
  phone: '',
  password: '',
  code: ''
})

const registerModel = ref({
  phone: '',
  password: '',
  repassword: '',
  code: '',
  certificate: '',
  name: ''
})
const test = () => {
  console.log(registerModel.value)
}
test()

const loginrules = {
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号码',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '验证码必须是6位数字', trigger: 'blur' }
  ]
}

const registerrule = {
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号码',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== registerModel.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: /^\d{4}$/, message: '验证码必须是4位数字', trigger: 'blur' }
  ],
  certificate: [
    { required: true, message: '请输入医师证', trigger: 'blur' },
    { pattern: /^$\d{15}/, message: '医师证必须是15位数字', trigger: 'blur' }
  ],
  name: [{ required: 'true', message: '请输入真实姓名', trigger: 'blur' }]
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg">
      <div class="login-page-left">
        <h1 class="title">欢迎使用</h1>
        <h1 class="title">智影透诊</h1>
        <img src="https://i.postimg.cc/7Z3gDBxj/1734672413.jpg" alt="" />
      </div>
      <div class="notice">
        如果您是首次使用该系统，
        <el-link :underline="true" class="word" @click="toHelp">
          请点击此处
        </el-link>
      </div>
    </el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 登录表单-->
      <!--由于医师患者登录方式相同，所以不做区分 -->
      <el-form v-if="isLogin" :model="loginModel" :rules="loginrules">
        <el-form-item><h1>欢迎登录</h1></el-form-item>
        <el-form-item prop="phone">
          <el-input
            placeholder="请输入电话号码"
            :prefix-icon="Iphone"
            v-model="loginModel.phone"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            :prefix-icon="Lock"
            v-model="loginModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            placeholder="请输入验证码"
            :prefix-icon="Message"
            v-model="loginModel.code"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isLogin = false">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
      <!--注册表单-->
      <!--医师患者注册所需数据不同，故再次嵌套-->
      <el-form v-else :model="registerModel" :rules="registerrule">
        <el-form-item>
          <h1>欢迎注册</h1>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="registerType">
            <el-radio-button
              @click="registerType = 'doctor'"
              label="doctor"
              value="doctor"
            >
              医师注册
            </el-radio-button>
            <el-radio-button
              @click="registerType = 'patient'"
              label="patient"
              value="patient"
            >
              患者注册
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="registerType === 'doctor'" prop="certificate">
          <el-input
            placeholder="请输入医师证号"
            :prefix-icon="Search"
            v-model="registerModel.certificate"
          ></el-input
        ></el-form-item>
        <el-form-item v-if="registerType === 'doctor'" prop="name">
          <el-input
            placeholder="请输入姓名"
            :prefix-icon="User"
            v-model="registerModel.name"
          ></el-input
        ></el-form-item>
        <el-form-item prop="phone"
          ><el-input
            placeholder="请输入手机号码"
            :prefix-icon="Iphone"
            v-model="registerModel.phone"
          ></el-input
        ></el-form-item>
        <el-form-item prop="password"
          ><el-input
            placeholder="请输入密码"
            :prefix-icon="Lock"
            v-model="registerModel.password"
          ></el-input
        ></el-form-item>
        <el-form-item prop="repassword">
          <el-input
            placeholder="请再次输入密码"
            :prefix-icon="Lock"
            v-model="registerModel.repassword"
          ></el-input
        ></el-form-item>
        <el-form-item prop="code">
          <el-input
            placeholder="请输入验证码"
            :prefix-icon="Message"
            v-model="registerModel.code"
          ></el-input
        ></el-form-item>
        <el-form-item>
          <!-- 引入并使用我们的验证码组件 -->
          <Captcha v-model:captchaValue="currentCaptcha" />
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space  @click="test">
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isLogin = true">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.login-page {
  height: 100vh;
  background-color: cornsilk;
  .bg {
    background-color: lightblue;
  }
  .login-page-left {
    position: relative;
    top: 10%;
    left: 27%;
    .title {
      position: relative;
      left: 12%;
    }
  }
  .notice {
    position: absolute;
    left: 14%;
    top: 80%;
    color: red;
    .word {
      position: relative;
      font-size: 15px;
      font-weight: bold;
      bottom: 2px;
      color: blue;
    }
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
      height: 30px;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
