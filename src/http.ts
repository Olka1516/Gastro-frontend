import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { STORAGE_KEYS } from './constants'

interface ICustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

API.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error: AxiosError) {
    const originalRequest: ICustomAxiosRequestConfig | undefined = error.config

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/refresh`, {
          refreshToken: localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
        })

        const { accessToken } = response.data

        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken)

        originalRequest.headers.Authorization = `Bearer ${accessToken}`

        return API(originalRequest)
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 403) {
          localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
          localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
          return
        }
      }
    }

    return Promise.reject(error)
  },
)

export default API
