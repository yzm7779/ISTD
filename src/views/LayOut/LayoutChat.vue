<script setup>
import { ElImage, ElDrawer } from 'element-plus'
import { ref, computed } from 'vue'
import LayoutInput from '@/views/LayOut/components/LayoutInput.vue'
import LeftBubble from '@/components/LeftBubble.vue'
import RightBubble from '@/components/RightBubble.vue'
import { useDataStore } from '@/stores/index.js'
import router from '@/router/index.js'

// 用于存储图片的 URL
const imageUrl = ref('')

// 选择图片的方法
const fileInput = ref(null)
const selectImg = () => {
  // 触发文件输入框点击事件
  fileInput.value.click()
}
// 处理文件选择的变化
const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    // 创建图片的 URL 以便显示预览
    imageUrl.value = URL.createObjectURL(file)
    console.log(imageUrl.value)
  }
}

//接受子组件的变量
const isShow = ref(true)
const handleInput = (newVal) => {
  isShow.value = !newVal
}
//处理发送的内容
const handleSend = (inputMessage) => {
  inputValue.value = inputMessage
  if (inputValue.value.trim()) {
    allMessage.value.push({ type: 'User', content: inputValue.value })
    divUserCount.value++

    if (divUserCount.value === 3) {
      allMessage.value.push({ type: 'AI', content: inputValue.value })
      allMessage.value.push({ type: 'AI', content: inputValue.value })
      divUserCount.value = 0
    }
  }
}
const inputValue = ref('')

//存放所有聊天数据
const allMessage = ref([])
const divUserCount = ref(0)

//控制左侧弹窗的变量
const dataStore = useDataStore()
const isShowDrawer = computed(() => dataStore.sharedData)

const toDoctor = async () => {
  await router.push('/personalCenter/partner')
}
const toFindDoctor = async () => {
  await router.push('/doctorfind')
}

const historyTest = ref([
  { id: 1, name: '历史记录' },
  { id: 2, name: '历史记录' },
  { id: 3, name: '历史记录' },
  { id: 4, name: '历史记录' },
  { id: 5, name: '历史记录' }
])
const historyId = ref(6)
const addNewHistory = () => {
  const newHistory = ref({ id: historyId.value, name: '历史记录' })
  historyTest.value.push(newHistory.value)
  historyId.value++
}
</script>

<template>
  <div class="container">
    <!-- 这是默认展示的部分 -->
    <div class="image-wrapper" v-show="isShow">
      <el-image
        src="https://i.postimg.cc/7Z3gDBxj/1734672413.jpg"
        alt="Placeholder Image"
        fit="contain"
      />
    </div>
    <div class="text-wrapper" v-show="isShow">
      <p>Health is Wealth</p>
    </div>
    <div class="content" v-show="isShow">
      <el-button @click="selectImg" class="pic">
        <p class="word">上传图片</p>
      </el-button>
    </div>
    <!-- 显示已选择的图片 -->
    <div v-if="imageUrl" class="image-preview" v-show="isShow">
      <img :src="imageUrl" alt="选中的图片" />
    </div>

    <!-- 文件输入框，隐藏在页面上 -->
    <input
      type="file"
      ref="fileInput"
      @change="handleFileChange"
      accept="image/*"
      style="display: none"
    />

    <!-- 这是发送内容以后展示的部分 -->
    <div class="chat-app" v-show="!isShow">
      <el-scrollbar max-height="400px">
        <div v-for="item in allMessage" :key="item.type">
          <div v-if="item.type === 'User'">
            <RightBubble :message="item.content" />
          </div>
          <div v-if="item.type === 'AI'">
            <LeftBubble :messageLeft="item.content" />
          </div>
        </div>
      </el-scrollbar>
    </div>

    <!-- 输入框 -->
    <LayoutInput
      @input="handleInput"
      @send="handleSend"
      :customStyle="{
        width: '60%',
        top: '360px',
        flex: '2',
        display: 'flex',
        height: '10px',
        marginTop: '40px'
      }"
    />

    <el-drawer
      v-model="isShowDrawer"
      title="功能栏"
      direction="ltr"
      size="250px"
      :show-close="false"
      :with-header="false"
      class="left-drawer"
    >
      <div class="left-drawer-button" @click="toFindDoctor">查找医生</div>
      <div class="left-drawer-button" @click="toDoctor">我的医生</div>
      <div class="left-drawer-button" @click="addNewHistory">新增聊天记录</div>
      <el-menu>
        <el-menu-item v-for="item in historyTest" :key="item.id">
          <div class="menu-item">
            <div class="name-item">{{ item.name + item.id }}</div>
          </div>
        </el-menu-item>
      </el-menu>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: cornsilk;
  .image-wrapper {
    flex: 3;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
  }
  .content {
    flex: 2;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    .pic {
      width: 150px;
      height: 100px;
      border-radius: 10px;
      border: solid 2px;
      .word {
        font-size: 20px;
      }
    }
  }
  .text-wrapper {
    flex: 1;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image-preview {
    width: 100px;
    height: 100px;
    position: relative;
    top: 40px;
    right: 318px;
    background-color: indianred;
  }
  .image-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
  }

  .chat-app {
    flex: 8;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 800px;
    margin-top: 0px;
    background-color: indianred;
  }
}

.left-drawer {
  display: flex;
  .left-drawer-button {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 40px;
    border-style: dashed;
    border-width: 1px;
    border-radius: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-color: gray;
    font-size: 15px;
  }
  .menu-item {
    display: flex;
    height: 40px;
    .name-item {
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
    }
  }
}
.el-menu--horizontal {
  --el-menu-horizontal-height: 40px;
}
</style>
