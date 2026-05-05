/** Позиція в кошику: ще в кошику або вже оформлене замовлення (для відображення / історії) */
export type ShowcaseCartLineStatus = 'in_cart' | 'ordered'

/** Знімок страви для збереження в localStorage (без File у image) */
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
