import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

import { AuthStatus } from '../interfaces'
import { useAuthStore } from '../stores/auth.store'

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  //tomo mi estado en pinia
  const authStore = useAuthStore()

  await authStore.statusCheck()

  authStore.authStatus === AuthStatus.Autenticado ? next({ name: 'home' }) : next()
}

export default isNotAuthenticatedGuard
