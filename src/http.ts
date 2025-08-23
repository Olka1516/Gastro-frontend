import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'

interface ICustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
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
          refreshToken: localStorage.getItem('refreshToken'),
        })

        const { accessToken } = response.data

        localStorage.setItem('accessToken', accessToken)

        originalRequest.headers.Authorization = `Bearer ${accessToken}`

        return API(originalRequest)
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 403) {
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('accessToken')
          return
        }
      }
    }

    return Promise.reject(error)
  },
)

export default API
