import { computed, ref } from 'vue'

import { defineStore } from 'pinia'

import { useLocalStorage } from '@vueuse/core'

import { checkAuthAction, loginAction, registerAction } from '../actions'
import { AuthStatus, type User } from '../interfaces'

export const useAuthStore = defineStore('auth', () => {
  //autenticado o no autencticado, ckeking
  //interfaz AUTHSTATUS con mayus
  const authStatus = ref<AuthStatus>(AuthStatus.Checking)
  const user = ref<User | undefined>()
  const token = ref(useLocalStorage('token', ''))

  //registro
  const register = async (fullname: string, email: string, password: string) => {
    try {
      const responseRegister = await registerAction(fullname, email, password)

      if (!responseRegister.ok) {
        logOut()
        return false
      }

      user.value = responseRegister.user
      token.value = responseRegister.token
      authStatus.value = AuthStatus.Autenticado
      return true
    } catch (error) {
      return logOut()
    }
  }
  //login
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
      console.log(user.value)
      return true
    } catch (error) {
      return logOut()
    }
  }
  //chequear status del token, esta autenticado
  const statusCheck = async (): Promise<boolean> => {
    try {
      const response = await checkAuthAction()

      if (!response.ok) {
        logOut()
        return false
      }
      authStatus.value = AuthStatus.Autenticado
      // si no entro en el if anterior va a significar que el token es valido por lo que:
      user.value = response.user
      token.value = response.token
      return true
    } catch (error) {
      logOut()
      return false
    }
  }

  const logOut = () => {
    localStorage.removeItem('token')

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
    isAdmin: computed(() => user.value?.roles.includes('admin') ?? false),
    //TODO: adm o no

    // setters
    username: computed(() => user.value?.fullName),

    //actions
    login,
    register,
    statusCheck,
    logOut
  }
})
