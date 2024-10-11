<script setup>
import { Search } from '@element-plus/icons-vue'
import { defineProps, defineEmits, ref } from 'vue'
const props = defineProps({
  content: {
    type: Array,
    required: true
  }
})

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
              <img
                src="https://i.postimg.cc/7Z3gDBxj/1734672413.jpg"
                class="pic"
              />
            </div>
            <div class="name-item">{{ item.name + item.id }}</div>
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
  width: 200px;
  position: absolute;
  right: 0;
  top: 80px;
  .menu-item {
    display: flex;
    width: 100%;
    border-style: dashed;
    border-width: 1px;
    border-radius: 2px;
    padding-right: 40px;
    margin-top: 2px;
    text-align: center;
    justify-content: center;
    align-items: center;
    .pic {
      width: 30%;
      position: absolute;
      right: 70%;
      border-radius: 5px;
    }
    .name-item {
      position: relative;
      left: 60%;
    }
  }
}
</style>
