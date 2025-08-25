<template>
  <div class="relative w-full">
    <input
      required
      v-model="userInfo"
      :autocomplete="autocomplete"
      @input="handleInput($event)"
      :placeholder="props.type"
      :class="[
        'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition',
        isInfoInvalid()
          ? 'border-red-500 focus:ring-red-400'
          : 'border-gray-300 focus:ring-blue-500',
      ]"
    />
  </div>
</template>
<script setup lang="ts">
import { ErrorMessageEnum } from '@/types'
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  type: string
  v: {
    $invalid: boolean
    $dirty: boolean
    $touch: () => void
  }
  error?: string
  autocomplete?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const userInfo = ref(props.modelValue)

const handleInput = (event: Event) => {
  props.v.$touch()
  const target = event.target as HTMLInputElement
  if (!target) return
  userInfo.value = target.value
  emit('update:modelValue', target.value)
}

const { InvalidCredentials, EmailInUse, EmailIsNotValid, UsernameInUse } = ErrorMessageEnum
const isInfoInvalid = () => {
  return (
    (props.v.$invalid && props.v.$dirty) ||
    ((props.error === EmailInUse || props.error === EmailIsNotValid) && props.type === 'Email') ||
    (props.error === UsernameInUse && props.type === 'Username') ||
    props.error === InvalidCredentials
  )
}

watch(
  () => props.modelValue,
  () => {
    userInfo.value = props.modelValue
  },
)
</script>
