<template>
  <LayoutSearch placeholder="请输入想要查询的文章/作者/日期/..." />
  <ToHomepage />
  <div style="background-color: lightgoldenrodyellow; justify-items: center">
    <el-container class="layout-container-demo">
      <el-main>
        <el-table
          :data="currentPageArray"
          class="layout-table"
          @row-click="handleRowClick"
        >
          <el-table-column prop="id" label="编号" width="80" sortable />
          <el-table-column prop="date" label="日期" width="140" sortable />
          <el-table-column prop="name" label="作者" width="120" />
          <el-table-column prop="key" label="关键字" width="120" />
          <el-table-column
            prop="abstract"
            label="文章简介"
            :formatter="formatter"
          />
          <el-table-column prop="operate" label="常用操作" width="240">
            <template #default>
              <el-button type="primary">
                收藏<el-icon size="15px" style="margin-left: 5px">
                  <StarFilled />
                </el-icon>
              </el-button>
              <el-button type="warning">
                转发<el-icon size="15px" style="margin-left: 5px">
                  <Share />
                </el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer class="layout-footer">
        <div class="demo-pagination-block">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15, 20]"
            :size="size"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { StarFilled, Share } from '@element-plus/icons-vue'
import LayoutSearch from '@/views/LayOut/components/LayoutSearch.vue'
import ToHomepage from '@/components/ToHomepage.vue'
import {
  ElTable,
  ElTableColumn,
  ElPagination,
  ElIcon,
  ElButton
} from 'element-plus'
import router from '@/router/index.js'

// 处理行点击事件
const handleRowClick = async (row) => {
  await router.push(`/article/${row.id}`)
  // console.log(typeof row)
  // console.log(row.id)
  // console.log(typeof row)
  // console.log(row)
  // console.log(newArray.map((item) => typeof item.id))
  // console.log(currentPageArray.value.map((item) => typeof item.id))
}

// 表格中渲染所用数据
const formatter = (row) => {
  return row.abstract
}

// 获得较长的测试数组
const generateExtendedArray = (data, length) => {
  const extendedArray = []
  for (let i = 0; i < length; i++) {
    // 使用取余数的方式来循环填充原数组的元素
    const item = { ...data[i % data.length] }
    //编号线性增加
    item.id = (i + 1).toString()
    extendedArray.push(item)
  }
  return extendedArray
}

// 表格数据
const tableData = [
  {
    id: '1',
    date: '2016-05-02',
    name: '张三医生',
    key: '胸膜疾病',
    abstract:
      '胸膜疾病是指影响胸膜的一系列病理状态，胸膜是覆盖在肺部表面和胸腔内壁的薄膜......'
  },
  {
    id: '2',
    date: '2016-05-03',
    name: '李四医生',
    key: '纵膈疾病',
    abstract:
      '纵膈疾病是指影响胸膜的一系列病理状态，胸膜是覆盖在肺部表面和胸腔内壁的薄膜......'
  },
  {
    id: '3',
    date: '2016-05-04',
    name: '王五医生',
    key: '胸腔积液',
    abstract:
      '胸腔积液是指影响胸膜的一系列病理状态，胸膜是覆盖在肺部表面和胸腔内壁的薄膜......'
  },
  {
    id: '4',
    date: '2016-05-05',
    name: '赵六医生',
    key: '气胸',
    abstract:
      '气胸是指影响胸膜的一系列病理状态，胸膜是覆盖在肺部表面和胸腔内壁的薄膜......'
  }
]

const newArray = generateExtendedArray(tableData, 105)

//获得当前页的数组
const currentPageArray = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return newArray.slice(start, end)
})

//分页条所用数据
const background = ref(false)
const disabled = ref(false)
const size = ref('default')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(newArray.length)

// 处理页码改变事件
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
}

// 处理每页显示条数改变事件
const handleSizeChange = (newSize) => {
  pageSize.value = newSize
}
</script>

<style scoped lang="scss">
.layout-footer {
  justify-items: center;
  margin-top: 25px;
}
.layout-container-demo {
  height: auto;
  width: 85%;
  margin-bottom: 10px;
  .layout-table {
    margin-top: 20px;
    border-style: solid;
    border-width: 1px;
    border-radius: 4px;
    overflow-x: hidden;
  }
}
.layout-container-demo .el-header {
  position: relative;
  //background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
/* 修改垂直滚动条的粗细 */
.el-scrollbar__bar.is-vertical {
  width: 5px; /* 你可以根据需要设置具体的宽度 */
}
.demo-pagination-block {
  display: flex;
}
</style>
