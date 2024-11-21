<script setup>
import { ref, computed, onMounted } from 'vue'
import router from '@/router/index.js'
import { useDataStore, useUserStore } from '@/stores/index.js'
import { ElMessage } from 'element-plus'
import { Back } from '@element-plus/icons-vue'
import ToHomepage from '@/components/ToHomepage.vue'
import RightBubble from '@/views/LayOut/components/RightBubble.vue'

onMounted(() => {
  console.log(registerType.value)
  console.log(userInformation.value)
})
const registerType = computed(() => userStore.registerType)
const userData = useDataStore()
const userStore = useUserStore()
const toLogin = async () => {
  await userData.setHasLogin()
  userStore.deleteHistory()
  ElMessage.success('退出登录成功')
  await router.push('/homepage')
}
const isEditing = ref(true)
const changeEditing = () => {
  isEditing.value = !isEditing.value
}
// 计算属性，判断是否有验证错误
const hasValidationError = computed(() => {
  return form.value
    ? form.value.fields.some((field) => field.validateState === 'error')
    : false
})
const form = ref()
const userInformation = computed(() => userStore.registerModel)
const informationRule = {
  tel: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号码',
      trigger: 'blur'
    }
  ],
  certificate: [
    { required: true, message: '请输入医师证', trigger: 'blur' },
    { pattern: /^\d{15}$/, message: '医师证必须是15位数字', trigger: 'blur' }
  ],
  nickname: [
    { required: 'true', message: '请输入昵称', trigger: 'blur' }
    // {
    //   validator: (rule, value, callback) => {
    //     // 检查是否是4-12位的字母或数字
    //     if (/^[a-zA-Z0-9]{4,12}$/.test(value)) {
    //       return callback() // 合格
    //     }
    //     // 检查是否是2-3位汉字
    //     if (/^[\u4e00-\u9fa5]{2,3}$/.test(value)) {
    //       return callback() // 合格
    //     }
    //     callback(new Error('昵称应为4到12个字母或数字，或2到3个汉字'))
    //   },
    //   trigger: 'blur'
    // }
  ],
  gender: [
    { required: 'true', message: '请输入性别', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === '男' || value === '女') {
          callback()
        } else {
          callback(new Error('性别只能是“男”或“女”'))
        }
      },
      trigger: 'blur'
    }
  ],
  age: [
    { required: 'true', message: '请输入年龄', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        // 非空检查
        if (!value) {
          return callback(new Error('请输入年龄'))
        }
        // 使用正则表达式检查是否是有效的整数（0-120）
        const regex = /^(0|[1-9][0-9]?|1[01][0-9]|120)$/ // 0到120的正则表达式
        if (!regex.test(value)) {
          return callback(new Error('年龄必须在 0 到 120 之间'))
        }
        // 如果通过验证，调用callback
        callback()
      },
      trigger: 'blur'
    }
  ],
  email: [
    { required: 'true', message: '请输入电子邮箱', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: '邮箱格式不正确',
      trigger: 'blur'
    }
  ]
}
const profile = ref('修改个人信息请点击按钮')
</script>

<template>
  <el-row class="user-info-container">
    <el-col :span="12">
      <ToHomepage />
      <el-form
        class="content-section"
        :model="userInformation"
        :rules="informationRule"
        ref="form"
      >
        <el-form-item label="昵称：" prop="nickname">
          <el-input
            :disabled="isEditing"
            placeholder="请输入昵称"
            v-model="userInformation.name"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="gender">
          <el-input
            :disabled="isEditing"
            placeholder="请输入性别"
            v-model="userInformation.gender"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="年龄：" prop="age">
          <el-input
            :disabled="isEditing"
            placeholder="请输入年龄"
            v-model="userInformation.age"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="电话号码：" prop="tel">
          <el-input
            disabled
            placeholder="请输入电话号码"
            v-model="userInformation.phone"
          >
            >
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input
            :disabled="isEditing"
            placeholder="请输入邮箱"
            v-model="userInformation.email"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="医师证号："
          v-show="registerType === 'doctor'"
          prop="certificate"
        >
          <el-input
            :disabled="isEditing"
            placeholder="请输入医师证号码"
            v-model="userInformation.certificate"
          >
            >
          </el-input>
        </el-form-item>
        <el-button
          size="large"
          type="primary"
          @click="changeEditing"
          :disabled="hasValidationError"
        >
          {{ !isEditing ? '完成修改' : '修改个人信息' }}
        </el-button>
        <el-button size="large" type="danger" class="btn" @click="toLogin"
          >点击退出登陆</el-button
        >
      </el-form>
    </el-col>
    <div class="divider" />
    <el-col :span="8" :offset="2" class="personal-container">
      <div class="profile">
        <div class="header">
          <h1>个人简介</h1>
          <el-button
            type="default"
            @click="changeEditing"
            :disabled="hasValidationError"
          >
            {{ !isEditing ? '保存修改内容' : '修改个人简介' }}
          </el-button>
        </div>
        <div v-if="isEditing">
          <p>{{ profile }}</p>
        </div>
        <el-input
          v-else
          v-model="profile"
          placeholder="请输入个人简介"
          rows="4"
          type="textarea"
        ></el-input>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.user-info-container {
  display: flex;

  .content-section {
    display: grid;
    justify-content: center;
    align-items: center;
    text-align: left;
    margin-top: 20vh;
    .inf {
      margin: 4px 0;
    }
    .btn {
      width: 100%;
      position: relative;
      right: 12px;
    }
  }
  .divider {
    width: 1px; /* 分界线的宽度 */
    background-color: lightblue; /* 分界线的颜色 */
    margin: 0 10px; /* 分界线与内容之间的间距 */
    height: 90vh;
  }
  .personal-container {
    .personal-title {
      margin-top: 10vh;
    }
    .personal-content {
      margin-top: 5vh;
    }
  }
}
.profile {
  max-width: 600px;
  margin: 10vh auto;
  padding: 20px;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  .header {
    display: flex;
    justify-content: space-between; /* 使标题和按钮之间的空间均匀 */
    align-items: center; /* 垂直居中对齐 */
    margin-bottom: 20px; /* 标题与内容之间的间距 */
  }
}
</style>
