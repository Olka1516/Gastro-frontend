<template>
  <div class="sticky top-20 z-40 pt-2 pb-8 sm:top-15 sm:pt-6">
    <nav data-showcase-category-tabs
      class="rounded-lg border border-[#2a2930]/90 bg-gradient-to-br from-[#1c1b22] to-[#121116] p-2 shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:p-2.5"
      :style="panelStyle" :aria-label="t('showcase.categoryTabsLabel')">
      <div ref="trackRef"
        class="flex gap-2 overflow-x-auto py-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button v-for="category in categories" :key="category.id" :ref="(el) => setTabRef(category.id, el)"
          type="button"
          class="shrink-0 text-white cursor-pointer rounded-lg border px-4 py-2.5 text-sm font-semibold tracking-tight transition-all duration-200 sm:px-5 sm:py-2.5"
          :class="isActive(category.id)
            ? 'border-transparent'
            : 'border-[#2a2930]/70 bg-[#0f0f11]/50 hover:border-[#3f3e47] hover:bg-[#141318]'
            " :style="isActive(category.id) ? activeTabStyle : undefined"
          :aria-current="isActive(category.id) ? 'true' : undefined" @click="emit('select', category.id)">
          {{ category.name }}
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    categories: { id: string; name: string }[]
    activeId: string | null
    accentColor?: string
    panelBackground?: string
  }>(),
  {
    accentColor: '#dc5b41',
    panelBackground: '',
  },
)

const emit = defineEmits<{
  (e: 'select', categoryId: string): void
}>()

const trackRef = ref<HTMLElement | null>(null)
const tabRefs = new Map<string, HTMLElement>()

const isActive = (categoryId: string) =>
  props.activeId != null && String(props.activeId) === String(categoryId)

const activeTabStyle = computed(() => ({
  backgroundColor: props.accentColor,
}))

const panelStyle = computed(() => {
  if (!props.panelBackground) return undefined
  return { background: props.panelBackground }
})

const setTabRef = (categoryId: string, el: unknown) => {
  const node = el as HTMLElement | null
  if (node) tabRefs.set(categoryId, node)
  else tabRefs.delete(categoryId)
}

const scrollActiveTabIntoView = async () => {
  if (!props.activeId) return
  await nextTick()
  const track = trackRef.value
  const tab = tabRefs.get(props.activeId)
  if (!track || !tab) return

  const tabLeft = tab.offsetLeft
  const tabWidth = tab.offsetWidth
  const trackWidth = track.clientWidth
  const targetScroll = tabLeft - trackWidth / 2 + tabWidth / 2

  track.scrollTo({ left: Math.max(0, targetScroll), behavior: 'smooth' })
}

watch(
  () => props.activeId,
  () => {
    scrollActiveTabIntoView()
  },
)
</script>
