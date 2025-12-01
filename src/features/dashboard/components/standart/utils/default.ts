import type { IDish } from '@/types/menu'

export const defaultDish = (): IDish => ({
  name: '',
  image: '',
  price: undefined,
  description: '',
  category: '',
  id: '',
  isAvailable: 'available',
  ownerId: '',
})
