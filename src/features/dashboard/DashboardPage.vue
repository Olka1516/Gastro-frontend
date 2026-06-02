<template>
  <div class="min-h-screen bg-[#0f0f11]">
    <div v-if="loading">Loading...</div>
    <template v-else>
      <AuthTeleportModals v-model:open="authModalOpen" v-model:activeModal="activeModal"
        @handleProcess="onAuthSuccess" />
      <div v-if="error">
        <div class="w-screen h-screen flex items-center justify-center bg-white">
          <h1 class="text-4xl font-bold">500 error</h1>
        </div>
      </div>
      <div v-else-if="store.status === EStatus.pending && store.planName !== EPlan.free">
        <div class="w-screen h-screen flex items-center justify-center">
          <div :class="[
            MODAL_SURFACE_CLASS,
            'flex items-center justify-center border border-[#dc5b41] rounded-lg p-8 min-h-[200px] m-8',
          ]">
            <h2 class="text-xl font-bold text-white text-center">
              {{ t('dashboard.pending.description') }}
            </h2>
          </div>
        </div>
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
import { useBodyScrollLock } from '@/utils/bodyScrollLock'
import { onMounted, ref } from 'vue'
import { plans } from './constants'
import { useI18n } from 'vue-i18n'
import { MODAL_SURFACE_CLASS } from '@/constants'

const { t } = useI18n()
const loading = ref(true)
const error = ref(false)
const authModalOpen = ref(false)
const activeModal = ref<ModalKey>('signUp')
const store = useUserStore()

useBodyScrollLock(authModalOpen)

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
    } else {
      console.log(err)
      error.value = true
    }
  } finally {
    loading.value = false
  }
})
</script>
