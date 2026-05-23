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
        class="fixed inset-0 flex items-center justify-center bg-black/70 z-1000 backdrop-blur-[6px] p-4"
      >
        <div
          class="premium-dish-modal relative border border-[#dc5b41] w-full max-w-xl max-h-[90vh] rounded-2xl shadow-2xl bg-black/85 overflow-hidden flex flex-col"
        >
          <header class="flex-shrink-0 relative px-6 pt-6 pb-4 border-b border-[#2a2930]/80">
            <button
              type="button"
              class="cursor-pointer absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
              @click="closeModal"
            >
              ✕
            </button>

            <h2 class="text-2xl font-semibold text-white text-center pr-8">
              {{ t(text) }}
            </h2>
            <p class="text-gray-400 text-sm text-center mt-2 max-w-md mx-auto leading-relaxed">
              {{ t('dashboard.dish.multilingualHint') }}
            </p>
          </header>

          <div class="flex-1 overflow-y-auto px-6 py-5 custom-scrollbar">
            <form class="premium-dish-form" @submit.prevent="handleNextStep" autocomplete="off">
              <section class="form-section">
                <h3 class="form-section__title">{{ t('dashboard.dish.sectionGeneral') }}</h3>

                <div class="form-section__body">
                  <div class="form-field form-field--full">
                    <BaseDragFile :url="data.image" :v="v$.image" @update="handleImageUpdate" />
                  </div>

                  <div class="form-field">
                    <label class="form-field__label">{{ priceFieldLabel }}</label>
                    <div class="form-field__control">
                      <BaseText
                        v-model="formData.price"
                        :v="v$.price"
                        type="price"
                        :error="error"
                        autocomplete="off"
                      />
                    </div>
                    <p class="field-error-slot" aria-live="polite">
                      <span v-show="v$.price.$error && v$.price.$dirty">{{ priceErrorMessage }}</span>
                    </p>
                  </div>

                  <div class="form-row">
                    <div class="form-field">
                      <label class="form-field__label">{{ t('dashboard.tableHead.category') }}</label>
                      <div class="form-field__control form-field__control--select">
                        <BaseSelect
                          v-model:category="selectedCategoryLabel"
                          :all-selections="categoryLabels"
                          type="dashboard.tableHead.category"
                          :v="v$.category"
                        />
                      </div>
                      <p class="field-error-slot" aria-live="polite">
                        <span v-show="v$.category.$error && v$.category.$dirty">{{
                          categoryErrorMessage
                        }}</span>
                      </p>
                    </div>

                    <div class="form-field">
                      <label class="form-field__label">{{ t('dashboard.availability') }}</label>
                      <div class="form-field__control form-field__control--select">
                        <BaseAvailabilitySelect
                          v-model:availability="formData.isAvailable"
                          :all-selections="availabilityOptions"
                          type="dashboard.availability"
                          :v="v$.isAvailable"
                        />
                      </div>
                      <p class="field-error-slot" aria-live="polite">
                        <span v-show="v$.isAvailable.$error && v$.isAvailable.$dirty">{{
                          availabilityErrorMessage
                        }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section class="form-section">
                <h3 class="form-section__title">{{ t('dashboard.dish.sectionTranslations') }}</h3>
                <p class="form-section__hint">{{ t('dashboard.dish.translationsHint') }}</p>

                <MenuLanguageTabs v-model="activeLang" :filled-languages="filledLanguages" class="mt-4" />

                <div class="translation-panel mt-4">
                  <div class="form-field">
                    <label class="form-field__label">
                      {{ t('inputs.name') }}
                      <span v-if="isUkrainianTab" class="form-field__required">*</span>
                    </label>
                    <div class="form-field__control">
                      <BaseText
                        v-model="formData.name"
                        :v="v$.name"
                        type="name"
                        :error="error"
                        autocomplete="off"
                      />
                    </div>
                    <p class="field-error-slot" aria-live="polite">
                      <span v-show="showNameError">{{ nameErrorMessage }}</span>
                    </p>
                  </div>

                  <div class="form-field">
                    <label class="form-field__label">
                      {{ t('inputs.description') }}
                      <span class="form-field__optional">
                        ({{ t('dashboard.dish.optionalDescription') }})
                      </span>
                    </label>
                    <div class="form-field__control">
                      <BaseTextarea
                        v-model="formData.description"
                        :v="v$.description"
                        type="description"
                        :rows="3"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <BaseButton
                type="submit"
                variant="gradient"
                block
                :scale-on-hover="false"
                class="shadow-lg shadow-[#dc5b41]/20 hover:opacity-95"
                :text="isEditMode ? t('button.edit') : t('button.add')"
              />
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseAvailabilitySelect from '@/components/inputs/BaseAvailabilitySelect.vue'
import BaseDragFile from '@/components/inputs/BaseDragFile.vue'
import BaseSelect from '@/components/inputs/BaseSelect.vue'
import BaseText from '@/components/inputs/BaseText.vue'
import BaseTextarea from '@/components/inputs/BaseTextarea.vue'
import { DEFAULT_MENU_LANGUAGE } from '@/constants/menuLanguages'
import MenuLanguageTabs from '@/features/dashboard/components/general/MenuLanguageTabs.vue'
import { getCategoryDisplayName } from '@/features/dashboard/utils/categoryApi'
import {
  buildDishPayload,
  dishTranslationsFromDish,
  emptyDishTranslations,
  filledDishTranslationCodes,
  hasUkrainianDishTranslation,
  type DishTranslationsForm,
} from '@/features/dashboard/utils/dishTranslations'
import { useDashboardCurrency } from '@/features/dashboard/composables/useDashboardCurrency'
import { useCategoriesDashboardStore } from '@/stores/categoriesDashboard'
import type { IDish } from '@/types/menu'
import useVuelidate from '@vuelidate/core'
import { numeric, required } from '@vuelidate/validators'
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{ text: string; error: string }>()

const { t, te } = useI18n()
const { priceFieldLabel } = useDashboardCurrency()
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
const categoriesDashboardStore = useCategoriesDashboardStore()

const activeLang = ref(DEFAULT_MENU_LANGUAGE)
const translations = reactive<DishTranslationsForm>(emptyDishTranslations())
const ukSubmitAttempted = ref(false)

const formData = reactive({
  name: '',
  description: '',
  image: '' as string | File,
  price: undefined as number | undefined,
  category: '',
  isAvailable: 'available' as 'available' | 'unavailable',
})

const categoryLabels = computed(() =>
  categoriesDashboardStore.categories.map((cat) =>
    getCategoryDisplayName(cat, activeLang.value),
  ),
)

const selectedCategoryLabel = computed({
  get: () => {
    if (!formData.category) return ''
    const cat = categoriesDashboardStore.categories.find((c) => c.id === formData.category)
    return cat ? getCategoryDisplayName(cat, activeLang.value) : ''
  },
  set: (label: string) => {
    const cat = categoriesDashboardStore.categories.find(
      (c) => getCategoryDisplayName(c, activeLang.value) === label,
    )
    formData.category = cat?.id ?? ''
  },
})

const isUkrainianTab = computed(() => activeLang.value === DEFAULT_MENU_LANGUAGE)

const rules = computed(() => ({
  name: isUkrainianTab.value ? { required } : {},
  description: {},
  image: { required },
  price: { required, numeric },
  category: { required },
  isAvailable: { required },
}))

const v$ = useVuelidate(rules, formData)

const isEditMode = computed(() => !!dish.value?.id)
const filledLanguages = computed(() => filledDishTranslationCodes(translations))

const showNameError = computed(() => {
  if (isUkrainianTab.value) {
    return (v$.value.name.$error && v$.value.name.$dirty) || ukSubmitAttempted.value
  }
  return ukSubmitAttempted.value && !hasUkrainianDishTranslation(translations)
})

const nameErrorMessage = computed(() =>
  showNameError.value ? t('dashboard.dish.ukNameRequired') : '',
)

const fieldError = (path: string) => {
  const key = `errors.${path}.required`
  return te(key) ? t(key) : ''
}

const priceErrorMessage = computed(() => fieldError('price'))
const categoryErrorMessage = computed(() => fieldError('category'))
const availabilityErrorMessage = computed(() => fieldError('isAvailable'))

const syncLangFormFromActive = () => {
  formData.name = translations[activeLang.value].name
  formData.description = translations[activeLang.value].description
}

const syncActiveLangFromForm = () => {
  translations[activeLang.value].name = formData.name
  translations[activeLang.value].description = formData.description
}

const closeModal = () => {
  open.value = false
  document.body.style.overflow = ''
}

const handleImageUpdate = (image: File) => {
  data.image = image
  formData.image = image
}

const handleNextStep = async () => {
  v$.value.$touch()
  syncActiveLangFromForm()

  if (!hasUkrainianDishTranslation(translations)) {
    ukSubmitAttempted.value = true
    activeLang.value = DEFAULT_MENU_LANGUAGE
    syncLangFormFromActive()
    await v$.value.$validate()
    return
  }

  if (isUkrainianTab.value) {
    const nameValid = await v$.value.name.$validate()
    if (!nameValid) return
  }

  const sharedValid = await Promise.all([
    v$.value.image.$validate(),
    v$.value.price.$validate(),
    v$.value.category.$validate(),
    v$.value.isAvailable.$validate(),
  ])
  if (!sharedValid.every(Boolean)) return

  const payload = buildDishPayload(
    { ...data },
    {
      image: formData.image,
      price: formData.price,
      category: formData.category,
      isAvailable: formData.isAvailable,
    },
    translations,
  )

  closeModal()
  emit('handleProcess', payload)
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
  delete data.translations

  Object.assign(data, dishValue)

  formData.image = data.image
  formData.price = data.price
  formData.isAvailable = data.isAvailable

  if (data.category) {
    const byId = categoriesDashboardStore.categories.find((c) => c.id === data.category)
    formData.category = byId?.id ?? data.category
  } else {
    formData.category = ''
  }

  const synced = dishTranslationsFromDish(dishValue)
  for (const code of Object.keys(synced)) {
    translations[code] = { ...synced[code] }
  }

  activeLang.value = DEFAULT_MENU_LANGUAGE
  ukSubmitAttempted.value = false
  syncLangFormFromActive()
}

watch(
  dish,
  (newDish) => {
    if (newDish) syncDataFromDish(newDish)
  },
  { deep: true, immediate: true },
)

watch(open, async (isOpen) => {
  if (isOpen) {
    await categoriesDashboardStore.fetchCategories()
    if (dish.value) {
      syncDataFromDish(dish.value)
      v$.value.$reset()
    }
  } else {
    ukSubmitAttempted.value = false
  }
})

watch(
  () => formData.name,
  (value) => {
    translations[activeLang.value].name = value
    if (activeLang.value === DEFAULT_MENU_LANGUAGE && value.trim()) {
      ukSubmitAttempted.value = false
    }
  },
)

watch(
  () => formData.description,
  (value) => {
    translations[activeLang.value].description = value
  },
)

watch(activeLang, () => {
  syncLangFormFromActive()
  v$.value.$reset()
})

watch(
  () => data.image,
  (newImage) => {
    formData.image = newImage
  },
)
</script>

<style scoped>
.premium-dish-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-section__title {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #dc5b41;
}

.form-section__hint {
  font-size: 0.8125rem;
  line-height: 1.45;
  color: #9ca3af;
  margin: 0;
}

.form-section__body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #2a2930;
  background: linear-gradient(160deg, rgba(26, 25, 31, 0.95) 0%, rgba(18, 17, 24, 0.9) 100%);
}

.translation-panel {
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #2a2930;
  background: linear-gradient(160deg, rgba(26, 25, 31, 0.95) 0%, rgba(18, 17, 24, 0.9) 100%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 540px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  min-width: 0;
}

.form-field--full {
  width: 100%;
}

.form-field__label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #d1d5db;
  padding-left: 0.125rem;
}

.form-field__required {
  color: #dc5b41;
  margin-left: 0.125rem;
}

.form-field__optional {
  font-size: 0.75rem;
  font-weight: 400;
  color: #6b7280;
}

.form-field__control {
  width: 100%;
}

.form-field__control--select :deep(> div) {
  width: 100%;
  justify-content: stretch;
}

.form-field__control--select :deep(> div > div) {
  width: 100%;
  max-width: none;
  min-height: 2.75rem;
}

.field-error-slot {
  min-height: 1.125rem;
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
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #dc5b34;
}
</style>
