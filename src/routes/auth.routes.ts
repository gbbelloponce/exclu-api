import Elysia, { t } from 'elysia'

import { isAuthenticated } from '../middlewares/auth'
import { AuthController } from '../controllers/auth.controller'

export const auth = (app: Elysia) => {
  // Group everything after 'auth/'
  app.group('auth', (app) => {
    // Login Route
    app.post('login/', AuthController.login, {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
      detail: {
        tags: ['Auth'],
      },
    })

    // Register Route
    app.post('register/', AuthController.register, {
      body: t.Object({
        name: t.String(),
        username: t.String(),
        email: t.String(),
        password: t.String(),
      }),
      detail: {
        tags: ['Auth'],
      },
    })

    return app
  })

  app.use(isAuthenticated)
  app.get('hola/', ({ currentUser }) => {
    console.log(currentUser)
    return 'Authenticated'
  })

  return app
}
