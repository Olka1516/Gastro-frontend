import { logOutUser, signInByUserData, signUpByUserData } from '@/services'
import type { UserSignIn, UserSignUp } from '@/types'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const signUp = async (user: UserSignUp) => {
    await signUpByUserData(user)
  }

  const signIn = async (user: UserSignIn) => {
    await signInByUserData(user)
  }

  const logOut = () => {
    logOutUser()
  }

  return { signIn, signUp, logOut }
})
