<template>
  <Teleport to="body">
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-90"
      enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-90">
      <div v-if="open"
        class="fixed inset-0 flex items-center justify-center bg-black/70 z-1000 backdrop-blur-[6px] p-4">
        <div
          class="relative border border-[#dc5b41] w-full max-w-xl max-h-[90vh] rounded-2xl shadow-2xl bg-black/85 overflow-hidden flex flex-col"
          :class="multilingual ? '' : 'max-w-md'">
          <div class="flex-shrink-0 relative px-6 pt-6 pb-4 border-b border-[#2a2930]/80">
            <button type="button"
              class="cursor-pointer absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
              @click="closeModal">
              ✕
            </button>

            <h2 class="text-2xl font-semibold text-white text-center pr-8">
              {{ t(text) }}
            </h2>
          </div>

          <div class="flex-1 overflow-y-auto px-6 py-5 custom-scrollbar">
            <form class="space-y-5" @submit.prevent="handleNextStep" autocomplete="off">
              <template v-if="multilingual">
                <MenuLanguageTabs v-model="activeLang" :filled-languages="filledLanguages" />

                <div class="rounded-xl border border-[#2a2930] bg-gradient-to-br from-[#1a191f]/90 to-[#121118]/90 p-5">
                  <div class="field-with-error">
                    <BaseText v-model="formData.name" :v="v$.name" type="name" :error="error" autocomplete="off" />
                    <p class="field-error-slot" aria-live="polite">
                      <span v-show="showInputError">{{ inputErrorMessage }}</span>
                    </p>
                  </div>
                </div>
              </template>

              <template v-else>
                <div class="field-with-error">
                  <BaseText v-model="formData.name" :v="v$.name" type="name" :error="error" autocomplete="name" />
                  <p class="field-error-slot" aria-live="polite">
                    <span v-show="showInputError">{{ inputErrorMessage }}</span>
                  </p>
                </div>
              </template>

              <button type="submit"
                class="cursor-pointer rounded-lg w-full py-2.5 mt-2 bg-gradient-to-r from-[#dc5b41] to-[#e66a4f] text-white font-semibold shadow-lg shadow-[#dc5b41]/20 hover:opacity-95 transition">
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
import BaseText from '@/components/inputs/BaseText.vue'
import { DEFAULT_MENU_LANGUAGE } from '@/constants/menuLanguages'
import type { ICategory } from '@/types/menu'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import MenuLanguageTabs from './MenuLanguageTabs.vue'
import {
  buildCategoryPayload,
  categoryTranslationsFromCategory,
  emptyCategoryTranslations,
  filledTranslationCodes,
  hasUkrainianTranslation,
  type CategoryTranslationsForm,
} from '@/features/dashboard/utils/categoryTranslations'

const props = withDefaults(
  defineProps<{
    text: string
    error: string
    multilingual?: boolean
  }>(),
  { multilingual: false },
)

const { t, te } = useI18n()
const open = defineModel('openManage')
const category = defineModel<ICategory>('category')
const emit = defineEmits<{
  (e: 'handleProcess', value: ICategory): void
}>()

const data = reactive<ICategory>({
  name: '',
  description: '',
  id: '',
  ownerId: '',
})

const activeLang = ref(DEFAULT_MENU_LANGUAGE)
const translations = reactive<CategoryTranslationsForm>(emptyCategoryTranslations())
const formData = reactive({ name: '' })
const ukSubmitAttempted = ref(false)

const syncFormFromActiveLang = () => {
  if (props.multilingual) {
    formData.name = translations[activeLang.value].name
    return
  }
  formData.name = data.name
}

const syncActiveLangFromForm = () => {
  if (props.multilingual) {
    translations[activeLang.value].name = formData.name
  }
}

const isUkrainianTab = computed(
  () => props.multilingual && activeLang.value === DEFAULT_MENU_LANGUAGE,
)

const rules = computed(() => ({
  name: isUkrainianTab.value || !props.multilingual ? { required } : {},
}))

const v$ = useVuelidate(rules, formData)

const isEditMode = computed(() => !!category.value?.id)
const filledLanguages = computed(() => filledTranslationCodes(translations))

const showInputError = computed(() => {
  if (props.multilingual) {
    if (isUkrainianTab.value) {
      return (v$.value.name.$error && v$.value.name.$dirty) || ukSubmitAttempted.value
    }
    return ukSubmitAttempted.value && !hasUkrainianTranslation(translations)
  }
  return v$.value.name.$error && v$.value.name.$dirty
})

const inputErrorMessage = computed(() => {
  if (!showInputError.value) return ''

  if (props.multilingual) {
    return t('dashboard.categories.ukNameRequired')
  }

  const key = 'errors.name.required'
  return te(key) ? t(key) : t('dashboard.categories.ukNameRequired')
})

const closeModal = () => {
  open.value = false
  document.body.style.overflow = ''
}

const handleNextStep = async () => {
  v$.value.$touch()
  syncActiveLangFromForm()

  if (props.multilingual) {
    if (!hasUkrainianTranslation(translations)) {
      ukSubmitAttempted.value = true
      activeLang.value = DEFAULT_MENU_LANGUAGE
      syncFormFromActiveLang()
      await v$.value.$validate()
      return
    }

    if (isUkrainianTab.value) {
      const isFormCorrect = await v$.value.$validate()
      if (!isFormCorrect) return
    }
  } else {
    const isFormCorrect = await v$.value.$validate()
    if (!isFormCorrect) return
  }

  let payload: ICategory

  if (props.multilingual) {
    payload = buildCategoryPayload({ ...data }, translations)
  } else {
    payload = { ...data, name: formData.name.trim() }
    delete payload.translations
  }

  closeModal()
  emit('handleProcess', payload)
}

const syncDataFromCategory = (categoryValue: ICategory) => {
  data.name = ''
  data.description = ''
  data.id = ''
  data.ownerId = ''
  delete data.translations

  Object.assign(data, categoryValue)

  if (props.multilingual) {
    const synced = categoryTranslationsFromCategory(categoryValue)
    for (const code of Object.keys(synced)) {
      translations[code] = { ...synced[code] }
    }
    activeLang.value = DEFAULT_MENU_LANGUAGE
  }

  ukSubmitAttempted.value = false
  syncFormFromActiveLang()
}

watch(
  category,
  (newCategory) => {
    if (newCategory) {
      syncDataFromCategory(newCategory)
    }
  },
  { deep: true, immediate: true },
)

watch(open, (isOpen) => {
  if (isOpen && category.value) {
    syncDataFromCategory(category.value)
    v$.value.$reset()
  }
  if (!isOpen) {
    ukSubmitAttempted.value = false
  }
})

watch(
  () => formData.name,
  (value) => {
    if (props.multilingual) {
      translations[activeLang.value].name = value
      if (activeLang.value === DEFAULT_MENU_LANGUAGE && value.trim()) {
        ukSubmitAttempted.value = false
      }
    }
  },
)

watch(activeLang, () => {
  if (!props.multilingual) return
  syncFormFromActiveLang()
  v$.value.$reset()
})
</script>

<style scoped>
.field-with-error {
  display: flex;
  flex-direction: column;
}

.field-error-slot {
  min-height: 1.125rem;
  margin-top: 0.25rem;
  padding-left: 0.125rem;
  text-align: left;
  font-size: 0.6875rem;
  line-height: 1.125rem;
  font-weight: 500;
  color: #f87171;
}

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
