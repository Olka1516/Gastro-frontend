<template>
  <div
    ref="rootRef"
    :class="[
      'relative rounded-lg border bg-[#1a191f]/80 transition-[border-color,box-shadow,padding] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
      isPickerOpen && showInlinePicker ? 'border-[#dc5b41]/25 shadow-[0_0_20px_rgba(220,91,65,0.08)]' : 'border-[#2a2930]',
      isDesktop && isClose ? 'p-2' : 'p-3 sm:p-3.5',
    ]">
    <div
      :class="[
        showExpandedContent
          ? 'flex w-full min-w-0 flex-col gap-2 min-[1300px]:flex-row min-[1300px]:items-center min-[1300px]:gap-2.5'
          : 'flex items-center gap-2.5',
        isDesktop && isClose ? 'justify-center' : '',
      ]">
      <div
        :class="[
          'flex min-w-0 items-center gap-2.5 max-[1299px]:w-full min-[1300px]:contents',
          isDesktop && isClose ? 'justify-center' : '',
        ]">
        <div
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#dc5b41]/25 to-[#e66a4f]/15"
          :title="isDesktop && isClose ? currentPlanLabel : undefined">
          <img
            src="@/assets/images/icons/bag.svg"
            alt=""
            class="h-4 w-4"
            style="filter: brightness(0) saturate(100%) invert(54%) sepia(87%) saturate(2067%) hue-rotate(341deg) brightness(98%) contrast(87%)" />
        </div>

        <div v-if="showExpandedContent" class="min-w-0 flex-1">
          <p class="text-[10px] font-medium uppercase tracking-wide text-gray-500">
            {{ t('dashboard.sidebar.currentPlan') }}
          </p>
          <p class="truncate text-sm font-semibold text-white">{{ currentPlanLabel }}</p>
        </div>
      </div>

      <button
        v-if="showExpandedContent"
        ref="toggleButtonRef"
        type="button"
        class="w-full shrink-0 cursor-pointer rounded-md px-2 py-1.5 text-center text-xs font-medium text-[#dc5b41] transition hover:bg-[#dc5b41]/10 max-[1299px]:w-full min-[1300px]:w-auto min-[1300px]:py-1 min-[1300px]:text-left"
        :disabled="isProcessing"
        @click.stop="togglePicker">
        {{ isPickerOpen ? t('dashboard.sidebar.collapsePlans') : t('dashboard.sidebar.changePlan') }}
      </button>

      <button
        v-else-if="isDesktop && isClose"
        type="button"
        class="absolute inset-0 cursor-pointer rounded-lg opacity-0"
        :aria-label="t('dashboard.sidebar.changePlan')"
        :disabled="isProcessing"
        @click="isPickerOpen = !isPickerOpen" />
    </div>

    <div
      v-if="showInlinePicker"
      class="plan-picker-expand grid transition-[grid-template-rows] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)]"
      :class="isPickerOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
      <div class="min-h-0 overflow-hidden">
        <ul
          class="plan-picker-list space-y-1.5 border-t pt-3 transition-[margin,border-color,padding,opacity] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)]"
          :class="
            isPickerOpen
              ? 'mt-3 border-[#2a2930] pt-3 opacity-100'
              : 'mt-0 border-transparent pt-0 opacity-0'
          ">
          <li
            v-for="(plan, index) in landingPlans"
            :key="plan.name"
            class="plan-picker-item transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
            :class="isPickerOpen ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'"
            :style="isPickerOpen ? { transitionDelay: `${80 + index * 45}ms` } : { transitionDelay: '0ms' }">
            <button
              type="button"
              :disabled="isProcessing || plan.name === currentPlan"
              :class="[
                'flex w-full cursor-pointer flex-col gap-0.5 rounded-lg px-3 py-2 text-left transition-colors duration-200',
                plan.name === currentPlan
                  ? 'cursor-default border border-[#dc5b41]/40 bg-[#dc5b41]/10'
                  : 'border border-transparent hover:border-[#dc5b41]/30 hover:bg-[#2a2930]',
                isProcessing ? 'pointer-events-none opacity-60' : '',
              ]"
              @click="handleSelect(plan)">
              <span class="flex items-center justify-between gap-2">
                <span class="text-sm font-medium text-white">{{ t(`plans.${plan.name}.name`) }}</span>
                <span
                  v-if="plan.name === currentPlan"
                  class="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-[#dc5b41]">
                  {{ t('dashboard.sidebar.current') }}
                </span>
                <span
                  v-else-if="!plan.price"
                  class="shrink-0 text-xs text-gray-400">
                  {{ t('dashboard.sidebar.freePrice') }}
                </span>
                <span v-else class="shrink-0 text-xs text-gray-400">
                  {{ plan.currency }}{{ plan.price }} / {{ t(`subscribe.${plan.subscribe}`) }}
                </span>
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="plan-picker-modal">
        <div
          v-if="showCollapsedModal"
          class="fixed inset-0 z-[1002] flex items-end justify-center p-4 sm:items-center">
          <div
            class="plan-picker-modal-backdrop absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            aria-hidden="true"
            @click="closePicker" />
          <div
            ref="collapsedPickerRef"
            :class="[MODAL_SURFACE_CLASS, 'plan-picker-modal-panel relative w-full max-w-sm rounded-lg p-4 shadow-2xl']"
            role="dialog"
            :aria-label="t('dashboard.sidebar.changePlan')">
            <p class="mb-3 text-sm font-semibold text-white">{{ t('dashboard.sidebar.changePlan') }}</p>
            <ul class="space-y-1.5">
              <li
                v-for="(plan, index) in landingPlans"
                :key="plan.name"
                class="plan-picker-modal-item"
                :style="{ '--item-index': index }">
                <button
                  type="button"
                  :disabled="isProcessing || plan.name === currentPlan"
                  :class="[
                    'flex w-full cursor-pointer flex-col rounded-lg px-3 py-2.5 text-left transition-colors duration-200',
                    plan.name === currentPlan
                      ? 'border border-[#dc5b41]/40 bg-[#dc5b41]/10'
                      : 'hover:bg-[#2a2930]',
                  ]"
                  @click="handleSelect(plan)">
                  <span class="text-sm font-medium text-white">{{ t(`plans.${plan.name}.name`) }}</span>
                  <span class="text-xs text-gray-400">
                    <template v-if="plan.name === currentPlan">{{ t('dashboard.sidebar.current') }}</template>
                    <template v-else-if="!plan.price">{{ t('dashboard.sidebar.freePrice') }}</template>
                    <template v-else>
                      {{ plan.currency }}{{ plan.price }} / {{ t(`subscribe.${plan.subscribe}`) }}
                    </template>
                  </span>
                </button>
              </li>
            </ul>
            <button
              type="button"
              class="mt-3 w-full cursor-pointer rounded-lg border border-[#2a2930] py-2 text-sm text-gray-400 transition-colors duration-200 hover:text-white"
              @click.stop="closePicker">
              {{ t('dashboard.sidebar.collapsePlans') }}
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>

    <BaseDelete
      v-model:openDelete="openDelete"
      text="landing.changePlan"
      @handleProcess="confirmFreePlan" />
  </div>
</template>

<script setup lang="ts">
import BaseDelete from '@/components/modals/BaseDelete.vue'
import { MODAL_SURFACE_CLASS } from '@/constants/modalSurface'
import { onClickOutside } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDashboardPlanChange } from '../../composables/useDashboardPlanChange'

const props = defineProps<{
  showExpandedContent: boolean
  isDesktop: boolean
  isClose: boolean
}>()

const { t } = useI18n()
const { landingPlans, currentPlan, openDelete, isProcessing, selectPlan, confirmFreePlan } =
  useDashboardPlanChange()

const rootRef = ref<HTMLElement | null>(null)
const collapsedPickerRef = ref<HTMLElement | null>(null)
const toggleButtonRef = ref<HTMLElement | null>(null)
const isPickerOpen = ref(false)

const showInlinePicker = computed(
  () => props.showExpandedContent || !(props.isDesktop && props.isClose),
)

const showCollapsedModal = computed(
  () => props.isDesktop && props.isClose && isPickerOpen.value,
)

const currentPlanLabel = computed(() => t(`plans.${currentPlan.value}.name`))

const closePicker = () => {
  isPickerOpen.value = false
}

const togglePicker = () => {
  if (isPickerOpen.value) {
    closePicker()
  } else {
    isPickerOpen.value = true
  }
}

onClickOutside(rootRef, () => {
  if (isPickerOpen.value) closePicker()
}, { ignore: [toggleButtonRef, collapsedPickerRef] })

watch(openDelete, (isOpen) => {
  if (isOpen) closePicker()
})

const handleSelect = async (plan: (typeof landingPlans)[number]) => {
  await selectPlan(plan)
  closePicker()
}
</script>

<style scoped>
.plan-picker-modal-enter-active,
.plan-picker-modal-leave-active {
  transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.plan-picker-modal-enter-active .plan-picker-modal-backdrop,
.plan-picker-modal-leave-active .plan-picker-modal-backdrop {
  transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.plan-picker-modal-enter-active .plan-picker-modal-panel,
.plan-picker-modal-leave-active .plan-picker-modal-panel {
  transition:
    opacity 0.42s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.48s cubic-bezier(0.22, 1, 0.36, 1);
}

.plan-picker-modal-enter-active .plan-picker-modal-item,
.plan-picker-modal-leave-active .plan-picker-modal-item {
  transition:
    opacity 0.38s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.42s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(90ms + var(--item-index, 0) * 50ms);
}

.plan-picker-modal-enter-from,
.plan-picker-modal-leave-to {
  opacity: 1;
}

.plan-picker-modal-enter-from .plan-picker-modal-backdrop,
.plan-picker-modal-leave-to .plan-picker-modal-backdrop {
  opacity: 0;
}

.plan-picker-modal-enter-from .plan-picker-modal-panel,
.plan-picker-modal-leave-to .plan-picker-modal-panel {
  opacity: 0;
  transform: translateY(1.25rem) scale(0.96);
}

.plan-picker-modal-enter-from .plan-picker-modal-item,
.plan-picker-modal-leave-to .plan-picker-modal-item {
  opacity: 0;
  transform: translateY(0.5rem);
}

.plan-picker-modal-enter-to .plan-picker-modal-backdrop,
.plan-picker-modal-leave-from .plan-picker-modal-backdrop {
  opacity: 1;
}

.plan-picker-modal-enter-to .plan-picker-modal-panel,
.plan-picker-modal-leave-from .plan-picker-modal-panel {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.plan-picker-modal-enter-to .plan-picker-modal-item,
.plan-picker-modal-leave-from .plan-picker-modal-item {
  opacity: 1;
  transform: translateY(0);
}

.plan-picker-modal-leave-active .plan-picker-modal-item {
  transition-delay: 0ms;
}

@media (prefers-reduced-motion: reduce) {
  .plan-picker-expand,
  .plan-picker-list,
  .plan-picker-item,
  .plan-picker-modal-enter-active,
  .plan-picker-modal-leave-active,
  .plan-picker-modal-enter-active .plan-picker-modal-backdrop,
  .plan-picker-modal-leave-active .plan-picker-modal-backdrop,
  .plan-picker-modal-enter-active .plan-picker-modal-panel,
  .plan-picker-modal-leave-active .plan-picker-modal-panel,
  .plan-picker-modal-enter-active .plan-picker-modal-item,
  .plan-picker-modal-leave-active .plan-picker-modal-item {
    transition: none !important;
  }

  .plan-picker-item,
  .plan-picker-modal-enter-from .plan-picker-modal-panel,
  .plan-picker-modal-leave-to .plan-picker-modal-panel,
  .plan-picker-modal-enter-from .plan-picker-modal-item,
  .plan-picker-modal-leave-to .plan-picker-modal-item {
    transform: none !important;
  }
}
</style>
