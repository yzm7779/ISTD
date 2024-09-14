<script setup>
import { ref } from 'vue'
import router from '@/router/index.js'

const registerType = ref('doctor')
const toLogin = async () => {
  await router.push('/login')
}

</script>

<template>
  <div class="content-section">
    <div class="inf">昵称：未知</div>
    <div class="inf">性别：未知</div>
    <div class="inf">年龄：未知</div>
    <div class="inf">电话号码：未知</div>
    <div class="inf">邮箱：未知</div>
    <div class="inf" v-if="registerType === 'doctor'">医师证：未知</div>
    <div class="inf" v-if="registerType === 'doctor'">擅长领域：未知</div>
    <el-button size="large" type="primary">完善个人信息</el-button>
    <el-button size="large" type="danger" class="btn" @click="toLogin">点击退出登陆</el-button>
    <el-button size="large" type="success" class="btn" >修改个人信息</el-button>
  </div>
</template>

<style scoped lang="scss">
.content-section {
  display: grid;
  justify-content: center;
  align-items: center;
  .inf {
    margin: 4px 0;
  }
  .btn {
    width: 100%;
    position: relative;
    right: 12px;
  }
}
</style>
