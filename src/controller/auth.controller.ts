import { UserModel } from '../models/users'
import { BaseController } from './base.controller'
import { LoginBody, RegisterBody } from '../types'
import { hashPassword, md5hash } from '../utils/bcrypt'

export class AuthController extends BaseController {
  public login = async (body: LoginBody) => {
    return this.responseError({
      data: null,
      message: 'Something went wrong!',
    })
  }

  public register = async (body: RegisterBody) => {
    const { name, username, email, password } = body

    // Verify email
    const emailAlreadyExists = !!(await UserModel.getByEmail(email))
    if (emailAlreadyExists) {
      return this.responseError({
        data: null,
        message: 'Email address already in use.',
      })
    }

    // Verify username
    const usernameAlreadyExists = !!(await UserModel.getByUsername(username))
    if (usernameAlreadyExists) {
      return this.responseError({
        data: null,
        message: 'Username already in use.',
      })
    }

    // Hash password
    const { hash, salt } = await hashPassword(password)

    // Generate random profile image
    const emailHash = md5hash(email)
    const profileImage = `https://robohash.org/${emailHash}`

    const user = await UserModel.create({
      name,
      username,
      email,
      password: hash,
      salt,
      profileImage,
    })

    return this.responseOK({
      data: user,
      message: 'Account created successfully!',
    })
  }
}
