import { EPlan } from '@/types'
import { markRaw } from 'vue'
import type { Component } from 'vue'
import StandartShowcasePage from '../standart/StandartShowcasePage.vue'
// TODO: Add other plan components when created
// import ProPage from '../pro/ProPage.vue'
// import FreePage from '../free/FreePage.vue'

export const plans: Record<EPlan, Component> = {
  [EPlan.standart]: markRaw(StandartShowcasePage),
  [EPlan.premium]: markRaw(StandartShowcasePage),
  [EPlan.free]: markRaw(StandartShowcasePage), 
}
