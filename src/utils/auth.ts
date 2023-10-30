export const isTokenValid = (token: string | null): boolean =>
  !!(token && token.startsWith('Bearer ') && parseToken(token))

export const parseToken = (token: string): string => token.substring(7)
