<template>
  <div v-if="loading">Loading...</div>
  <div v-if="!store.isUserAuthorized">SignIn or SignUp</div>
  <div v-else-if="error">Error</div>
  <div v-else-if="store.status === EStatus.pending">wait until payment will be success</div>
  <div v-else>this is dashboard</div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores'
import { EStatus } from '@/types'
import { onMounted, ref } from 'vue'

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
