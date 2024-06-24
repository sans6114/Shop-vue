import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

import { AuthStatus } from '../interfaces'
import { useAuthStore } from '../stores/auth.store'

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()

  //! Podemos obtener el resultado del estado de autenticación
  const isAuthenticated = await authStore.statusCheck()

  if (isAuthenticated) {
    next()
  } else {
    next({ name: 'home' })
  }

  authStore.authStatus === AuthStatus.NoAutenticado ? next({ name: 'home' }) : next()
}

export default isAuthenticatedGuard
