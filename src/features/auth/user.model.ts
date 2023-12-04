import { prisma } from '@common/lib/prisma'
import { CreateUserParams } from '@common/types'

export class UserModel {
  static getAll = async () => {}

  static getById = async (id: string) => {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

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
