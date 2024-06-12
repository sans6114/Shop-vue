import { computed, ref } from 'vue'

import { defineStore } from 'pinia'

import { loginAction } from '../actions'
import { AuthStatus, type User } from '../interfaces'

export const useAuthStore = defineStore('auth', () => {
  //autenticado o no autencticado, ckeking
  //interfaz AUTHSTATUS con mayus
  const authStatus = ref<AuthStatus>(AuthStatus.Checking)
  const user = ref<User | undefined>()
  const token = ref('')

  const login = async (email: string, password: string) => {
    try {
      const responseLogin = await loginAction(email, password)

      if (!responseLogin.ok) {
        logOut()
        return false
      }

      user.value = responseLogin.user
      token.value = responseLogin.token
      authStatus.value = AuthStatus.Autenticado
      return true
    } catch (error) {
      return logOut()
    }
  }

  const logOut = () => {
    authStatus.value === AuthStatus.NoAutenticado
    user.value = undefined
    token.value = ''
    return false
  }

  return {
    //usuario
    user,
    token,
    authStatus,

    // getters
    isCheking: computed(() => authStatus.value === AuthStatus.Checking),
    siAutenticado: computed(() => authStatus.value === AuthStatus.Autenticado),
    noAutenticado: computed(() => authStatus.value === AuthStatus.NoAutenticado),

    //TODO: adm o no

    // setters
    username: computed(() => user.value?.fullName),

    //actions
    login
  }
})
