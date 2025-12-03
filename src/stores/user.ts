import {
  getUserAuthorized,
  getUserDetailsByUserId,
  logOutUser,
  putUserFreePlan,
  signInByUserData,
  signUpByUserData,
  updateUserData,
} from '@/services'
import type { IUpdateUserData, IUserData, UserSignIn, UserSignUp } from '@/types'
import { defineStore } from 'pinia'
import { reactive, ref, toRefs } from 'vue'

export const useUserStore = defineStore('counter', () => {
  const isUserAuthorized = ref(false)
  const defaultState = (): IUserData => ({
    email: '',
    placeName: '',
    id: '',
    planName: null,
    planDate: null,
    status: null,
  })

  const state = reactive(defaultState())

  const resetState = () => {
    Object.assign(state, defaultState())
    isUserAuthorized.value = false
  }

  const updateState = (user: IUserData | UserSignIn) => {
    Object.assign(state, user)
    isUserAuthorized.value = true
  }

  const setUserAuthorized = async () => {
    try {
      const data = await getUserAuthorized()
      updateState(data.user)
    } catch {
      resetState()
    }
  }

  const signIn = async (user: UserSignIn) => {
    const data = await signInByUserData(user)
    updateState(data.user)
  }

  const signUp = async (user: UserSignUp) => {
    const data = await signUpByUserData(user)
    updateState(data.user)
  }

  const logOut = () => {
    logOutUser()
    resetState()
  }

  const getUserDetails = async () => {
    const data = await getUserDetailsByUserId()
    updateState(data.user)
  }

  const putFreePlan = async () => {
    const data = await putUserFreePlan()
    updateState(data.user)
  }

  const updateUser = async (userData: IUpdateUserData) => {
    const data = await updateUserData(userData)
    updateState(data.user)
  }

  return {
    ...toRefs(state),
    isUserAuthorized,
    setUserAuthorized,
    signIn,
    signUp,
    getUserDetails,
    putFreePlan,
    updateUser,
    logOut,
  }
})
