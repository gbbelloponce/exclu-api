import { Context, Next } from 'hono'
import { Post, User } from '@prisma/client'

export type ResponseFunction = ({}: {
  data: any
  message?: string
  status?: number
  headers?: Record<string, string | string[]>
}) => HonoResponse

export type HonoResponse = {
  status?: number
  headers?: Record<string, string | string[]>
  object: {
    data: any
    message?: string
  }
}

export type CreateUserParams = Omit<User, 'id' | 'createdAt'>

export type EditUserParams = Partial<Omit<User, 'createdAt'>>

export type CreatePostParams = Omit<Post, 'id' | 'createdAt' | 'edited'>

export type EditPostParams = Partial<
  Omit<Post, 'createdAt' | 'edited' | 'userId'>
>

export type DeletePostParams = {
  id: string
}

export type RegisterBody = Pick<
  User,
  'name' | 'username' | 'email' | 'password'
>

export type LoginBody = Pick<User, 'username' | 'password'>

export type CustomMiddleware = (c: Context, next: Next) => Promise<void>
