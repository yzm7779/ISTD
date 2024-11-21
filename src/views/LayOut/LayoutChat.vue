<script setup>
import { ElImage, ElDrawer, ElMessage, ElDialog } from 'element-plus'
import { ChatDotRound, Delete } from '@element-plus/icons-vue'
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import LayoutInput from '@/views/LayOut/components/LayoutInput.vue'
import LeftBubble from '@/views/LayOut/components/LeftBubble.vue'
import RightBubble from '@/views/LayOut/components/RightBubble.vue'
import { useDataStore } from '@/stores/index.js'
import { useUserStore } from '@/stores/index.js'
import { useChatHistoryStore } from '@/stores/modules/chat.js'
import router from '@/router/index.js'

// onMounted(() => {
//   if (allMessage.value.length === 0) {
//     loading.value = false
//   }
// })

//处理加载特效
const loading = ref(false)
// 用于存储图片的 URL
const imageUrl = ref('')

// 选择图片的方法
const fileInput = ref(null)
const selectImg = () => {
  loading.value = true
  // 触发文件输入框点击事件
  fileInput.value.click()
  isShow.value = false
}
//新建对话功能
// 等待直到变量被赋值
const waitForValueChange = () => {
  return new Promise((resolve) => {
    // 使用 watch 监测 confirm
    watch(confirm, (newVal, oldVal) => {
      if (newVal === oldVal || newVal !== oldVal) {
        resolve()
      }
    })
  })
}
const newChat = async () => {
  if (dataStore.state.hasLogin === false) {
    dialogVisible.value = true
    return
  }
  isShow.value = true
  if (isHistoryChat.value === false && dataStore.state.hasLogin === true) {
    //判斷是新增的記錄還是在原有歷史記錄上新增內容
    userStore.addHistory(allMessage.value)
  }
  allMessage.value = []
  isHistoryChat.value = false
}
const cancelNewChat = () => {
  dialogVisible.value = false
}
const confirmNewChat = () => {
  dialogVisible.value = false
  isShow.value = true
}
const dialogVisible = ref(false)
const confirm = ref(null)
// 处理文件选择的变化
const handleFileChange = async (event) => {
  let temp = allMessage.value.length
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageUrl.value = e.target.result
      allMessage.value.push({
        id: divUserCount.value.toString() + 'picture',
        message: imageUrl.value
      })
      console.log(allMessage.value)
      divUserCount.value++
      loading.value = false
    }
    reader.readAsDataURL(file)
  }
}

//接受子组件的变量
const isShow = ref(true)
const handleInput = (newVal) => {
  isShow.value = false
}
//处理发送的内容
const handleSend = (inputMessage) => {
  inputValue.value = inputMessage
  allMessage.value.push({
    id: divUserCount.value.toString() + 'message',
    message: inputValue.value
  })
  divUserCount.value++
  console.log(allMessage.value)
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
//左侧弹窗中的列表
const chatHistoryStore = useChatHistoryStore()
const historyTest = computed(() => chatHistoryStore.chatHistoryList)

const historyId = ref(1)
const addNewHistory = () => {
  chatHistoryStore.chatHistoryList.push({
    id: historyId.value,
    name: '历史记录'
  })
  historyId.value++
}
// const toHistory = async (id) => {
//   await router.push(`/personalCenter/search/${id}`)
// }
//处理历史记录
const userStore = useUserStore()
const toHistory = (newVal, id) => {
  isHistoryChat.value = true
  isShow.value = false
  allMessage.value = newVal
  title.value = id
}

//侧边栏中的小删除图标
const deleteChatById = (itemId) => {
  console.log(userStore.allHistory)
  console.log('deleteChatById', itemId)
  chatDialogVisible.value = true
  itemToDelete.value = itemId
}
const itemToDelete = ref('')
const cancelDelete = () => {
  console.log('cancelDelete', itemToDelete)
  itemToDelete.value = ''
  chatDialogVisible.value = false
}
const confirmDelete = () => {
  console.log('confirmDelete', itemToDelete)
  userStore.deleteHistoryById(itemToDelete)
  itemToDelete.value = ''
  chatDialogVisible.value = false
  allMessage.value = []
  isShow.value = true
}

//控制左侧边栏是否显示
const sidebarVisible = ref(dataStore.state.hasLogin)
const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value
}
//判断当前聊天是否为历史记录
const isHistoryChat = ref(false)
const title = ref()
const chatDialogVisible = ref(false)
</script>

<template>
  <!--  左侧边栏-->
  <el-row>
    <el-col :span="sidebarVisible ? 4 : 0" class="sidebar">
      <div class="sidebar-content">
        <el-menu class="left-sidebar" default-active="1">
          <div class="left-drawer-button" @click="toFindDoctor">查找医生</div>
          <div class="left-drawer-button" @click="toDoctor">我的医生</div>
          <el-menu-item
            class="left-sidebar-item"
            v-for="item in userStore.allHistory"
            :key="item.id"
          >
            <div class="menu-item">
              <el-icon class="left-icon" size="15px"><ChatDotRound /></el-icon>
              <div class="name-item" @click="toHistory(item.chat, item.id)">
                {{ item.id }}
              </div>
              <el-icon
                class="left-icon"
                size="15px"
                @click="deleteChatById(item.id)"
                ><Delete
              /></el-icon>
            </div>
            <div class="dialog">
              <el-dialog
                title="温馨提示"
                v-model="chatDialogVisible"
                width="500"
                class="dialog-change"
                :show-close="false"
              >
                <span>是否确认删除历史记录?（删除后将无法恢复）</span>
                <template #footer>
                  <el-button @click="cancelDelete">取消</el-button>
                  <el-button type="primary" @click="confirmDelete"
                    >确认</el-button
                  >
                </template>
              </el-dialog>
            </div>
          </el-menu-item>
        </el-menu>
      </div>
    </el-col>
    <!--主内容页面 -->
    <el-col :span="sidebarVisible ? 20 : 24">
      <div
        class="toggle-button"
        @click="toggleSidebar"
        v-show="dataStore.state.hasLogin === true"
      >
        {{ sidebarVisible ? '<' : '>' }}
      </div>
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
        <!-- 文件输入框，隐藏在页面上 -->
        <input
          type="file"
          ref="fileInput"
          @change="handleFileChange"
          accept="image/*"
          style="display: none"
        />

        <!-- 这是发送内容以后展示的部分 -->
        <div class="chat-app" v-show="!isShow && allMessage.length !== 0">
          {{ title }}
          <el-scrollbar max-height="500px" v-loading="loading">
            <div v-for="item in allMessage" :key="item.id">
              <RightBubble :message="item" />
              <LeftBubble />
            </div>
          </el-scrollbar>
        </div>
        <div v-show="!isShow && allMessage.length === 0" class="temp-div">
          <el-icon class="temp-icon" size="200" color="gray"
            ><ChatDotRound
          /></el-icon>
          <div class="temp-content">添加图片或输入内容以开始聊天</div>
        </div>
        <div v-show="!isShow" class="chat-button">
          <el-button @click="selectImg">添加图片</el-button>
          <el-button type="primary" @click="newChat()">新建对话</el-button>
        </div>
        <!--        游客模式下的新增对话提示-->
        <el-dialog v-model="dialogVisible" title="提示">
          <span>游客模式下新增对话会覆盖当前对话，是否继续操作？</span>
          <template #footer>
            <el-button @click="cancelNewChat">取消</el-button>
            <el-button type="primary" @click="confirmNewChat">确定</el-button>
          </template>
        </el-dialog>

        <!-- 输入框 -->
        <LayoutInput
          @input="handleInput"
          @send="handleSend"
          :customStyle="{
            width: '60%',
            top: '360px',
            flex: '1',
            display: 'flex',
            height: '10px',
            marginTop: '40px'
          }"
        />
      </div>
    </el-col>
  </el-row>
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
    flex: 1;
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
  }
  .image-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
  }

  .chat-app {
    flex: 10;
    justify-content: center;
    align-items: center;
    height: 95%;
    width: 800px;
    margin-top: 0;
    margin-bottom: 5%;
    border-style: solid;
    border-width: 1.5px;
    border-radius: 5px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .chat-button {
    flex: 0.1;
    position: relative;
    bottom: 40px;
  }
}

.left-drawer {
  display: flex;
}
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
.el-menu--horizontal {
  --el-menu-horizontal-height: 40px;
}

.sidebar {
  //background-color: #f0f2f5;
  transition: width 0.3s;
  position: relative; /* 确保相对定位 */
  width: 200px;
  .sidebar-content {
    height: calc(100vh); /* 设置高度，减去其他元素，如header的高度 */
    overflow-y: auto; /* 开启垂直滚动条 */
    .left-sidebar {
      height: 100vh;
      .left-sidebar-item {
        justify-content: center;
        .left-icon {
          top: 12px;
          margin-right: 8px;
          margin-left: 8px;
        }
        .menu-item {
          border-style: solid;
          border-width: 1.5px;
          border-radius: 4px;
          border-color: gray;
          display: flex;
          height: 40px;
          padding-left: 10px;
          padding-right: 10px;
          .name-item {
            display: flex;
            text-align: center;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
  /* 自定义滚动条 */
  .sidebar-content::-webkit-scrollbar {
    width: 4px; /* 调整滚动条的宽度 */
  }

  .sidebar-content::-webkit-scrollbar-track {
    background: #f0f2f5; /* 滚动条背景 */
    border-radius: 10px; /* 圆角效果 */
  }

  .sidebar-content::-webkit-scrollbar-thumb {
    background: lightgray; /* 滚动条的颜色 */
    border-radius: 10px; /* 圆角效果 */
    height: 8px;
  }

  .sidebar-content::-webkit-scrollbar-thumb:hover {
    background: gray; /* 鼠标悬停时的颜色 */
  }
}
.toggle-button {
  position: absolute;
  top: 50%;
  left: -20px; /* 调整按钮位置 */
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: gray;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding-left: 5px;
}
.temp-div {
  height: 70vh;
  display: grid;
  grid-template-rows: auto auto; /* 两行 */
  place-items: center; /* 横向和垂直都居中 */
  .temp-icon {
    height: 70vh;
    flex: 6;
  }
  .temp-content {
    flex: 1;
    font-size: 20px;
    color: gray;
  }
}
</style>
<style lang="scss">
.dialog-change {
  padding: 0;
  border-radius: 5px;
  .el-dialog__header {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: cornflowerblue;
    justify-items: center;
    align-items: center;
    .el-dialog__title {
      padding-left: 10px;
      font-size: 18px;
      color: white;
    }
  }
  .el-dialog__body {
    text-align: center;
    font-size: 18px;
  }
  .el-dialog__footer {
    padding-top: 2px;
  }
}
</style>
