import { User } from '@prisma/client'

export type IResponse = {
  data: any
  message: string
  status?: number
  headers?: Record<string, string | string[]>
}

export type CreateUserParams = Omit<User, 'id' | 'createdAt'>

export type RegisterBody = Pick<
  User,
  'name' | 'username' | 'email' | 'password'
>

export type LoginBody = Pick<User, 'username' | 'password'>
