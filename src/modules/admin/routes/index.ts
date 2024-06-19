import type { RouteRecordRaw } from 'vue-router'

import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard'

import LayoutAdmin from '../layouts/layoutAdmin.vue'

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  beforeEnter: [isAuthenticatedGuard],
  component: LayoutAdmin
}
