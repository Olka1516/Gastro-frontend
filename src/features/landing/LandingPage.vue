<template>
  <BaseHeader :limit="300" :navigations="navs" :activeSection />

  <template v-for="(section, i) in sections" :key="i">
    <template v-if="section.repeat">
      <component
        v-for="n in section.repeat"
        :is="section.component"
        :id="section.id"
        :key="`${section.id}-${n}`"
        v-bind="section.props(n)"
      />
    </template>

    <component v-else :is="section.component" :id="section.id" />
  </template>

  <BaseFooter />
</template>

<script setup lang="ts">
import BaseFooter from '@/components/BaseFooter.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import ContentBlock from './components/ContentBlock.vue'
import BaseCards from './components/BaseCards.vue'
import PhonesBlock from './components/PhonesBlock.vue'
import NumbersBlock from './components/NumbersBlock.vue'
import InfoBlock from './components/InfoBlock.vue'
import MapBlock from './components/MapBlock.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeSection = ref('')
const sections = [
  { id: 'home', component: ContentBlock },
  { id: 'phones', component: PhonesBlock },
  { id: 'numbers', component: NumbersBlock },
  {
    id: 'info',
    component: InfoBlock,
    repeat: 3,
    props: (n: number) => ({
      index: n,
      img: '',
      title: `landing.infoBlock.${n}.title`,
      description: `landing.infoBlock.${n}.description`,
      buttonText: 'button.buyNow',
    }),
  },
  { id: 'plans', component: BaseCards },
  { id: 'map', component: MapBlock },
]

const navs = sections.map((s) => s.id.charAt(0).toUpperCase() + s.id.slice(1))

const onScroll = () => {
  for (const id of navs) {
    const el = document.getElementById(id.toLowerCase())
    if (!el) continue
    const rect = el.getBoundingClientRect()
    if (rect.top <= 100 && rect.bottom >= 100) {
      activeSection.value = id
      break
    }
  }
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

onMounted(async () => {
  await router.replace({ path: router.currentRoute.value.path })
})
</script>
