export type ShowcaseCartLineStatus = 'in_cart' | 'ordered'

export interface IShowcaseCartDishSnapshot {
  id: string
  name: string
  description: string
  price: number
  category: string
  categoryName: string
  image: string
}

export interface IShowcaseCartLine {
  lineId: string
  dishId: string
  quantity: number
  status: ShowcaseCartLineStatus
  addedAt: string
  dish: IShowcaseCartDishSnapshot
}
