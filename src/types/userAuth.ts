import type { EPlan, EStatus } from './errorEnum'

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
  logo?: File | string | null
}

export interface IUserStatus {
  placeName: string
  status: EStatus
  planName: EPlan
}
