import { prisma } from '../libs/prisma'
import { CreateUserParams } from '../types'

export class UserModel {
  static getAll = async () => {}

  static getById = async (id: string) => {}

  static getByUsername = async (username: string) => {
    return await prisma.user.findUnique({
      where: {
        username,
      },
    })
  }

  static getByEmail = async (email: string) => {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  static create = async ({
    name,
    username,
    email,
    password,
    salt,
    profileImage,
  }: CreateUserParams) => {
    return await prisma.user.create({
      data: {
        name,
        username,
        email,
        password,
        salt,
        profileImage,
      },
    })
  }
}
