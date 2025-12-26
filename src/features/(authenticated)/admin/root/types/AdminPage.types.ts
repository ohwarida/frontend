export type UserRole = 'ADMIN' | 'BLOCKED' | 'INSTRUCTOR' | 'MEMBER'
export type UserStatus = 'ACTIVE' | 'BLOCKED' | 'EXPIRED'
export type UserRequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED'
export type RequestStatus = UserRequestStatus | Lowercase<UserRequestStatus>

export type UserRow = {
  userId: number
  name: string
  email: string | null
  phoneNumber: string
  trackId: number
  role: UserRole
  status: UserStatus
  provider: string
  requestStatus: RequestStatus
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
  pageInfo: PaginationTypes
}
