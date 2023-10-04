import { Elysia } from 'elysia'

import { jwt } from './libs/jwt'
import { docs } from './libs/docs'
import { cors } from './libs/cors'
import { cookies } from './libs/cookies'
import { auth } from './routes/auth.routes'

// Init App
const app = new Elysia()

// Config
app.use(jwt)
app.use(cors)
app.use(cookies)
app.use(docs)

// Routes
app.use(auth)

// Run App
app.listen(Bun.env.SERVER_PORT || 3000, () => {
  console.log(
    `Server is running at http://${app.server?.hostname}:${app.server?.port}`
  )
})
