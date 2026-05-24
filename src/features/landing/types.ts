export type Product = {
  image: string
  name: string
  ingredients: string
}

export type StripeReturnTo = 'landing' | 'dashboard'

export type Plan = {
  name: string
  price: number
  returnTo?: StripeReturnTo
}
