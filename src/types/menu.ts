export interface IDishTranslation {
  name: string
  description?: string
}

export interface IDish {
  id: string
  name: string
  description: string
  price?: number
  category: string
  isAvailable: 'available' | 'unavailable'
  image: string | File
  ownerId?: string
  translations?: Partial<Record<string, IDishTranslation>>
}

export interface ICategoryTranslation {
  name: string
  description?: string
}

export interface ICategory {
  id: string
  name: string
  description?: string
  ownerId?: string
  translations?: Partial<Record<string, ICategoryTranslation>>
}
