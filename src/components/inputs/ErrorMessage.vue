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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
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
  const { $message: message } = props.v.$errors?.[0] ?? { $message: null }
  switch (props.v.$path) {
    case 'email':
      if (message === EmailIsNotValid) return t('errors.emailNotValid')
      else if (message === IsRequired) return t('errors.valueIsRequired')
      else if (props.error === EmailInUse) return t('errors.emailInUse')
      else if (props.error === InvalidCredentials) return t('errors.emailNotFound')
      break
    case 'password':
      if (message === IsRequired) return t('errors.valueIsRequired')
      else if (message === PasswordMinLength) return t('errors.passwordMinLength')
      else if (props.error === PassMissMach) return t('errors.passwordWrong')
      break
    case 'confirmPassword':
      if (message === IsRequired) return t('errors.valueIsRequired')
      else if (message === PasswordIsEqual) return t('errors.passwordNotEqual')
      break
    case 'placeName':
      if (message === IsRequired) return t('errors.valueIsRequired')
      else if (props.error === UsernameInUse) return t('errors.placeNameInUse')
      break
  }
}
</script>
