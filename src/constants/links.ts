export const ENDPOINTS = {
  STRIPE_CHECKOUT: '/stripe/getCheckoutId',
  LOGIN: '/users/login',
  REGISTRATION: '/users/register',
  CHECK_AUTH: '/users/check',
  PUT_FREE_PLAN: `users/put-free-plan`,
  GET_USER_DETAILS: `dashboard/get-details`,
  GET_USER_DISHES: `dashboard/dishes`,
  ADD_DISH: `dashboard/dishes`,
  DELETE_DISH: (id: string) => `dashboard/dishes/${id}`,
  EDIT_DISH: (id: string) => `dashboard/dishes/${id}`,
}

export const LINK_TEMPLATES = {
  DASHBOARD: '/dashboard',
}
