import { Hono } from 'hono'

// Init App
const app = new Hono()

// Config

// Routes
app.get('/', (c) => {
  return c.text('Hello Hono')
})

// Run App
export default {
  fetch: app.fetch,
  port: Bun.env.SERVER_PORT,
}
