<script setup>
import { Search } from '@element-plus/icons-vue'
import { defineProps, defineEmits, ref, reactive, toRefs } from 'vue'
const props = defineProps({
  content: {
    type: Array,
    required: true
  }
})
const state = reactive({
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
})

const { squareUrl } = toRefs(state)
const emit = defineEmits(['partnerSelect', 'historySelect'])
const selectId = (id) => {
  emit('partnerSelect', id)
  emit('historySelect', id)
}
</script>

<template>
  <div class="right-container">
    <el-input placeholder="搜索" :prefix-icon="Search"></el-input>
    <el-scrollbar height="95vh">
      <el-menu>
        <el-menu-item
          v-for="item in content"
          :key="item.id"
          @click="selectId(item.id)"
          class="menu-item"
        >
          <div>
            <div>
              <el-avatar :src="squareUrl" class="pic" alt="" />
            </div>
            <div class="chat-item">
              <div class="chat-name">
                <div style="font-size: 20px">{{ item.doctor }}</div>
                <div style="margin-left: 40px">2024/10/23</div>
              </div>
              <div class="chat-content">这是聊天记录哈哈哈哈哈哈....</div>
            </div>
          </div>
        </el-menu-item>
      </el-menu></el-scrollbar
    >
  </div>
</template>

<style scoped lang="scss">
.right-container {
  background-color: white;
  height: 102.3%;
  width: 250px;
  position: absolute;
  right: 0;
  top: 80px;
  .menu-item {
    display: flex;
    width: 100%;
    height: 70px;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    padding-right: 40px;
    margin-top: 2px;
    text-align: center;
    justify-content: center;
    align-items: center;
    background-color: #e2e2e2;
    .pic {
      width: 60px;
      height: 60px;
      position: absolute;
      right: 180px;
      top: 5px;
      left: 5px;
      border-radius: 5px;
    }
    .chat-item {
      text-align: left;
      position: absolute;
      left: 70px;
      height: 70px;
      width: 180px;
      top: 0;
      .chat-name {
        position: absolute;
        top: -10px;
        display: flex;
        width: 180px;
        height: 30px;
      }
      .chat-content {
        flex-grow: 1;
        text-align: left;
        position: absolute;
        top: 18px;
        color: gray;
        font-size: 12px;
      }
    }
  }
}
</style>
