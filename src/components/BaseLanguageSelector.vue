<template>
  <div ref="rootRef" class="relative w-fit shrink-0 self-start">
    <button ref="triggerRef" type="button" class="menu-lang-trigger" :aria-expanded="open" aria-haspopup="listbox"
      :aria-label="ariaLabel" @click="open = !open">
      <span class="menu-lang-trigger__flag" aria-hidden="true">{{ activeLanguage?.flag }}</span>
      <span class="menu-lang-trigger__code">{{ activeLanguage?.code.toUpperCase() }}</span>
      <span class="menu-lang-trigger__chevron" :class="{ 'menu-lang-trigger__chevron--open': open }" aria-hidden="true">
        ▾
      </span>
    </button>

    <Teleport v-if="usesFixedDropdown" to="body">
      <Transition enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 scale-95 translate-y-1" enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95 translate-y-1">
        <ul v-if="open" ref="dropdownRef" class="menu-lang-list menu-lang-list--fixed" role="listbox"
          :aria-label="ariaLabel" :style="fixedDropdownStyle">
          <li v-for="lang in availableLanguages" :key="lang.code" role="option"
            :aria-selected="lang.code === selectedCode">
            <button type="button" class="menu-lang-option"
              :class="{ 'menu-lang-option--active': lang.code === selectedCode }" @click="selectLanguage(lang.code)">
              <span aria-hidden="true">{{ lang.flag }}</span>
              <span class="menu-lang-option__label">{{ lang.nativeLabel }}</span>
              <span class="menu-lang-option__code">{{ lang.code.toUpperCase() }}</span>
            </button>
          </li>
        </ul>
      </Transition>
    </Teleport>

    <Transition v-else enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95 -translate-y-1" enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95">
      <ul v-if="open" class="menu-lang-list" role="listbox" :aria-label="ariaLabel">
        <li v-for="lang in availableLanguages" :key="lang.code" role="option"
          :aria-selected="lang.code === selectedCode">
          <button type="button" class="menu-lang-option"
            :class="{ 'menu-lang-option--active': lang.code === selectedCode }" @click="selectLanguage(lang.code)">
            <span aria-hidden="true">{{ lang.flag }}</span>
            <span class="menu-lang-option__label">{{ lang.nativeLabel }}</span>
            <span class="menu-lang-option__code">{{ lang.code.toUpperCase() }}</span>
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { MENU_LANGUAGES, getMenuLanguage, type MenuLanguage } from '@/constants/menuLanguages'
import { useShowcaseMenuLanguageStore } from '@/stores/showcaseMenuLanguageStore'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const UI_LANGUAGE_CODES = ['uk', 'en'] as const
const UI_LOCALE_STORAGE_KEY = 'gastro-ui-locale'
const DROPDOWN_WIDTH_PX = 11.5 * 16
const DROPDOWN_GAP_PX = 6

const props = withDefaults(
  defineProps<{
    mode?: 'menu' | 'ui'
    /** Opens above the trigger; uses fixed positioning (needed inside clip-path sidebars). */
    placement?: 'above' | 'below'
  }>(),
  { mode: 'menu', placement: 'below' },
)

const { t, locale } = useI18n()
const menuLangStore = useShowcaseMenuLanguageStore()
const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLButtonElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const fixedDropdownStyle = ref<Record<string, string>>({})

const usesFixedDropdown = computed(() => props.placement === 'above')

const updateFixedDropdownPosition = () => {
  const trigger = triggerRef.value
  if (!trigger) return

  const rect = trigger.getBoundingClientRect()
  const left = Math.max(8, rect.left)

  fixedDropdownStyle.value = {
    position: 'fixed',
    left: `${left}px`,
    bottom: `${window.innerHeight - rect.top + DROPDOWN_GAP_PX}px`,
    top: 'auto',
    width: `${DROPDOWN_WIDTH_PX}px`,
    zIndex: '1102',
  }
}

let positionListenersAttached = false

const attachPositionListeners = () => {
  if (positionListenersAttached) return
  window.addEventListener('scroll', updateFixedDropdownPosition, true)
  window.addEventListener('resize', updateFixedDropdownPosition)
  positionListenersAttached = true
}

const detachPositionListeners = () => {
  if (!positionListenersAttached) return
  window.removeEventListener('scroll', updateFixedDropdownPosition, true)
  window.removeEventListener('resize', updateFixedDropdownPosition)
  positionListenersAttached = false
}

const uiLocaleToMenuCode = (value: string) => (value === 'ua' ? 'uk' : value === 'en' ? 'en' : 'uk')

const menuCodeToUiLocale = (code: string) => (code === 'uk' ? 'ua' : code)

const availableLanguages = computed<MenuLanguage[]>(() =>
  props.mode === 'ui'
    ? MENU_LANGUAGES.filter((lang) => UI_LANGUAGE_CODES.includes(lang.code as (typeof UI_LANGUAGE_CODES)[number]))
    : MENU_LANGUAGES,
)

const selectedCode = computed(() =>
  props.mode === 'ui' ? uiLocaleToMenuCode(locale.value) : menuLangStore.languageCode,
)

const activeLanguage = computed(() => getMenuLanguage(selectedCode.value))

const ariaLabel = computed(() =>
  props.mode === 'ui' ? t('landing.uiLanguage.label') : t('showcase.menuLanguage.label'),
)

const selectLanguage = (code: string) => {
  if (props.mode === 'ui') {
    const nextLocale = menuCodeToUiLocale(code)
    locale.value = nextLocale
    sessionStorage.setItem(UI_LOCALE_STORAGE_KEY, nextLocale)
  } else {
    menuLangStore.setLanguage(code)
  }
  open.value = false
}

const onDocumentClick = (event: MouseEvent) => {
  const target = event.target as Node
  if (rootRef.value?.contains(target) || dropdownRef.value?.contains(target)) return
  open.value = false
}

watch(
  () => props.mode,
  (mode) => {
    if (mode !== 'ui') return
    const stored = sessionStorage.getItem(UI_LOCALE_STORAGE_KEY)
    if (stored === 'ua' || stored === 'en') {
      locale.value = stored
    }
  },
  { immediate: true },
)

watch(open, async (isOpen) => {
  if (!usesFixedDropdown.value) return

  if (!isOpen) {
    detachPositionListeners()
    return
  }

  await nextTick()
  updateFixedDropdownPosition()
  attachPositionListeners()
})

onMounted(() => document.addEventListener('click', onDocumentClick))
onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
  detachPositionListeners()
})
</script>

<style scoped>
.menu-lang-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  height: 2.5rem;
  padding: 0 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #dc5b41;
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.menu-lang-trigger:hover {
  background: rgba(255, 255, 255, 0.06);
}

.menu-lang-trigger__flag {
  font-size: 1rem;
  line-height: 1;
}

.menu-lang-trigger__code {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.menu-lang-trigger__chevron {
  font-size: 0.625rem;
  opacity: 0.7;
  transition: transform 0.2s ease;
}

.menu-lang-trigger__chevron--open {
  transform: rotate(180deg);
}

.menu-lang-list--fixed {
  position: fixed;
  margin: 0;
}

.menu-lang-list {
  position: absolute;
  left: 0;
  top: calc(100% + 0.375rem);
  z-index: 50;
  width: 11.5rem;
  max-height: 16rem;
  overflow-y: auto;
  margin: 0;
  padding: 0.25rem;
  list-style: none;
  border-radius: 0.625rem;
  border: 1px solid #2a2930;
  background: #121118;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
}

.menu-lang-list::-webkit-scrollbar {
  width: 4px;
}

.menu-lang-list::-webkit-scrollbar-thumb {
  background: #dc5b41;
  border-radius: 999px;
}

.menu-lang-option {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.5rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  color: #e5e7eb;
  font-size: 0.75rem;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s ease;
}

.menu-lang-option:hover {
  background: rgba(220, 91, 65, 0.12);
}

.menu-lang-option--active {
  background: rgba(220, 91, 65, 0.2);
  color: #fff;
}

.menu-lang-option__label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.menu-lang-option__code {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #9ca3af;
}
</style>
