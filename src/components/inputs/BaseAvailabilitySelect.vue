<template>
  <div class="w-full flex justify-center">
    <div
      @click="changeStatus"
      :class="[
        'relative w-full max-w-md min-h-[42px] border rounded-lg px-4 py-2 flex flex-wrap items-center gap-2 cursor-pointer transition-colors duration-200',
        isInfoInvalid() ? 'border-red-500' : 'border-white',
      ]"
    >
      <span class="text-white text-sm">
        {{ t(`dashboard.${displayValue}`) }}
      </span>

      <div
        v-if="selectStatus"
        class="absolute left-0 top-full mt-2 w-full max-h-60 overflow-y-auto border border-gray-200 bg-[#1a191f] rounded-lg shadow-md z-10"
      >
        <h5
          v-for="key in allSelections"
          :key="key"
          @click="selectProduct(key, $event)"
          class="px-4 py-2 text-white hover:bg-[#dc5b41] cursor-pointer transition-colors duration-200"
        >
          {{ t(`dashboard.${key}`) }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  allSelections: string[]
  type: string
  v?: {
    $invalid: boolean
    $dirty: boolean
  }
}>()

const selectedValue = defineModel<string>('availability', { default: 'available' })
const { t } = useI18n()

const selectStatus = ref(false)

const displayValue = computed(
  () => selectedValue.value || props.allSelections[0] || 'available',
)

const ensureSelection = () => {
  if (!selectedValue.value && props.allSelections.length > 0) {
    selectedValue.value = props.allSelections[0]
  }
}

onMounted(ensureSelection)

watch(
  () => props.allSelections,
  () => ensureSelection(),
  { immediate: true },
)

const changeStatus = () => {
  selectStatus.value = !selectStatus.value
}

const selectProduct = (key: string, event: Event) => {
  event.stopPropagation()
  selectedValue.value = key
  selectStatus.value = false
}

const isInfoInvalid = () => {
  if (!props.v) return false
  return props.v.$invalid && props.v.$dirty
}
</script>
