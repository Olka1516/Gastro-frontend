<template>
  <div class="relative w-full">
    <input
      :type="inputType ? inputType : 'text'"
      v-model="userInfo"
      :autocomplete="autocomplete"
      @input="handleInput($event)"
      :placeholder="t(`inputs.${props.type}`)"
      :class="[
        'w-full text-white px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition',
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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  modelValue: string | number | undefined
  type: string
  v: {
    $invalid: boolean
    $dirty: boolean
    $touch: () => void
  }
  inputType?: string
  error?: string
  autocomplete?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number): void
}>()

const userInfo = ref<string | number>(
  props.type === 'price' ? (props.modelValue ?? '') : (props.modelValue ?? ''),
)

const handleInput = (event: Event) => {
  props.v.$touch()
  const target = event.target as HTMLInputElement
  if (!target) return

  if (props.type === 'price') {
    const inputValue = target.value

    let filteredValue = ''
    let hasDecimalSeparator = false
    let hasMinus = false

    for (let i = 0; i < inputValue.length; i++) {
      const char = inputValue[i]

      if (char >= '0' && char <= '9') {
        filteredValue += char
      } else if ((char === '.' || char === ',') && !hasDecimalSeparator) {
        filteredValue += char
        hasDecimalSeparator = true
      } else if (char === '-' && i === 0 && !hasMinus) {
        filteredValue += char
        hasMinus = true
      }
    }

    userInfo.value = filteredValue

    if (
      filteredValue === '' ||
      filteredValue === '.' ||
      filteredValue === ',' ||
      filteredValue === '-' ||
      filteredValue === '-.' ||
      filteredValue === '-,'
    ) {
      emit('update:modelValue', 0)
      return
    }

    const normalizedValue = filteredValue.replace(',', '.')
    const numValue = parseFloat(normalizedValue)

    emit('update:modelValue', isNaN(numValue) ? 0 : numValue)
  } else {
    userInfo.value = target.value
    emit('update:modelValue', target.value)
  }
}

const { InvalidCredentials, EmailInUse, EmailIsNotValid } = ErrorMessageEnum
const isInfoInvalid = () => {
  return (
    (props.v.$invalid && props.v.$dirty) ||
    ((props.error === EmailInUse || props.error === EmailIsNotValid) && props.type === 'Email') ||
    props.error === InvalidCredentials
  )
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (props.type === 'price') {
      if (newValue === undefined || newValue === null || newValue === '') {
        userInfo.value = ''
      } else if (typeof newValue === 'number') {
        userInfo.value = newValue.toString()
      } else {
        userInfo.value = String(newValue)
      }
    } else {
      userInfo.value = newValue ?? ''
    }
  },
  { immediate: true },
)
</script>
