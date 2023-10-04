import { Elysia } from 'elysia'

import { docs } from './libs/docs'
import { cors } from './libs/cors'

// Init App
const app = new Elysia()

// Config
app.use(cors)
app.use(docs)

// Routes

// Run App
app.listen(Bun.env.SERVER_PORT || 3000, () => {
  console.log(
    `Server is running at http://${app.server?.hostname}:${app.server?.port}`
  )
})
