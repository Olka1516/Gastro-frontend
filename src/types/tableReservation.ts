export const TABLE_RESERVATION_API_MESSAGES = [
  'tableReservationNotAvailable',
  'tableReservationInvalidSlot',
  'tableReservationRateLimit',
  'invalidCredentials',
] as const

export type TableReservationApiMessage = (typeof TABLE_RESERVATION_API_MESSAGES)[number]

export interface ICreateTableReservationPayload {
  visitDate: string
  visitTime: string
  partySize: number
  firstName: string
  lastName: string
  phone: string
  email: string
  comment?: string
}

export const TABLE_RESERVATION_STATUSES = [
  'pending',
  'confirmed',
  'declined',
  'rescheduled',
] as const

export type TableReservationStatus = (typeof TABLE_RESERVATION_STATUSES)[number]

export type TableReservationStatusFilter = TableReservationStatus | 'all'

export interface ITableReservation {
  id: string
  createdAt: string
  status: TableReservationStatus
  visitDate: string
  visitTime: string
  partySize: number
  firstName: string
  lastName: string
  phone: string
  email: string
  comment: string
}

export interface IPatchTableReservationBody {
  status: TableReservationStatus
  visitDate?: string
  visitTime?: string
}
