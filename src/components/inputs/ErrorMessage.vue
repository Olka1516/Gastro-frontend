<template>
  <div v-if="isError" class="mt-1">
    <small class="text-sm text-red-500 font-medium">
      {{ getError() }}
    </small>
  </div>
</template>

<script setup lang="ts">
import { ErrorMessageEnum } from '@/types'
import type { ErrorObject } from '@vuelidate/core'
import { computed } from 'vue'

const props = defineProps<{
  v: {
    $error: boolean
    $dirty: boolean
    $errors: ErrorObject[]
    $path: string
  }
  error?: string
}>()

const isError = computed(() => {
  return (props.v.$error && props.v.$dirty) || props.error
})

const {
  EmailIsNotValid,
  IsRequired,
  EmailInUse,
  PasswordMinLength,
  PasswordIsEqual,
  UsernameInUse,
  InvalidCredentials,
  PassMissMach,
} = ErrorMessageEnum

const getError = () => {
  // TODO: to lang
  const { $message: message } = props.v.$errors?.[0] ?? { $message: null }
  switch (props.v.$path) {
    case 'email':
      if (message === EmailIsNotValid) return EmailIsNotValid
      else if (message === IsRequired) return IsRequired
      else if (props.error === EmailInUse) return 'Email already in use!'
      else if (props.error === InvalidCredentials) return 'Email not found!'
      break
    case 'password':
      if (message === IsRequired) return IsRequired
      else if (message === PasswordMinLength) return PasswordMinLength
      else if (props.error === PassMissMach) return 'Password is wrong'
      break
    case 'confirmPassword':
      if (message === IsRequired) return IsRequired
      else if (message === PasswordIsEqual) return PasswordIsEqual
      break
    case 'placeName':
      if (message === IsRequired) return IsRequired
      else if (props.error === UsernameInUse) return 'Username already in use!'
      else if (props.error === InvalidCredentials) return 'Username does not exist'
      break
  }
}
</script>
