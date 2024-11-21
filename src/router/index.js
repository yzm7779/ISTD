import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/index.js'
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/homepage'
    },
    {
      path: '/login',
      component: () => import('@/views/LoginRegister/Login.vue')
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: () => import('@/views/LayOut/LayoutChat.vue')
    },
    {
      path: '/doctorfind',
      name: 'doctorfind',
      component: () => import('@/views/LayOut/LayoutDoctor.vue')
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('@/views/NavFunction/LayoutArticle.vue')
    },
    {
      path: '/article/:id',
      name: 'articleDetail',
      props: true,
      component: () => import('@/views/NavFunction/ArticleDetail.vue')
    },
    {
      path: '/personalCenter',
      component: () => import('@/views/LayOut/LayoutContainer.vue'),
      redirect: '/personalCenter/home',
      children: [
        {
          path: '/personalCenter/home',
          component: () => import('@/views/UserCenter/UserInformation.vue')
        },
        {
          path: '/personalCenter/partner/:id?',
          component: () => import('@/views/UserCenter/UserPartner.vue')
        },
        {
          path: '/personalCenter/report/:id?',
          component: () => import('@/views/UserCenter/UserReportHistory.vue')
        },
        {
          path: '/personalCenter/review/:id?',
          component: () => import('@/views/UserCenter/UserReview.vue')
        },
        {
          path: '/personalCenter/search/:id?',
          name: 'search',
          component: () => import('@/views/UserCenter/UserSearchHistory.vue')
        }
      ]
    },
    {
      path: '/help',
      component: () => import('@/views/NavFunction/HelpFunction.vue')
    }
  ]
})

// router.beforeEach((to) => {
//   const useStore = useUserStore()
//   if (!useStore.token && to.path !== '/login') {
//     ElMessage('请登录以使用该功能')
//     return '/login'
//   }
//   return true
// })

export default router
