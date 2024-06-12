import { isAxiosError } from 'axios'

import { tesloApi } from '@/api/tesloApi'

import type { User, UserLogin } from '../interfaces'

//interface para ver como se van a ver mis try/catch

interface loginError {
  ok: false
  message: string
}

interface loginTrue {
  ok: true
  user: User
  token: string
}

export const loginAction = async (
  email: string,
  password: string
): Promise<loginTrue | loginError> => {
  try {
    const { data } = await tesloApi.post<UserLogin>('/auth/login', {
      email,
      password
    })

    return {
      ok: true,
      user: data.user,
      token: data.token
    }
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401)
      return {
        ok: false,
        message: 'Usuario o contraseña incorrectos'
      }
  }

  throw new Error('La petición no se pudo realizar')
}
