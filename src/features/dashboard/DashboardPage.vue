<template>
  <div class="min-h-screen bg-[#0f0f11]">
    <div v-if="loading">Loading...</div>
    <template v-else>
      <AuthTeleportModals v-model:open="authModalOpen" v-model:activeModal="activeModal"
        @handleProcess="onAuthSuccess" />
      <div v-if="error">Error</div>
      <div v-else-if="store.status === EStatus.pending && store.planName !== EPlan.free">
        wait until payment will be success
      </div>
      <div v-else-if="store.isUserAuthorized">
        <component :is="plans[store.planName!]" :userInfo="store.$state" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import AuthTeleportModals from '@/components/modals/auth/AuthTeleportModals.vue'
import { useUserStore } from '@/stores'
import { EPlan, EStatus, type ModalKey } from '@/types'
import { isAxiosError } from 'axios'
import { onMounted, ref } from 'vue'
import { plans } from './constants'

const loading = ref(true)
const error = ref(false)
const authModalOpen = ref(false)
const activeModal = ref<ModalKey>('signUp')
const store = useUserStore()

const onAuthSuccess = async () => {
  try {
    await store.getUserDetails()
  } catch (err) {
    console.log(err)
    error.value = true
  }
}

onMounted(async () => {
  try {
    await store.getUserDetails()
  } catch (err) {
    const status = isAxiosError(err) ? err.response?.status : undefined
    if (status === 401 || status === 403) {
      authModalOpen.value = true
      document.body.style.overflow = 'hidden'
    } else {
      console.log(err)
      error.value = true
    }
  } finally {
    loading.value = false
  }
})
</script>

<style scoped></style>
