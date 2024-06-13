import { isAxiosError } from 'axios'

import { tesloApi } from '@/api/tesloApi'

import type { User, UserLogin } from '../interfaces'

interface tokenError {
  ok: false
  message?: string
}

interface tokenTrue {
  ok: true
  user: User
  token: string
}
export const checkAuthAction = async (): Promise<tokenError | tokenTrue> => {
  try {
    //verififcar si existe token
    const localToken = localStorage.getItem('token')
    //validacion si el token esta mal
    if (localToken && localToken.length < 10) {
      return { ok: false }
    }
    // si hay un token apto:
    const { data } = await tesloApi.get<UserLogin>('/auth/check-status')

    return {
      ok: true,
      user: data.user,
      token: data.token
    }
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        message: 'petición sin exito'
      }
    }

    throw new Error('Error al hacer la petición')
  }
}
