<template>
  <div class="flex items-center justify-center gap-2">
    <!-- Prev button -->
    <button
      class="cursor-pointer px-2 py-1 text-white"
      :disabled="paginationPage === 1"
      @click="setActivePage(paginationPage - 1)"
    >
      ‹
    </button>

    <!-- Numbers -->
    <button
      v-for="(page, index) in getNumbers"
      :key="index"
      class="cursor-pointer px-3 py-1 rounded"
      :class="page === paginationPage ? 'bg-[#ccc] text-black' : 'text-white'"
      @click="typeof page === 'number' && setActivePage(page)"
    >
      {{ page }}
    </button>

    <!-- Next button -->
    <button
      class="cursor-pointer px-2 py-1 text-white"
      :disabled="paginationPage === totalPages"
      @click="setActivePage(paginationPage + 1)"
    >
      ›
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ size: number }>()
const datas = defineModel<any[]>('datas', { default: [] })
const paginationPage = defineModel<number>('paginationPage', { default: 1 })

const dots = '...'

// total pages
const totalPages = computed(() => Math.ceil(datas.value.length / props.size))

const getNumbers = computed(() => {
  const pages: (number | string)[] = []
  const current = paginationPage.value
  const total = totalPages.value

  if (total <= 5) {
    // Show all if few pages
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    // Always show first
    pages.push(1)

    if (current > 3) pages.push(dots)

    // Current + neighbors
    for (let i = current - 1; i <= current + 1; i++) {
      if (i > 1 && i < total) pages.push(i)
    }

    if (current < total - 2) pages.push(dots)

    // Always show last
    pages.push(total)
  }

  return pages
})

const setActivePage = (value: number) => {
  if (value >= 1 && value <= totalPages.value) {
    paginationPage.value = value
  }
}
</script>
