<script setup>
import { Search } from '@element-plus/icons-vue'
import { defineProps, defineEmits, ref } from 'vue'
const props = defineProps({
  content: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['partnerSelect'])
const selectId = (id) => {
  emit('partnerSelect', id)
}
</script>

<template>
  <div class="right-container">
    <el-input placeholder="搜索" :prefix-icon="Search"></el-input>
    <el-menu>
      <el-menu-item
        v-for="item in content"
        :key="item.id"
        @click="selectId(item.id)"
      >
        <div class="menu-item">
          <div>
            <img
              src="https://i.postimg.cc/7Z3gDBxj/1734672413.jpg"
              class="pic"
            />
          </div>
          <div class="name-item">{{ item.name }}</div>
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.main-content {
  background-color: orange;
}
.right-container {
  background-color: lightcoral;
  height: 102.3%;
  width: 200px;
  position: absolute;
  right: 0;
  top: 80px;
  .menu-item {
    display: flex;
    width: 100%;
    background-color: lightblue;
    border-style: solid;
    margin: -20px;
    padding-right: 40px;
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
