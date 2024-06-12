import type { RouteRecordRaw } from 'vue-router'

import LoginPage from '../views/LoginPage.vue'

export const authRoutes: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
  redirect: { name: 'login' },
  component: () => import('../layouts/AuthLayout.vue'),
  children: [
    {
      path: 'login',
      name: 'login',
      component: LoginPage
    },
    {
      path: 'registrer',
      name: 'register',
      component: () => import('../views/RegisterPage.vue')
    }
  ]
}
