import type { AxiosError } from 'axios'

export enum ErrorMessageEnum {
  IsRequired = 'required',
  EmailIsNotValid = 'email',
  PasswordMinLength = 'minLength',
  PasswordIsEqual = 'sameAs',
  EmailInUse = 'emailTaken',
  PlaceInUse = 'placeTaken',
  PassMissMach = 'passMissMatch',
  InvalidCredentials = 'invalidCredentials',
  FreePlanItemsLimit = 'freePlanItemsLimit',
}

export enum EStatus {
  pending = 'pending',
  complete = 'complete',
  error = 'error',
  cancelled = 'cancelled',
}

export enum EPlan {
  free = 'free',
  standart = 'standart',
  premium = 'premium',
}

export enum EStatus {
  pending = 'pending',
  complete = 'complete',
  error = 'error',
  cancelled = 'cancelled',
}

export enum EPlan {
  free = 'free',
  standart = 'standart',
  premium = 'premium',
}

export type TRequestError = AxiosError<{ message: string }>
