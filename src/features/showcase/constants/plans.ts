import { EPlan } from '@/types'
import type { Component } from 'vue'
import { markRaw } from 'vue'
import FreeShowcasePage from '../free/FreeShowcasePage.vue'
import ProShowcasePage from '../pro/ProShowcasePage.vue'
import StandartShowcasePage from '../standart/StandartShowcasePage.vue'

export const plans: Record<EPlan, Component> = {
  [EPlan.standart]: markRaw(StandartShowcasePage),
  [EPlan.premium]: markRaw(ProShowcasePage),
  [EPlan.free]: markRaw(FreeShowcasePage),
}
