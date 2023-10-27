import Elysia from 'elysia'

import { IsAuthenticatedParams } from '../types'
import { hasAuthorization, getAuthorizationToken } from '../utils/auth'
import { prisma } from '../libs/prisma'

export const isAuthenticated = (app: Elysia) =>
  app.derive(async (params: IsAuthenticatedParams) => {
    const { request, jwt, set } = params
    const { headers } = request

    // Check if authorization token is provided
    if (!jwt || !hasAuthorization(headers) || !getAuthorizationToken(headers)) {
      set.status = 401
      throw {
        success: false,
        data: null,
        message: 'Unauthorized',
      }
    }

    // Check if authorization token is valid
    const { userId } = await jwt.verify(getAuthorizationToken(headers))
    if (!userId) {
      set.status = 401
      throw {
        success: false,
        data: null,
        message: 'Unauthorized',
      }
    }

    // Get entire user from token's user
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!user) {
      set.status = 401
      throw {
        success: false,
        data: null,
        message: 'Unauthorized',
      }
    }

    return {
      currentUser: user,
    }
  })
