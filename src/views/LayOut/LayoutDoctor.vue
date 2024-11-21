<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref, reactive, toRefs, computed } from 'vue'
import ToHomepage from '@/components/ToHomepage.vue'
import { useUserStore } from '@/stores/index.js'
import router from '@/router/index.js'
import LayoutSearch from '@/views/LayOut/components/LayoutSearch.vue'

const userStore = useUserStore()
const test1 = ref([
  { id: 1, name: '医生1', areas: '胸膜疾病' },
  { id: 2, name: '医生2', areas: '纵膈疾病' },
  { id: 3, name: '医生3', areas: '胸腔积液' },
  { id: 4, name: '医生4', areas: '气胸' },
  { id: 5, name: '医生5', areas: '肺癌' },
  { id: 6, name: '医生6', areas: '食管疾病' },
  { id: 7, name: '医生7', areas: '胸壁疾病' },
  { id: 8, name: '医生8', areas: '胸部外伤' }
])
const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})
const { circleUrl } = toRefs(state)

const addDoctor = async (doctor) => {
  userStore.addDoctor(doctor.name)
  const tempId = computed(
    () => userStore.allDoctor[userStore.allDoctor.length - 1].id
  )
  const id = tempId.value
  await router.push(`/personalCenter/partner/${id}`)
}
</script>

<template>
  <LayoutSearch placeholder="请输入医生姓名/疾病症状等内容" />
  <ToHomepage />
  <div class="doctor-background">
    <div class="doctor-list">
      <h2>名医推荐</h2>
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in test1" :key="item.id">
          <div class="doctor-member">
            <el-avatar size="10px" :src="circleUrl" class="doctor-avatar" />
            <div class="doctor-content">
              <div class="doctor-name">姓名：{{ item.name }}</div>
              <div class="doctor-field">擅长领域：{{ item.areas }}</div>
              <el-button class="doctor-button" @click="addDoctor(item)"
                >点击开始聊天</el-button
              >
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>

  <!--  <br />-->
  <!--  <hr />-->
  <!--  <br />-->

  <!--  <div class="doctor-background">-->
  <!--    <div class="doctor-list">-->
  <!--      <h2>常用医生</h2>-->
  <!--      <el-row :gutter="20">-->
  <!--        <el-col :span="8" v-for="item in test1" :key="item.id">-->
  <!--          <div class="doctor-member">{{ item.name }}</div>-->
  <!--        </el-col>-->
  <!--      </el-row>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<style scoped lang="scss">
.doctor-list {
  width: 80%;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-left: 10%;
  .doctor-member {
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    background-color: white;
    height: 120px;
    margin-top: 10px;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: center;
    .doctor-avatar {
      flex: 1.2;
      width: 100px;
      height: 100px;
      margin-left: 10px;
      margin-right: 10px;
    }
    .doctor-content {
      flex: 3;
      width: 200px;
      height: 100%;
      background-color: lightblue;
      .doctor-name {
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 10px;
      }
      .doctor-field {
        padding-left: 10px;
        color: gray;
      }
      .doctor-button {
        margin-top: 20px;
        margin-left: 60px;
      }
    }
  }
}
.doctor-background {
  display: flex;
  width: 100%;
  background-color: lightgoldenrodyellow;
  padding-top: 20px;
  padding-bottom: 20px;
}
.doctor-member:hover {
  transform: scale(1.05);
}
</style>
