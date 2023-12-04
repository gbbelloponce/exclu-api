import { Hono } from 'hono'

import { LoginBody, RegisterBody } from '@common/types'
import { AuthController } from '@features/auth/auth.controller'

// Create router and its controller
export const auth = new Hono()
const authController = new AuthController()

// Set routes
auth
  .post('/register', async ({ req, json }) => {
    const body = await req.json<RegisterBody>()
    const { object, status, headers } = await authController.register(body)
    return json(object, status, headers)
  })
  .post('/login', async ({ req, json }) => {
    const body = await req.json<LoginBody>()
    const { object, status, headers } = await authController.login(body)
    return json(object, status, headers)
  })
