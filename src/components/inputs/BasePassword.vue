<template>
  <div class="relative w-full">
    <input
      required
      :type="bloke"
      :autocomplete="autocomplete"
      v-model="userPassword"
      @focus="inputFocused = true"
      @blur="inputFocused = false"
      @input="handleInput($event)"
      :placeholder="t(`inputs.${props.type}`)"
      :class="[
        'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition',
        isPasswordInvalid()
          ? 'border-red-500 focus:ring-red-400'
          : 'border-gray-300 focus:ring-blue-500',
      ]"
    />
    <button
      type="button"
      @click="isVisible"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
    >
      <img :src="newUrl()" alt="toggle password" class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ErrorMessageEnum } from '@/types'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const bloke = ref('password')
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
  (e: 'update:modelValue', val: string | null): void
}>()

const userPassword = ref(props.modelValue)
const inputFocused = ref(false)

const handleInput = (event: Event) => {
  props.v.$touch()
  const target = event.target as HTMLInputElement
  if (!target) return
  emit('update:modelValue', target.value)
}

const { PasswordMinLength, PasswordIsEqual, PassMissMach } = ErrorMessageEnum
const isPasswordInvalid = () => {
  return (
    (props.v.$invalid && props.v.$dirty) ||
    props.error === PasswordMinLength ||
    props.error === PasswordIsEqual ||
    props.error === PassMissMach
  )
}

const isVisible = () => {
  if (bloke.value === 'password') bloke.value = 'text'
  else bloke.value = 'password'
}

const newUrl = () => {
  const name = bloke.value === 'password' ? 'eye' : 'eye-off'
  const st = new URL(`../../assets/images/icons/${name}.svg`, import.meta.url)
  return st.href
}

watch(
  () => props.modelValue,
  (data) => {
    userPassword.value = data
  },
)
</script>
