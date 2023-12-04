import { randomBytes, pbkdf2 } from 'node:crypto'

export const hashPassword = async (
  password: string
): Promise<{ hash: string; salt: string }> => {
  const salt = randomBytes(16).toString('hex')
  return new Promise((resolve, reject) => {
    pbkdf2(password, salt, 1000, 64, 'sha512', (error, derivedKey) => {
      if (error) {
        return reject(error)
      }
      return resolve({ hash: derivedKey.toString('hex'), salt })
    })
  })
}

export const comparePassword = async (
  password: string,
  salt: string,
  passwordHash: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    pbkdf2(password, salt, 1000, 64, 'sha512', (error, derivedKey) => {
      if (error) {
        return reject(error)
      }
      return resolve(passwordHash === derivedKey.toString('hex'))
    })
  })
}

export const md5hash = (text: string) => {
  return new Bun.CryptoHasher('md5').update(text).digest('hex')
}

export const isTokenValid = (token: string | null): boolean =>
  !!(token && token.startsWith('Bearer ') && parseToken(token))

export const parseToken = (token: string): string => token.substring(7)
