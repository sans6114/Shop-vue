import { createRouter, createWebHistory } from 'vue-router'

import { authRoutes } from '@/modules/auth/routes'
import ShopLayout from '@/modules/shop/layouts/ShopLayout.vue'
import { HomeView } from '@/modules/shop/views'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        }
      ]
    },
    //auth routes
    authRoutes
  ]
})

export default router
