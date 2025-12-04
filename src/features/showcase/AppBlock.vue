<template>
  <div class="min-h-screen bg-[#0f0f11]">
    <!-- Loading State -->
    <div
      v-if="loading"
      class="fixed inset-0 bg-[#0f0f11]/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <BaseLoader />
    </div>

    <!-- Not Authorized State -->
    <div
      v-else-if="!store.isUserAuthorized"
      class="min-h-screen flex items-center justify-center px-8"
    >
      <div class="text-center">
        <h2 class="text-white text-2xl font-bold mb-4">{{ t('showcase.notAuthorized.title') }}</h2>
        <p class="text-gray-400">{{ t('showcase.notAuthorized.description') }}</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center px-8">
      <div class="text-center">
        <h2 class="text-white text-2xl font-bold mb-4">{{ t('showcase.error.title') }}</h2>
        <p class="text-gray-400">{{ t('showcase.error.description') }}</p>
      </div>
    </div>

    <!-- Show Plan Page -->
    <div v-else-if="store.planName && store.status === EStatus.complete">
      <component :is="plans[store.planName]" />
    </div>

    <!-- Payment Pending -->
    <div
      v-else-if="store.planName && store.status === EStatus.pending"
      class="min-h-screen flex items-center justify-center px-8"
    >
      <div class="text-center">
        <h2 class="text-white text-2xl font-bold mb-4">{{ t('showcase.pending.title') }}</h2>
        <p class="text-gray-400">{{ t('showcase.pending.description') }}</p>
      </div>
    </div>

    <!-- No Plan State -->
    <div v-else class="min-h-screen flex items-center justify-center px-8">
      <div class="text-center">
        <h2 class="text-white text-2xl font-bold mb-4">{{ t('showcase.noPlan.title') }}</h2>
        <p class="text-gray-400">{{ t('showcase.noPlan.description') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseLoader from '@/components/BaseLoader.vue'
import { useUserStore } from '@/stores'
import { EStatus } from '@/types'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { plans } from './constants/plans'

const { t } = useI18n()
const loading = ref(true)
const error = ref(false)
const store = useUserStore()

onMounted(async () => {
  try {
    await store.getUserDetails()
    loading.value = false
  } catch (err) {
    console.error('Failed to load user data:', err)
    loading.value = false
    error.value = true
  }
})
</script>

<style scoped></style>
