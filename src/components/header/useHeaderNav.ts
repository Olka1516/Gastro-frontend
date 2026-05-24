import { computed, isRef, ref, watch, type MaybeRefOrGetter, type Ref, toValue } from 'vue'
import { useRoute } from 'vue-router'

const normalizePath = (path: string) => path.replace(/\/$/, '') || '/'

export function useHeaderNav(
  activeSection: MaybeRefOrGetter<string> | Ref<string>,
  showcaseNavBasePath?: MaybeRefOrGetter<string | undefined>,
) {
  const route = useRoute()
  const active = ref(toValue(isRef(activeSection) ? activeSection.value : activeSection))

  watch(
    () => (isRef(activeSection) ? activeSection.value : toValue(activeSection)),
    (value) => {
      active.value = value
    },
  )

  const linkColor = (key: string) =>
    computed(() => (active.value === key ? 'text-[#dc5b41]' : 'text-white'))

  const showcaseNavTo = (nav: string) => {
    const base = toValue(showcaseNavBasePath)
    if (!base) return '/'
    const key = nav.toLowerCase()
    if (key === 'menu') return normalizePath(base)
    if (key === 'orders') return `${normalizePath(base)}/orders`
    if (key === 'reserve') return `${normalizePath(base)}/reserve`
    return { hash: `#${key}` }
  }

  const showcaseLinkClass = (nav: string) =>
    computed(() => {
      const base = toValue(showcaseNavBasePath)
      if (!base) return 'text-white'
      const path = normalizePath(route.path)
      const menuRoot = normalizePath(base)
      const key = nav.toLowerCase()
      if (key === 'menu') {
        return path === menuRoot ? 'text-[#dc5b41]' : 'text-white'
      }
      if (key === 'orders') {
        return path === `${menuRoot}/orders` ? 'text-[#dc5b41]' : 'text-white'
      }
      if (key === 'reserve') {
        return path === `${menuRoot}/reserve` ? 'text-[#dc5b41]' : 'text-white'
      }
      return 'text-white'
    })

  const setActiveNav = (nav: string) => {
    active.value = nav
  }

  return { linkColor, showcaseNavTo, showcaseLinkClass, setActiveNav }
}

export const HEADER_SIDEBAR_PANEL_ID = 'base-header-sidebar'
