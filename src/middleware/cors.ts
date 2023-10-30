import { cors as corsMiddleware } from 'hono/cors'

export const cors = corsMiddleware({
  origin: Bun.env.CLIENT_URL,
})
