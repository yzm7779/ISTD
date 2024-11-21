<template>
  <div class="article-container">
    <el-header>
      <div class="article-title">{{ article.title }}</div>
      <div class="author-info">
        <div style="margin-right: 5px">作者：{{ article.author }}</div>
        <div style="margin-left: 5px">创作时间：{{ article.date }}</div>
      </div>
    </el-header>
    <el-container>
      <div class="article-content" v-if="article">{{ article.content }}</div>
      <div class="article-content" v-else>文章详情加载中或文章不存在</div>
    </el-container>
    <el-footer>
      <div class="article-icon">
        <div class="icon-single">
          点赞<el-icon style="top: 2px"><Medal /></el-icon>
          <div>{{ thumbsCnt }}</div>
        </div>
        <div class="icon-single">
          收藏<el-icon style="top: 2px"><StarFilled /></el-icon>
          <div>{{ collectCnt }}</div>
        </div>
        <div class="icon-single">
          转发<el-icon style="top: 2px"><Share /></el-icon>
          <div>{{ shareCnt }}</div>
        </div>
      </div>
    </el-footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { StarFilled, Share, Medal } from '@element-plus/icons-vue'
import axios from 'axios'
console.log('mounted')
// 获取文章详情的函数
// const getArticleDetails = (id) => {
//   axios
//     .get(`/api/articles/${id}`)
//     .then((response) => {
//       article.value = response.data
//     })
//     .catch((error) => {
//       console.error('获取文章详情失败:', error)
//       article.value = null
//     })
// }

// 当组件被挂载时，获取文章详情
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
//临时数据
const articleDetails = ref([
  {
    id: '1',
    title: '胸膜疾病概述',
    content: `
      胸膜疾病是指影响胸膜的一系列病理状态，胸膜是覆盖在肺部表面和胸腔内壁的薄膜。这种状况可能会导致呼吸困难、胸痛等症状。在我们的文章中，我们将详细探讨胸膜疾病的不同类型、症状、诊断方法以及治疗方案。
      ...
    `,
    date: '2016-05-02',
    author: '张三医生',
    keywords: '胸膜疾病, 病理状态, 呼吸困难',
    abstract:
      '胸膜疾病是指影响胸膜的一系列病理状态，胸膜是覆盖在肺部表面和胸腔内壁的薄膜......'
  },
  {
    id: '2',
    title: '纵膈疾病概述',
    content: `
      纵膈疾病是指影响纵膈区域的一系列病理状态，纵膈是位于胸腔中央，分隔左右肺部的区域。这种状况可能会引起多种症状，包括胸痛、咳嗽等。在这篇文章中，我们将详细介绍纵膈疾病的诊断、治疗和预防措施。
      ...
    `,
    date: '2016-05-03',
    author: '李四医生',
    keywords: '纵膈疾病, 胸痛, 咳嗽',
    abstract:
      '纵膈疾病是指影响胸膜的一系列病理状态，胸膜是覆盖在肺部表面和胸腔内壁的薄膜......'
  },
  {
    id: '3',
    title: '胸腔积液概述',
    content: `
      胸腔积液，也称为胸水，是指在胸腔内积聚过多的液体。这种情况可能是由多种原因引起的，包括心脏病、肺部感染等。在这篇文章中，我们将探讨胸腔积液的原因、症状、诊断和治疗方法。
      ...
    `,
    date: '2016-05-04',
    author: '王五医生',
    keywords: '胸腔积液, 胸水, 胸腔内积聚',
    abstract:
      '胸腔积液是指影响胸膜的一系列病理状态，胸膜是覆盖在肺部表面和胸腔内壁的薄膜......'
  },
  {
    id: '4',
    title: '气胸概述',
    content: `
      气胸是指空气在胸膜腔内积聚，导致肺部部分或完全塌陷的状况。这种情况可能突然发生，引起剧烈胸痛和呼吸困难。本文将详细讨论气胸的症状、诊断、治疗和预防措施。
      气胸是指气体进入胸膜腔，造成的积气状态，通常由胸部损伤、肺部疾病、机械通气等因素引发。主要症状包括胸痛和呼吸困难，男性患者多于女性，多数预后良好。
      气胸可以分为自发性、外伤性和医源性三类，其中自发性气胸又细分为继发性自发性气胸和特发性自发性气胸。继发性自发性气胸多由肺部疾病引起，如肺气肿气肿泡破裂、肺结核等，而特发性自发性气胸没有明显的原因及诱因。
      气胸的治疗目的是促进患侧肺复张、消除病因及减少复发。治疗方法包括保守治疗、排气疗法、防止复发措施、手术疗法及防治并发症等。对于症状轻微的原发性或继发性气胸可以采取保守治疗，包括卧床休息、氧疗以及酌情镇痛、镇静、止咳、通便等。对于多次复发性气胸或危及生命的气胸，通常需要手术处理。胸腔镜手术是近年来新兴的手术方式，具有创伤小、时间短、恢复快和住院天数短等优势，已成为自发性气胸的标准手术方式。
      气胸是指空气在胸膜腔内积聚，导致肺部部分或完全塌陷的状况。这种情况可能突然发生，引起剧烈胸痛和呼吸困难。本文将详细讨论气胸的症状、诊断、治疗和预防措施。
      气胸是指气体进入胸膜腔，造成的积气状态，通常由胸部损伤、肺部疾病、机械通气等因素引发。主要症状包括胸痛和呼吸困难，男性患者多于女性，多数预后良好。
      气胸可以分为自发性、外伤性和医源性三类，其中自发性气胸又细分为继发性自发性气胸和特发性自发性气胸。继发性自发性气胸多由肺部疾病引起，如肺气肿气肿泡破裂、肺结核等，而特发性自发性气胸没有明显的原因及诱因。
      气胸的治疗目的是促进患侧肺复张、消除病因及减少复发。治疗方法包括保守治疗、排气疗法、防止复发措施、手术疗法及防治并发症等。对于症状轻微的原发性或继发性气胸可以采取保守治疗，包括卧床休息、氧疗以及酌情镇痛、镇静、止咳
    `,
    date: '2016-05-05',
    author: '赵六医生',
    keywords: '气胸, 肺部塌陷, 胸痛',
    abstract:
      '气胸是指影响胸膜的一系列病理状态，胸膜是覆盖在肺部表面和胸腔内壁的薄膜......'
  }
])
//用于渲染的数据
const article = ref({})
const fetchArticleDetails = (id) => {
  console.log('获得的id的值', id)
  console.log('获得的id的值', id, typeof id)
  const foundArticle = articleDetails.value.find((item) => item.id === id)
  console.log('found article的值', foundArticle)
  console.log('articleDetails的值：', articleDetails.value)
  if (foundArticle) {
    article.value = foundArticle
    console.log('需要展示的文件', article.value)
  } else {
    console.log('获取数组失败')
    article.value = { title: '文章不存在', content: '无法找到指定的文章。' }
  }
}
onMounted(() => {
  console.log('mounted', props.id)
  fetchArticleDetails(props.id)
  // getArticleDetails(props.id)
})
const thumbsCnt = ref(123)
const collectCnt = ref(45)
const shareCnt = ref(6)
</script>

<style>
.article-container {
  background: cornsilk;
  height: auto;
  padding-bottom: 3em;
  display: grid;
  justify-content: center;
  .article-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    position: relative;
    text-align: center;
    margin-top: 3vh;
  }
  .author-info {
    font-size: 1rem;
    display: flex;
    text-align: center;
    justify-content: center;
    position: relative;
  }
  .article-content {
    font-size: 1.2rem;
    position: relative;
    margin-top: 100px;
    margin-left: 150px;
    margin-right: 150px;
    text-indent: 2em;
  }
  .article-icon {
    display: flex;
    position: relative;
    justify-content: center;
    text-align: center;
    font-size: 1.2rem;
    margin-top: 2rem;
    .icon-single {
      margin-right: 1rem;
      margin-left: 1rem;
    }
  }
}
</style>
