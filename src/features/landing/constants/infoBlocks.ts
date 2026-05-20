export const INFO_BLOCK_IMAGES: Record<number, string> = {
  1: 'info_delivery.png',
  2: 'info_orders.png',
  3: 'info_menu.png',
}

export const INFO_BLOCK_IMAGE_URLS: Record<1 | 2 | 3, string> = {
  1: new URL('../assets/images/landing/info_delivery.png', import.meta.url).href,
  2: new URL('../assets/images/landing/info_orders.png', import.meta.url).href,
  3: new URL('../assets/images/landing/info_menu.png', import.meta.url).href,
}

export function getInfoBlockImageUrl(index: number): string {
  const key = index as 1 | 2 | 3
  return INFO_BLOCK_IMAGE_URLS[key] ?? INFO_BLOCK_IMAGE_URLS[1]
}
