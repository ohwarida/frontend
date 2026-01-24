export type UserRole = 'ADMIN' | 'BLOCKED' | 'INSTRUCTOR' | 'MEMBER'
export type UserStatus = 'ACTIVE' | 'BLOCKED' | 'EXPIRED'
export type UserRequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED'

export type User = {
  userId: number
  name: string
  email: string
  trackId: number
  trackName: string
  profileImageUrl?: string | null
  role: UserRole
}

export type GetUserResponse = User
