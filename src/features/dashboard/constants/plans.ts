import { EPlan } from '@/types'
import StandartPage from '../components/standart/StandartPage.vue'
import ProPage from '../components/pro/ProPage.vue'
import type { Component } from 'vue'
import FreePage from '../components/free/FreePage.vue'

export const plans: Record<EPlan, Component> = {
  [EPlan.standart]: StandartPage,
  [EPlan.premium]: ProPage,
  [EPlan.free]: FreePage,
}
