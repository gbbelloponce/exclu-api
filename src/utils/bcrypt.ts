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

export const md5hash = (text: string) => {
  return new Bun.CryptoHasher('md5').update(text).digest('hex')
}
