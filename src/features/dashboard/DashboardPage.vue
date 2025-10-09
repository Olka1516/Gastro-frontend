<template>
  <div class="min-h-screen bg-[#0f0f11]">
    <div v-if="loading">Loading...</div>
    <div v-if="!store.isUserAuthorized">SignIn or SignUp</div>
    <div v-else-if="error">Error</div>
    <div v-else-if="store.status === EStatus.pending && store.planName !== EPlan.free">
      wait until payment will be success
    </div>
    <div v-else>
      <component :is="plans[store.planName!]" :userInfo="store.$state" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores'
import { EPlan, EStatus } from '@/types'
import { onMounted, ref } from 'vue'
import { plans } from './constants'

const loading = ref(true)
const error = ref(false)
const store = useUserStore()

onMounted(async () => {
  try {
    await store.getUserDetails()
    loading.value = false
  } catch (err) {
    console.log(err)
    loading.value = false
    error.value = true
  }
})
</script>

<style scoped></style>
