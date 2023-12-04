import { verify } from 'hono/jwt'
import { HTTPException } from 'hono/http-exception'

import { CustomMiddleware } from '@common/types'
import { UserModel } from '@features/auth/user.model'
import { isTokenValid, parseToken } from '@features/auth/utils'

export const requireAuthentication: CustomMiddleware = async (c, next) => {
  try {
    // Does not require auth if it is trying to authenticate
    if (/\/auth\/(login|register)/i.test(c.req.url)) return await next()

    // Check if token is provided
    const authToken = c.req.raw.headers.get('Authorization')
    if (!isTokenValid(authToken)) {
      throw 'Unauthorized'
    }

    // Check if token is valid
    const parsedAuthToken = parseToken(authToken!)
    const userId = await verify(parsedAuthToken, Bun.env.JWT_SECRET)

    const user = await UserModel.getById(userId)
    if (!user) {
      throw 'Unauthorized'
    }

    await next()
  } catch {
    throw new HTTPException(401, { message: 'Unauthorized' })
  }
}
