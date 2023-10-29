import { Hono } from 'hono'

import { auth } from './routes/auth.routes'

// Init App
const app = new Hono()

// Config

// Routes
app.route('/auth', auth)

// Run App
export default {
  fetch: app.fetch,
  port: Bun.env.SERVER_PORT,
}
