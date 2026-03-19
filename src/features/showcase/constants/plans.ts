import { EPlan } from '@/types'
import { markRaw } from 'vue'
import type { Component } from 'vue'
import StandartShowcasePage from '../standart/StandartShowcasePage.vue'
import FreeShowcasePage from '../free/FreeShowcasePage.vue'
// TODO: Add other plan components when created
// import ProPage from '../pro/ProPage.vue'

export const plans: Record<EPlan, Component> = {
  [EPlan.standart]: markRaw(StandartShowcasePage),
  [EPlan.premium]: markRaw(StandartShowcasePage),
  [EPlan.free]: markRaw(FreeShowcasePage),
}
