<template>
  <div class="w-full flex justify-center">
    <div
      @click="changeStatus"
      :class="[
        'relative w-full max-w-md min-h-[42px] border rounded-lg px-4 py-2 flex flex-wrap items-center gap-2 cursor-pointer transition-colors duration-200',
        isInfoInvalid() ? 'border-red-500' : 'border-white',
      ]"
    >
      <i v-if="!category" class="text-[#787676] not-italic">{{ t(type) }}</i>

      <div v-if="category">
        <span
          class="bg-[#dc5b41] text-white px-3 py-1 text-xs flex items-center justify-center gap-2"
        >
          {{ category }}
          <button @click="deleteChoose" class="hover:scale-110 transition-transform w-4 h-4">
            <img src="@/assets/images/icons/exit.svg" alt="Remove" />
          </button>
        </span>
      </div>

      <div
        v-if="selectStatus"
        class="absolute left-0 top-full mt-2 w-full max-h-38 overflow-y-auto border border-gray-200 bg-[#1a191f] rounded-lg shadow-md z-10"
      >
        <h5
          v-for="key in allSelections"
          :key="key"
          @click="selectProduct(key, $event)"
          class="px-4 py-2 text-white hover:bg-[#120503] cursor-pointer transition-colors"
        >
          {{ key }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const category = defineModel('category')
const props = defineProps<{
  allSelections: string[]
  type: string
  v?: {
    $invalid: boolean
    $dirty: boolean
  }
}>()

const { t } = useI18n()

const selectStatus = ref(false)

const changeStatus = () => {
  selectStatus.value = !selectStatus.value
}

const selectProduct = (product: string, event: Event) => {
  event?.stopPropagation()
  category.value = product
  selectStatus.value = false
}

const deleteChoose = (event: Event) => {
  event.stopPropagation()
  category.value = ''
}

const isInfoInvalid = () => {
  if (!props.v) return false
  return props.v.$invalid && props.v.$dirty
}
</script>
