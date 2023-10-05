import { prisma } from '../libs/prisma'
import { AuthResponse, LoginParams, RegisterParams } from '../types'
import { hashPassword, comparePassword, md5hash } from '../utils/bcrypt'

export class AuthController {
  /**
   * Log In an user given in params by returning an access token
   */
  static login = async (params: LoginParams): Promise<AuthResponse> => {
    const { body, set, jwt } = params
    const { username, password } = body

    // Check if username exists
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        password: true,
        salt: true,
      },
    })

    if (!user) {
      set.status = 400
      return {
        success: false,
        data: null,
        message: 'Username does not exists.',
      }
    }

    // Check if password match
    const match = await comparePassword(password, user.salt, user.password)
    if (!match) {
      set.status = 400
      return {
        success: false,
        data: null,
        message: 'Invalid credentials',
      }
    }

    // Create JWT and return it via headers
    const accessToken = await jwt!.sign({
      userId: user.id,
    })
    set.headers = {
      Authorization: accessToken,
    }

    return {
      success: true,
      data: null,
      message: 'Logged In successfully.',
    }
  }

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
