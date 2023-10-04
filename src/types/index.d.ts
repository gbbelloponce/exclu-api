import { type HTTPStatusName } from 'elysia/dist/utils'

export type AuthResponse = {
  success: boolean
  data: any
  message: string
}

export type RegisterParams = {
  body: {
    name: string
    username: string
    email: string
    password: string
  }
  set: {
    headers: Record<string, string>
    status?: number | HTTPStatusName
  }
}
