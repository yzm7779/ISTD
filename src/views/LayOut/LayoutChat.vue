<script setup>
import { ElImage, ElDrawer, ElMessage } from 'element-plus'
import { ref, computed, onMounted } from 'vue'
import LayoutInput from '@/views/LayOut/components/LayoutInput.vue'
import LeftBubble from '@/components/LeftBubble.vue'
import RightBubble from '@/components/RightBubble.vue'
import { useDataStore } from '@/stores/index.js'
import { useUserStore } from '@/stores/index.js'
import { useChatHistoryStore } from '@/stores/modules/chat.js'
import router from '@/router/index.js'
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
const newChat = () => {
  if (dataStore.state.hasLogin === false) {
    isShow.value = true
    allMessage.value = []
    return
  }
  isShow.value = true
  userStore.addHistory(allMessage.value)
  allMessage.value = []
}

// 处理文件选择的变化
const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageUrl.value = e.target.result
      allMessage.value.push({ id: divUserCount, imageurl: imageUrl.value })
      divUserCount.value++
      loading.value = false
    }
    reader.readAsDataURL(file)
  }
}

//接受子组件的变量
const isShow = ref(true)
// const handleInput = (newVal) => {
//   isShow.value = !newVal
// }
// //处理发送的内容
// const handleSend = (inputMessage) => {
//   inputValue.value = inputMessage
//   if (inputValue.value.trim()) {
//     allMessage.value.push({ type: 'User', content: inputValue.value })
//     divUserCount.value++
//
//     if (divUserCount.value === 3) {
//       allMessage.value.push({ type: 'AI', content: inputValue.value })
//       allMessage.value.push({ type: 'AI', content: inputValue.value })
//       divUserCount.value = 0
//     }
//   }
// }
// const inputValue = ref('')

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
const toHistory = (newVal) => {
  isShow.value = false
  allMessage.value = newVal
}
//控制左侧边栏是否显示
const sidebarVisible = ref(true)
const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value
}
</script>

<template>
  <!--  左侧边栏-->
  <el-row>
    <el-col :span="sidebarVisible ? 4 : 0" class="sidebar">
      <div class="sidebar-content">
        <el-menu class="left-sidebar" default-active="1">
          <el-menu-item
            v-for="item in userStore.allHistory"
            :key="item.id"
            @click="toHistory(item.chat)"
          >
            <div class="menu-item">
              <div class="name-item">历史记录{{ item.id }}</div>
            </div>
          </el-menu-item>
        </el-menu>
      </div>

    </el-col>
    <!--主内容页面 -->
    <el-col :span="sidebarVisible ? 20 : 24">
      <div class="toggle-button" @click="toggleSidebar">
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
        <!--    &lt;!&ndash; 显示已选择的图片 &ndash;&gt;-->
        <!--    <div v-if="imageUrl" class="image-preview" v-show="isShow">-->
        <!--      <img :src="imageUrl" alt="选中的图片" />-->
        <!--    </div>-->

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
          <el-scrollbar max-height="400px" v-loading="loading">
            <div v-for="item in allMessage" :key="item.id">
              <RightBubble :message="item.imageurl" />
              <LeftBubble />
            </div>

            <!--        <div v-for="item in allMessage" :key="item.type">-->
            <!--          <div v-if="item.type === 'User'">-->
            <!--            <RightBubble :message="item.content" />-->
            <!--          </div>-->
            <!--          <div v-if="item.type === 'AI'">-->
            <!--            <LeftBubble :messageLeft="item.content" />-->
            <!--          </div>-->
            <!--        </div>-->
          </el-scrollbar>
        </div>
        <div v-show="!isShow" class="chat-button">
          <el-button @click="selectImg">添加图片</el-button>
          <el-button type="primary" @click="newChat">新建对话</el-button>
        </div>

        <!--    &lt;!&ndash; 输入框 &ndash;&gt;-->
        <!--    <LayoutInput-->
        <!--      @input="handleInput"-->
        <!--      @send="handleSend"-->
        <!--      :customStyle="{-->
        <!--        width: '60%',-->
        <!--        top: '360px',-->
        <!--        flex: '2',-->
        <!--        display: 'flex',-->
        <!--        height: '10px',-->
        <!--        marginTop: '40px'-->
        <!--      }"-->
        <!--    />-->
      </div>
    </el-col>
  </el-row>
  <!--  <el-drawer-->
  <!--    v-model="isShowDrawer"-->
  <!--    title="历史记录"-->
  <!--    direction="ltr"-->
  <!--    size="250px"-->
  <!--    :show-close="false"-->
  <!--    class="left-drawer"-->
  <!--  >-->
  <!--    &lt;!&ndash;      <div class="left-drawer-button" @click="toFindDoctor">查找医生</div>&ndash;&gt;-->
  <!--    &lt;!&ndash;      <div class="left-drawer-button" @click="toDoctor">我的医生</div>&ndash;&gt;-->
  <!--    &lt;!&ndash;      <div class="left-drawer-button" @click="addNewHistory">新增聊天记录</div>&ndash;&gt;-->
  <!--    <el-menu>-->
  <!--      <el-menu-item-->
  <!--        v-for="item in userStore.allHistory"-->
  <!--        :key="item.id"-->
  <!--        @click="toHistory(item.chat)"-->
  <!--      >-->
  <!--        <div class="menu-item">-->
  <!--          <div class="name-item">历史记录{{item.id }}</div>-->
  <!--        </div>-->
  <!--      </el-menu-item>-->
  <!--    </el-menu>-->
  <!--  </el-drawer>-->
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
    flex: 9;
    justify-content: center;
    align-items: center;
    height: 95%;
    width: 800px;
    margin-top: 0;
    margin-bottom: 5%;
  }
  .chat-button {
    position: relative;
    bottom: 40px;
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
}
.el-menu--horizontal {
  --el-menu-horizontal-height: 40px;
}

.sidebar {
  //background-color: #f0f2f5;
  transition: width 0.3s;
  position: relative; /* 确保相对定位 */
  .sidebar-content {
    height: calc(100vh); /* 设置高度，减去其他元素，如header的高度 */
    overflow-y: auto; /* 开启垂直滚动条 */
    .left-sidebar {
      height: 100vh;
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
</style>
