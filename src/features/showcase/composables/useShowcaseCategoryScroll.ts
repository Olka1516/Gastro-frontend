import type { ComponentPublicInstance, Ref } from 'vue'
import { nextTick, onUnmounted, ref, watch } from 'vue'

type CategoryWithId = { id: string }

type SectionTarget = Element | ComponentPublicInstance | null

const CLICK_SCROLL_GUARD_MS = 700

const unwrapSectionElement = (target: SectionTarget): HTMLElement | null => {
  if (!target) return null
  if (target instanceof HTMLElement) return target
  const root = (target as ComponentPublicInstance).$el
  return root instanceof HTMLElement ? root : null
}

export function useShowcaseCategoryScroll(categories: Ref<CategoryWithId[]>) {
  const activeCategoryId = ref<string | null>(null)
  const sectionById = new Map<string, HTMLElement>()
  let isListening = false
  let ignoreScrollSpyUntil = 0

  const getScrollLine = () => {
    const header = document.querySelector('header')
    const tabs = document.querySelector('[data-showcase-category-tabs]')
    const tabsHeight = tabs?.getBoundingClientRect().height ?? 0
    return (header?.offsetHeight ?? 80) + tabsHeight + 12
  }

  const syncActiveTab = () => {
    if (Date.now() < ignoreScrollSpyUntil) return

    const list = categories.value
    if (list.length === 0) {
      activeCategoryId.value = null
      return
    }

    const line = getScrollLine()
    let nextActiveId = list[0].id

    for (const category of list) {
      const section = sectionById.get(category.id)
      if (!section) continue
      if (section.getBoundingClientRect().top <= line) {
        nextActiveId = category.id
      }
    }

    activeCategoryId.value = nextActiveId
  }

  const registerSection = (categoryId: string, target: SectionTarget) => {
    const element = unwrapSectionElement(target)
    if (element) {
      sectionById.set(categoryId, element)
    } else {
      sectionById.delete(categoryId)
    }
    syncActiveTab()
  }

  const scrollToCategory = (categoryId: string) => {
    activeCategoryId.value = categoryId
    ignoreScrollSpyUntil = Date.now() + CLICK_SCROLL_GUARD_MS

    const section = sectionById.get(categoryId)
    if (!section) return

    section.scrollIntoView({ behavior: 'smooth', block: 'start' })

    window.setTimeout(() => {
      ignoreScrollSpyUntil = 0
      syncActiveTab()
    }, CLICK_SCROLL_GUARD_MS + 50)
  }

  const onScroll = () => {
    syncActiveTab()
  }

  const start = async () => {
    await nextTick()
    await nextTick()
    syncActiveTab()

    if (isListening) return
    window.addEventListener('scroll', onScroll, { passive: true })
    isListening = true
  }

  const stop = () => {
    if (!isListening) return
    window.removeEventListener('scroll', onScroll)
    isListening = false
    sectionById.clear()
    ignoreScrollSpyUntil = 0
  }

  watch(
    categories,
    async () => {
      await nextTick()
      syncActiveTab()
    },
    { deep: true },
  )

  onUnmounted(stop)

  return {
    activeCategoryId,
    registerSection,
    scrollToCategory,
    start,
    stop,
    attachScrollListener: start,
    detachScrollListener: stop,
  }
}
