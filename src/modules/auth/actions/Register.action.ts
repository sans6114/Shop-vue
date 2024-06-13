import { tesloApi } from '@/api/tesloApi'

import type { User, UserLogin } from '../interfaces'

//interface para ver como se van a ver mis try/catch

interface registerError {
  ok: false
  message: string
}

interface registerTrue {
  ok: true
  user: User
  token: string
}

export const registerAction = async (
  fullname: string,
  email: string,
  password: string
): Promise<registerTrue | registerError> => {
  try {
    const { data } = await tesloApi.post<UserLogin>('/auth/register', {
      fullname,
      email,
      password
    })

    return {
      ok: true,
      user: data.user,
      token: data.token
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'error en la petición'
    }
  }
}
