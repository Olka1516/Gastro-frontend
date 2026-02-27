export interface IDish {
  id: string
  name: string
  description: string
  price?: number
  category: string
  isAvailable: 'available' | 'unavailable'
  image: string | File
  ownerId?: string
}

export interface ICategory {
  id: string
  name: string
  description?: string
  ownerId?: string
}
