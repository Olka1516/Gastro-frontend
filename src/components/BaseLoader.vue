<template>
  <div class="relative h-[150px] w-[150px] rounded-full loader">
    <div
      class="absolute left-1/4 top-1/4 h-1/2 w-1/2 rounded-full border border-black bg-[#dc5b41] animate-[showme_4s_infinite]"
    >
      <span
        class="absolute left-1/2 top-1/4 h-[20%] w-[20%] -translate-x-1/2 rounded-full bg-white animate-[showme_4s_infinite]"
      ></span>
      <span
        class="absolute left-1/2 top-[60%] h-[10%] w-[10%] -translate-x-1/2 rounded-full bg-white animate-[showme_4s_infinite]"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.loader::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  border: 1px solid white;
  animation: doitreverse 4s infinite;
}

.loader::after {
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  border: 1px solid white;
  animation: doit 4s infinite;
}

@keyframes doit {
  0% {
    transform: scale(1);
  }

  50% {
    border-radius: 20% 50%;
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes doitreverse {
  0% {
    transform: rotate(360deg);
  }

  50% {
    border-radius: 50% 20%;
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

@keyframes showme {
  0% {
    transform: scale(0.3);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.3);
  }
}
</style>
