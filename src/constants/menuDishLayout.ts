export const MENU_DISH_LAYOUT_VALUES = ['list', 'grid', 'magazine'] as const

export type MenuDishLayout = (typeof MENU_DISH_LAYOUT_VALUES)[number]

export const DEFAULT_MENU_DISH_LAYOUT: MenuDishLayout = 'grid'

export function isMenuDishLayout(value: unknown): value is MenuDishLayout {
  return typeof value === 'string' && (MENU_DISH_LAYOUT_VALUES as readonly string[]).includes(value)
}

export function parseMenuDishLayout(value: unknown): MenuDishLayout {
  return isMenuDishLayout(value) ? value : DEFAULT_MENU_DISH_LAYOUT
}
