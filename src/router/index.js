import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import TrialPage from '../pages/TrialPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { title: '北京泰能科技有限公司 - 智云PMS酒店管理系统' }
    },
    {
      path: '/trial',
      name: 'trial',
      component: TrialPage,
      meta: { title: '申请试用 - 智云PMS | 北京泰能科技' }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80
      }
    }
    return { top: 0 }
  }
})

router.afterEach((to) => {
  const title = to.meta?.title
  if (typeof title === 'string' && title) {
    document.title = title
  }
})

export default router
