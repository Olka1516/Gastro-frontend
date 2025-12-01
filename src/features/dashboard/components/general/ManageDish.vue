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
          class="relative border border-[#dc5b41] w-full max-w-md max-h-[90vh] rounded-2xl shadow-2xl bg-black/80 overflow-hidden flex flex-col"
        >
          <div class="flex-shrink-0 relative p-6 pb-0">
            <button
              @click="closeModal"
              class="cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
            >
              ✕
            </button>

            <h2 class="text-2xl font-semibold text-white text-center mb-6">
              {{ t(text) }}
            </h2>
          </div>

          <div class="flex-1 overflow-y-auto px-6 pb-8 custom-scrollbar">
            <form class="space-y-6" @submit.prevent="handleNextStep" autocomplete="on">
              <div class="relative">
                <BaseDragFile :url="data.image" :v="v$.image" @update="handleImageUpdate" />
              </div>
              <div class="relative">
                <BaseText
                  v-model="formData.name"
                  :v="v$.name"
                  type="name"
                  :error="error"
                  autocomplete="name"
                />
                <ErrorMessage :v="v$.name" :error="error" />
              </div>
              <div class="relative">
                <BaseText
                  v-model="formData.price"
                  :v="v$.price"
                  type="price"
                  :error="error"
                  autocomplete="price"
                />
                <ErrorMessage :v="v$.price" :error="error" />
              </div>
              <div class="relative">
                <BaseSelect
                  v-model:category="formData.category"
                  :all-selections="category"
                  type="dashboard.tableHead.category"
                  :v="v$.category"
                />
                <ErrorMessage :v="v$.category" :error="error" />
              </div>
              <div class="relative">
                <BaseText
                  v-model="formData.description"
                  :v="v$.description"
                  type="description"
                  :error="error"
                  autocomplete="description"
                />
                <ErrorMessage :v="v$.description" :error="error" />
              </div>

              <div class="relative">
                <BaseAvailabilitySelect
                  v-model:availability="formData.isAvailable"
                  :all-selections="availabilityOptions"
                  type="dashboard.availability"
                  :v="v$.isAvailable"
                />
                <ErrorMessage :v="v$.isAvailable" :error="error" />
              </div>

              <button
                type="submit"
                class="cursor-pointer w-full py-2 mt-4 bg-[#dc5b41] text-white font-semibold shadow-md hover:bg-[#dc5b34] transition"
              >
                {{ isEditMode ? t('button.edit') : t('button.add') }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import BaseAvailabilitySelect from '@/components/inputs/BaseAvailabilitySelect.vue'
import BaseDragFile from '@/components/inputs/BaseDragFile.vue'
import BaseSelect from '@/components/inputs/BaseSelect.vue'
import BaseText from '@/components/inputs/BaseText.vue'
import ErrorMessage from '@/components/inputs/ErrorMessage.vue'
import type { IDish } from '@/types/menu'
import useVuelidate from '@vuelidate/core'
import { numeric, required } from '@vuelidate/validators'
import { computed, reactive, ref, watch } from 'vue'
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
  category: '',
  id: '',
  isAvailable: 'available',
  ownerId: '',
})

const availabilityOptions = ['available', 'unavailable']

const issue = ref('')
const rules = {
  name: { required },
  image: { required },
  price: { required, numeric },
  description: { required },
  category: { required },
  isAvailable: { required },
}

const formData = reactive({
  name: '',
  image: '' as string | File,
  price: undefined,
  description: '',
  category: '',
  isAvailable: 'available' as 'available' | 'unavailable',
})

const v$ = useVuelidate(rules, formData)

const isEditMode = computed(() => !!dish.value?.id)

const closeModal = () => {
  open.value = false
  document.body.style.overflow = ''
}

const handleNextStep = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  // Копіюємо дані з formData в data перед відправкою
  Object.assign(data, formData)

  closeModal()
  emit('handleProcess', data)
}

const handleImageUpdate = (image: File) => {
  data.image = image
  formData.image = image
}

const syncDataFromDish = (dishValue: IDish) => {
  data.name = ''
  data.image = ''
  data.price = undefined
  data.description = ''
  data.category = ''
  data.id = ''
  data.isAvailable = 'available'
  data.ownerId = ''

  Object.assign(data, dishValue)

  // Синхронізуємо formData з data для валідації
  formData.name = data.name
  formData.image = data.image
  formData.price = data.price
  formData.description = data.description
  formData.category = data.category
  formData.isAvailable = data.isAvailable
}

watch(
  dish,
  (newDish) => {
    if (newDish) {
      syncDataFromDish(newDish)
    }
  },
  { deep: true, immediate: true },
)
watch(open, (isOpen) => {
  if (isOpen && dish.value) {
    syncDataFromDish(dish.value)
    v$.value.$reset()
  }
})

// Синхронізуємо formData.image з data.image для валідації
watch(
  () => data.image,
  (newImage) => {
    formData.image = newImage
  },
)
watch(
  () => props.error,
  () => {
    issue.value = props.error
  },
)
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #dc5b41 transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #dc5b41;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #dc5b34;
}

.custom-scrollbar::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
