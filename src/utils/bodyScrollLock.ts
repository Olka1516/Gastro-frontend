import { onUnmounted, watch, type MaybeRefOrGetter, toValue } from 'vue'

let lockCount = 0

const applyLock = () => {
  const html = document.documentElement
  html.style.overflow = 'hidden'
  html.style.overflowX = 'hidden'
}

const applyUnlock = () => {
  const html = document.documentElement
  html.style.overflow = ''
  html.style.overflowX = ''
}

export const lockBodyScroll = () => {
  if (lockCount === 0) {
    applyLock()
  }
  lockCount++
}

export const unlockBodyScroll = () => {
  if (lockCount <= 0) {
    return
  }
  lockCount--
  if (lockCount === 0) {
    applyUnlock()
  }
}

export const useBodyScrollLock = (source: MaybeRefOrGetter<unknown>) => {
  let isLockedByThis = false

  watch(
    () => !!toValue(source),
    (locked) => {
      if (locked && !isLockedByThis) {
        lockBodyScroll()
        isLockedByThis = true
      } else if (!locked && isLockedByThis) {
        unlockBodyScroll()
        isLockedByThis = false
      }
    },
    { immediate: true },
  )

  onUnmounted(() => {
    if (isLockedByThis) {
      unlockBodyScroll()
      isLockedByThis = false
    }
  })
}
