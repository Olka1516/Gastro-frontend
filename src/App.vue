<template>
  <RouterView />
</template>

<script setup lang="ts"></script>

<style>
@import 'tailwindcss';

html {
  scroll-behavior: smooth;
}

.Vue-Toastification__toast.success-toats {
  background-color: #b5f7a4fd;
  color: #000;
}

.Vue-Toastification__toast.error-toats {
  background-color: #f7a4a4fd;
  color: #000;
}
</style>
