<template>
  <div class="relative w-full">
    <textarea
      v-model="localValue"
      :rows="rows"
      :placeholder="t(`inputs.${props.type}`)"
      :class="[
        'w-full resize-y text-white px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition min-h-[6rem]',
        isInfoInvalid() ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500',
      ]"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    modelValue: string | undefined
    type: string
    v: {
      $invalid: boolean
      $dirty: boolean
      $touch: () => void
    }
    rows?: number
  }>(),
  { rows: 4 },
)

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
