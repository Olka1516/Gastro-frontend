<template>
  <div class="flex h-full w-full flex-col">
    <div
      v-if="variant === 'list'"
      class="my-auto flex w-full flex-col justify-center gap-1.5 py-0.5"
    >
      <div v-for="row in 2" :key="row" class="flex w-full items-center gap-1.5">
        <div class="h-5 w-5 shrink-0 self-center rounded-sm bg-white/22" />
        <div class="flex min-w-0 flex-1 flex-col justify-center gap-1">
          <div class="h-1 w-full rounded-full bg-white/28" />
          <div class="h-1 w-2/3 rounded-full bg-white/12" />
        </div>
      </div>
    </div>

    <div
      v-else-if="variant === 'grid'"
      class="grid h-full w-full grid-cols-2 grid-rows-2 gap-1 p-0.5"
    >
      <div v-for="i in 4" :key="i" class="min-h-0 rounded-md bg-white/18 ring-1 ring-white/5" />
    </div>

    <div v-else class="my-auto flex w-full flex-col justify-center gap-1.5">
      <div class="h-10 w-full shrink-0 rounded-md bg-white/24 ring-1 ring-white/5" />
      <div class="mx-auto h-1 w-3/4 rounded-full bg-white/14" />
      <div class="mx-auto h-1 w-1/2 rounded-full bg-white/10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MenuDishLayout } from '@/constants/menuDishLayout'

defineProps<{ variant: MenuDishLayout }>()
</script>
