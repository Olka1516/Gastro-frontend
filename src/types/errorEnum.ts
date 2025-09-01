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
}

export enum EStatus {
  pending = 'pending',
  complete = 'complete',
  error = 'error',
  cancelled = 'cancelled',
}

export type TRequestError = AxiosError<{ message: string }>
