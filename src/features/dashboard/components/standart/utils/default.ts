import type { IDish, ICategory } from '@/types/menu'

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

export const defaultCategory = (): ICategory => ({
  name: '',
  description: '',
  id: '',
  ownerId: '',
})
