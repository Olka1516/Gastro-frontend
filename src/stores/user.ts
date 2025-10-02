import {
  getUserAuthorized,
  getUserDetailsByUserId,
  logOutUser,
  putUserFreePlan,
  signInByUserData,
  signUpByUserData,
} from '@/services'
import type { UserSignIn, UserSignUp } from '@/types'
import { defineStore } from 'pinia'
import { reactive, ref, toRefs } from 'vue'

export const useUserStore = defineStore('counter', () => {
  const isUserAuthorized = ref(false)
  const defaultState = () => ({
    email: '',
    placeName: '',
    id: '',
    planName: '',
    planDate: '',
    status: '',
  })

  const state = reactive(defaultState())

  const resetState = () => {
    Object.assign(state, defaultState())
    isUserAuthorized.value = false
  }

  const updateState = (user: UserSignIn) => {
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

  return {
    ...toRefs(state),
    isUserAuthorized,
    setUserAuthorized,
    signIn,
    signUp,
    getUserDetails,
    putFreePlan,
    logOut,
  }
})
