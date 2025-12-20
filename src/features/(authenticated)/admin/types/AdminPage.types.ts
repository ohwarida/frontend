export type UserRole = 'ADMIN' | 'BLOCKED' | 'INSTRUCTOR' | 'MEMBER'
export type UserStatus = 'ACTIVE' | 'BLOCKED' | 'EXPIRED'
export type UserRequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED'

export type UserRow = {
  userId: number
  name: string
  email: string | null
  phoneNumber: string
  trackId: number
  role: UserRole
  status: UserStatus
  provider: string
  requestStatus: UserRequestStatus
  createdAt: string
}

export type SortInfo = {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export type Pageable = {
  pageNumber: number
  pageSize: number
  sort: SortInfo
  offset: number
  paged: boolean
  unpaged: boolean
}

export type PageResponse<T> = {
  content: T[]
  pageable: Pageable
  last: boolean
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: SortInfo
  numberOfElements: number
  first: boolean
  empty: boolean
}
