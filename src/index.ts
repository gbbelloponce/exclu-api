import { Hono } from 'hono'

import { cors } from './middleware/cors'
import { auth } from './routes/auth.routes'
import { requireAuthentication } from './middleware/requireAuthentication'

// Init App
const app = new Hono()

// Config
app.use('*', cors)
app.use('*', requireAuthentication)

// Routes
app.route('/auth', auth)

// Run App
export default {
  fetch: app.fetch,
  port: Bun.env.SERVER_PORT,
}
