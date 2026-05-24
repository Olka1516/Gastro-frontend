<template>
  <component :is="tag" :type="isNativeButton ? type : undefined" :href="href" :to="to" :class="buttonClasses"
    v-bind="attrsWithoutClass">
    <img v-if="icon" :src="icon" :alt="iconAlt" :class="iconClasses" aria-hidden="true" />
    <span v-if="text || $slots.default" class="inline-flex items-center leading-none">
      <slot>{{ text }}</slot>
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

type ButtonVariant = 'default' | 'pill' | 'showcase' | 'gradient' | 'outline'
type ButtonSize = 'default' | 'compact' | 'large'
type ButtonLayout = 'inline' | 'plan-card'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    text?: string
    icon?: string
    iconAlt?: string
    href?: string
    to?: RouteLocationRaw
    variant?: ButtonVariant
    size?: ButtonSize
    block?: boolean
    scaleOnHover?: boolean
    pressable?: boolean
    layout?: ButtonLayout
    active?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    iconAlt: '',
    variant: 'default',
    size: 'default',
    block: false,
    scaleOnHover: true,
    pressable: false,
    layout: 'inline',
    active: false,
    type: 'button',
  },
)

const attrs = useAttrs()

const tag = computed(() => {
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return 'button'
})

const isNativeButton = computed(() => tag.value === 'button')

const isGradient = computed(() => props.variant === 'gradient')
const isOutline = computed(() => props.variant === 'outline')

const surfaceClasses = computed(() => {
  switch (props.variant) {
    case 'gradient':
      return 'bg-gradient-to-r from-[#dc5b41] to-[#e66a4f] font-semibold transition-all duration-300'
    case 'outline':
      return 'border-2 border-[#dc5b41] bg-transparent font-semibold transition-all duration-300 hover:bg-[#dc5b41]/10'
    case 'pill':
    case 'showcase':
      return 'font-semibold'
    default:
      return 'bg-[#dc5b41] font-semibold'
  }
})

const variantClasses = computed<Record<ButtonVariant, string>>(() => {
  const showcaseHover =
    props.scaleOnHover &&
    props.variant === 'showcase' &&
    (props.size === 'large' ? 'transition-transform hover:scale-[1.01]' : 'transition-transform hover:scale-[1.02]')

  const gradientHover = isGradient.value && props.scaleOnHover && 'hover:scale-105'
  const defaultHover =
    props.variant === 'default' &&
    props.scaleOnHover &&
    'transition-transform duration-300 hover:scale-105'

  const opacityHover =
    props.variant === 'default' &&
    !props.scaleOnHover &&
    'transition-opacity hover:opacity-90'

  return {
    default: ['rounded-lg px-8 text-sm', defaultHover, opacityHover].filter(Boolean).join(' '),
    pill: 'rounded-3xl px-12 text-xs',
    showcase: ['rounded-xl text-sm font-semibold', showcaseHover].filter(Boolean).join(' '),
    gradient: ['rounded-lg text-sm sm:gap-3', gradientHover].filter(Boolean).join(' '),
    outline: ['rounded-lg text-sm sm:gap-3'].join(' '),
  }
})

const showcasePaddingClass = computed(() => {
  if (props.variant !== 'showcase') return ''
  if (props.block && props.size === 'default') return 'px-4'
  return 'px-6'
})

const gradientPaddingClass = computed(() => {
  if (!isGradient.value && !isOutline.value) return ''

  if (props.size === 'large') {
    return 'min-h-12 px-6 py-3 sm:px-8 sm:py-4'
  }

  if (isOutline.value) {
    return props.size === 'compact' ? 'px-4' : 'px-5 py-3.5 sm:px-6 sm:py-4'
  }

  if (props.block) return 'min-h-11 px-6'
  return 'min-h-11 px-5 sm:px-6'
})

const sizeClass = computed(() => {
  if (props.variant === 'pill') return ''

  if (isGradient.value || isOutline.value) {
    if (props.size === 'large') return ''
    if (props.size === 'compact') return 'h-9 min-h-9'
    return isOutline.value ? 'h-11 min-h-11' : ''
  }

  if (props.variant === 'showcase') {
    const showcaseSizes: Record<ButtonSize, string> = {
      default: 'h-11 min-h-11',
      compact: 'h-9 min-h-9',
      large: 'h-12 min-h-12',
    }
    return showcaseSizes[props.size]
  }

  const defaultSizes: Record<ButtonSize, string> = {
    default: 'h-10 min-h-10',
    compact: 'h-9 min-h-9 px-4 text-xs',
    large: 'h-12 min-h-12',
  }
  return defaultSizes[props.size]
})

const planCardLayoutClasses = computed(() => {
  if (props.layout !== 'plan-card') return ''

  return [
    'mt-2 w-full transition duration-300 ease-in sm:mt-auto sm:w-auto lg:opacity-0 lg:translate-y-5',
    props.active
      ? 'lg:translate-y-2 lg:opacity-100'
      : 'max-lg:translate-y-0 max-lg:opacity-100',
  ]
})

const iconClasses = computed(() => [
  'block shrink-0 object-contain',
  isGradient.value || isOutline.value ? 'h-5 w-5 sm:h-6 sm:w-6' : 'h-4 w-4',
])

const buttonClasses = computed(() => [
  'inline-flex items-center justify-center gap-2 cursor-pointer text-white leading-none antialiased',
  'disabled:pointer-events-none disabled:opacity-60',
  surfaceClasses.value,
  variantClasses.value[props.variant],
  sizeClass.value,
  props.block && 'w-full',
  props.variant === 'pill' && 'h-7 min-h-7',
  showcasePaddingClass.value,
  gradientPaddingClass.value,
  props.pressable && 'active:scale-[0.98]',
  planCardLayoutClasses.value,
  attrs.class,
])

const attrsWithoutClass = computed(() => {
  const rest = { ...attrs }
  delete rest.class
  return rest
})
</script>
