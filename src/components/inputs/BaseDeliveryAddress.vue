<template>
  <div class="relative w-full">
    <input v-model="localValue" type="text" :autocomplete="autocomplete ?? 'street-address'"
      :placeholder="t('inputs.deliveryAddress')" :class="[
        'w-full text-white px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition',
        isInfoInvalid() ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500',
      ]" @input="handleInput" />
    <div class="address-autocomplete-anchor mt-1 empty:hidden" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  modelValue: string | undefined
  v: {
    $invalid: boolean
    $dirty: boolean
    $touch: () => void
  }
  autocomplete?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const localValue = ref(props.modelValue ?? '')

const handleInput = () => {
  props.v.$touch()
  emit('update:modelValue', localValue.value)
}

const isInfoInvalid = () => props.v.$invalid && props.v.$dirty

watch(
  () => props.modelValue,
  (next) => {
    localValue.value = next ?? ''
  },
  { immediate: true },
)
</script>
