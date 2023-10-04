import jwtPlugin from '@elysiajs/jwt'

export const jwt = jwtPlugin({
  name: 'jwt',
  secret: Bun.env.JWT_SECRET!,
  exp: '14d',
})
