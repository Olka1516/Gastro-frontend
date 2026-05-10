import type { MenuDishLayout } from '@/constants/menuDishLayout'
import type { EPlan, EStatus } from './errorEnum'

export type ModalKey = 'signUp' | 'signIn'

export interface UserSignIn {
  email: string
  password: string
}

export interface UserSignUp extends UserSignIn {
  placeName: string
}

export interface IUserData {
  email: string
  placeName: string
  menuBackgroundColor: string
  menuIconColor: string
  menuDishLayout?: MenuDishLayout
  logo?: string
  id: string
  planName: EPlan | null
  planDate: Date | null
  status: EStatus | null
}

export interface IUpdateUserData {
  placeName: string
  email: string
  menuBackgroundColor?: string
  menuIconColor?: string
  menuDishLayout?: MenuDishLayout
  logo?: File | string | null
}

export interface IUserStatus {
  placeName: string
  status: EStatus
  planName: EPlan
}
