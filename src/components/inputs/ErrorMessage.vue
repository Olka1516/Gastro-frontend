<template>
  <div v-if="isError" class="mt-1">
    <small class="text-sm text-red-500 font-medium">
      {{ getError() }}
    </small>
  </div>
</template>

<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, te } = useI18n()
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

const getError = () => {
  const { $validator: validator } = props.v.$errors?.[0] ?? { $validator: null }
  const validatorKey = validator || props.error || null
  const key = `errors.${props.v.$path}.${validatorKey}`

  return te(key) ? t(key) : ''
}
</script>
