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
  id: string
  planName: EPlan | null
  planDate: Date | null
  status: EStatus | null
}
