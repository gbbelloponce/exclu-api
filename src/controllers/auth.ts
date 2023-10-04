import { prisma } from '../libs/prisma'
import { AuthResponse, RegisterParams } from '../types'

import { hashPassword, md5hash } from '../utils/bcrypt'

export class AuthController {
  static identify = async () => {}
  static login = async () => {}

  /**
   * Register a user given in params
   */
  static register = async (params: RegisterParams): Promise<AuthResponse> => {
    const { body, set } = params
    const { name, username, email, password } = body

    // Check email availability
    const emailAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    })

    if (emailAlreadyExists) {
      set.status = 400
      return {
        success: false,
        data: null,
        message: 'Email address already in use.',
      }
    }

    // Check username availability
    const usernameAlreadyExists = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    })

    if (usernameAlreadyExists) {
      set.status = 400
      return {
        success: false,
        data: null,
        message: 'Username already in use.',
      }
    }

    // Hash password
    const { hash, salt } = await hashPassword(password)

    // Generate random profile image
    const emailHash = md5hash(email)
    const profileImage = `https://robohash.org/${emailHash}`

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        salt: salt,
        username,
        profileImage,
      },
    })

    return {
      success: true,
      message: 'Account created successfully',
      data: {
        user,
      },
    }
  }
}
