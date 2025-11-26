<template>
  <div
    id="drop-area"
    @dragenter="handleDragEnter"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
    class="flex items-center justify-center text-center w-full h-[280px] border-2 border-dashed rounded-xl transition-colors duration-200 max-[1200px]:p-1 max-[1200px]:grid max-[1200px]:w-[60%] max-[540px]:w-full"
    :class="{
      'border-red-500': isInfoInvalid,
      'border-[#dc5b41]': isHighlighted,
      'border-white': !isInfoInvalid && !isHighlighted,
    }"
  >
    <form
      v-if="!isImageChoosen"
      class="flex flex-col justify-center items-center gap-5 px-6 max-[1200px]:p-6"
    >
      <p class="text-white">{{ text }}</p>
      <input type="file" id="fileElem" accept="image/*" @change="handleFileInput" class="hidden" />
      <label
        for="fileElem"
        class="border border-[#dc5b41] text-white py-2 px-4 cursor-pointer transition"
      >
        Choose image
      </label>
    </form>

    <div v-if="isImageChoosen || props.url">
      <div id="gallery">
        <img
          v-if="previewUrl"
          :src="previewUrl as string"
          id="previewImage"
          class="w-[calc(100vw-1200px)] h-[270px] rounded-2xl object-cover object-center max-[1200px]:w-full max-[1200px]:h-[240px]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'

const props = defineProps<{
  v?: {
    $invalid: boolean
    $dirty: boolean
  }
  url: string | File | null
}>()

const text = ref(
  'Upload images using the file selection dialog or by dragging the desired images into the highlighted area',
)

const isHighlighted = ref(false)
const isImageChoosen = ref(false)
const emit = defineEmits<{ (e: 'update', value: File): void }>()
const isHeavy = ref(false)
const uploadedFile = ref<File | null>(null)
const previewUrl = ref(props.url || '')

const handleDragEnter = (e: DragEvent) => {
  preventDefaults(e)
  isHighlighted.value = true
}

const handleDragOver = (e: DragEvent) => {
  preventDefaults(e)
  isHighlighted.value = true
}

const handleDragLeave = (e: DragEvent) => {
  preventDefaults(e)
  isHighlighted.value = false
}

const handleDrop = (e: DragEvent) => {
  preventDefaults(e)
  isHighlighted.value = false
  const dt = e.dataTransfer
  if (!dt) return
  const files = dt.files
  handleFiles(files)
}

const handleFileInput = (files: Event) => {
  if (!(files.target instanceof HTMLInputElement) || !files.target.files) return
  handleFiles(files.target.files)
}

const preventDefaults = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
}

const handleFiles = (files: FileList) => {
  if (10485760 < files[0].size) {
    isHeavy.value = true
    text.value = 'The image size is too large, please choose an image less than 10 MB'
    return
  }
  if (!files[0].type.includes('image')) {
    isHeavy.value = true
    text.value = 'This is not a photo, please upload a picture'
    return
  }
  uploadedFile.value = files[0]
  uploadFile(files[0])
  previewFile(files[0])
}

const uploadFile = (file: File) => {
  emit('update', file)
}

const previewFile = (file: File) => {
  isImageChoosen.value = true
  previewUrl.value = URL.createObjectURL(file)
}

const setImage = () => {
  if (!props.url) return
  if (typeof props.url === 'string') {
    isImageChoosen.value = true
    previewUrl.value = props.url
  }
}

onMounted(() => {
  setImage()
})

watch(
  () => props.url,
  () => {
    setImage()
  },
)

const isInfoInvalid = computed(() => {
  if (isHeavy.value) return isHeavy.value
  if (!props.v) return false
  return props.v.$invalid && props.v.$dirty && !isImageChoosen.value
})
</script>
