<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-90"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-90"
    >
      <div
        v-if="open"
        class="fixed inset-0 flex items-center justify-center bg-black/70 z-1000 backdrop-blur-[6px]"
      >
        <div
          class="relative border border-[#dc5b41] w-full max-w-md rounded-2xl shadow-2xl p-12 bg-black/80"
        >
          <button
            @click="closeModal"
            class="cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>

          <h2 class="text-2xl font-semibold text-white text-center mb-6">
            {{ t(text) }}
          </h2>

          <form class="space-y-6" @submit.prevent="handleNextStep" autocomplete="on">
            <div class="relative">
              <BaseDragFile />
            </div>
            <div class="relative">
              <BaseText
                v-model="data.name"
                :v="v$.name"
                type="name"
                :error="error"
                autocomplete="name"
              />
              <ErrorMessage :v="v$.name" :error="error" />
            </div>
            <div class="relative">
              <BaseText
                v-model="data.price"
                :v="v$.price"
                type="price"
                :error="error"
                autocomplete="price"
              />
              <ErrorMessage :v="v$.price" :error="error" />
            </div>
            <div class="relative">
              <BaseText
                v-model="data.description"
                :v="v$.description"
                type="description"
                :error="error"
                autocomplete="description"
              />
              <ErrorMessage :v="v$.description" :error="error" />
            </div>

            <button
              type="submit"
              class="cursor-pointer w-full py-2 mt-4 bg-[#dc5b41] text-white font-semibold shadow-md hover:bg-[#dc5b34] transition"
            >
              {{ t('button.edit') }}
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import BaseDragFile from '@/components/inputs/BaseDragFile.vue'
import BaseText from '@/components/inputs/BaseText.vue'
import ErrorMessage from '@/components/inputs/ErrorMessage.vue'
import type { IDish } from '@/types/menu'
import useVuelidate from '@vuelidate/core'
import { numeric, required } from '@vuelidate/validators'
import { reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ text: string; error: string; category: string[] }>()

const { t } = useI18n()
const open = defineModel('openManage')
const dish = defineModel<IDish>('dish')
const emit = defineEmits<{
  (e: 'handleProcess', value: IDish): void
}>()

const data = reactive<IDish>({
  name: '',
  image: '',
  price: 0,
  description: '',
  id: '',
})
const issue = ref('')
const rules = {
  name: { required },
  image: { required },
  price: { required, numeric },
  description: { required },
}

const v$ = useVuelidate(rules, data)

const closeModal = () => {
  open.value = false
  document.body.style.overflow = ''
}

const handleNextStep = () => {
  closeModal()
  emit('handleProcess', data)
}

watch(
  dish,
  (newDish) => {
    if (newDish) Object.assign(data, newDish)
  },
  { deep: true },
)
watch(
  () => props.error,
  () => {
    issue.value = props.error
  },
)
</script>

<style scoped></style>
