import { type UserSignIn, type UserSignUp } from '@/types'
import http from '../http'
import { ENDPOINTS, STORAGE_KEYS } from '@/constants'

const setTokens = (refreshToken: string, accessToken: string) => {
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken)
}

export const signUpByUserData = async (user: UserSignUp) => {
  const data = await http.post(ENDPOINTS.REGISTRATION, user)
  setTokens(data.data.tokens.refreshToken, data.data.tokens.accessToken)
}
export const signInByUserData = async (user: UserSignIn) => {
  const data = await http.post(ENDPOINTS.LOGIN, user)
  setTokens(data.data.tokens.refreshToken, data.data.tokens.accessToken)
}

export const logOutUser = () => {
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
}
