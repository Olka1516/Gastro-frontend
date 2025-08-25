import type { AxiosError } from 'axios'

export enum ErrorMessageEnum {
  IsRequired = 'Value is required',
  EmailIsNotValid = 'Value is not a valid email address',
  PasswordMinLength = 'This field should be at least 6 characters long',
  PasswordIsEqual = 'The value must be equal to the other value',
  EmailInUse = 'emailTaken',
  UsernameInUse = 'usernameTaken',
  PassMissMach = 'passMissMatch',
  InvalidCredentials = 'invalidCredentials',
}

export type TRequestError = AxiosError<{ message: string }>
