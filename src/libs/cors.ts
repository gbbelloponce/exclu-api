import corsPlugin from '@elysiajs/cors'

export const cors = corsPlugin({
  origin: Bun.env.CLIENT_URL,
})
