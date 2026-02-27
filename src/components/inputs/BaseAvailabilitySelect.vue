<template>
  <div class="w-full flex justify-center">
    <div
      @click="changeStatus"
      :class="[
        'relative w-full max-w-md min-h-[42px] border rounded-lg px-4 py-2 flex flex-wrap items-center gap-2 cursor-pointer transition-colors duration-200',
        isInfoInvalid() ? 'border-red-500' : 'border-white',
      ]"
    >
      <i v-if="!selectedValue" class="text-[#787676] not-italic">{{ t(type) }}</i>

      <div v-if="selectedValue" class="flex items-center justify-between w-full">
        <span class="text-white text-sm">
          {{ t(`dashboard.${selectedValue}`) }}
        </span>
        <button @click="deleteChoose" class="hover:scale-110 transition-transform w-4 h-4 ml-2">
          <img src="@/assets/images/icons/exit_white.svg" alt="exit" class="w-4 h-4" />
        </button>
      </div>

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
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  allSelections: string[]
  type: string
  v?: {
    $invalid: boolean
    $dirty: boolean
  }
}>()

const selectedValue = defineModel<string>('availability')
const { t } = useI18n()

const selectStatus = ref(false)

const changeStatus = () => {
  selectStatus.value = !selectStatus.value
}

const selectProduct = (key: string, event: Event) => {
  event.stopPropagation()
  selectedValue.value = key
  selectStatus.value = false
}

const deleteChoose = (event: Event) => {
  event.stopPropagation()
  selectedValue.value = ''
}

const isInfoInvalid = () => {
  if (!props.v) return false
  return props.v.$invalid && props.v.$dirty && !selectedValue.value
}
</script>
