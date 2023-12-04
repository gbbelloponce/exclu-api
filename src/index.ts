import { Hono } from 'hono'

import { cors } from '@src/libs/cors'
import { auth } from '@features/auth/auth.routes'
import { posts } from '@features/posts/posts.routes'
import { requireAuthentication } from '@features/auth/auth.middleware'

// Init App
const app = new Hono()

// Config
app.use('*', cors)
app.use('*', requireAuthentication)

// Routes
app.route('/auth', auth)
app.route('/posts', posts)

// Run App
export default {
  fetch: app.fetch,
  port: Bun.env.SERVER_PORT,
}
