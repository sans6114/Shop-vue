import type { RouteRecordRaw } from 'vue-router'

import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard'

import LayoutAdmin from '../layouts/layoutAdmin.vue'
import DashboardAdmin from '../views/dashboardAdmin.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductView from '../views/ProductView.vue'

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  redirect: { name: 'admin-dashboard' },
  beforeEnter: [isAuthenticatedGuard],
  component: LayoutAdmin,
  children: [
    {
      path: 'dashboard',
      name: 'admin-dashboard',
      component: DashboardAdmin
    },
    {
      path: 'products',
      name: 'Products',
      component: ProductsView
    },
    {
      path: 'products/:productId',
      name: 'admin-product',
      props: true,
      component: ProductView
    }
  ]
}
