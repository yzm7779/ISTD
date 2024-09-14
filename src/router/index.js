import { createRouter, createWebHistory } from 'vue-router'

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
      component: () => import('@/views/LayOut/LayoutChat.vue')
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

export default router
