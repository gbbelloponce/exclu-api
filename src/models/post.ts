import { prisma } from '../libs/prisma'
import { CreatePostParams, EditPostParams } from '../types'

export class PostModel {
  static getAll = async () => {
    return await prisma.post.findMany()
  }

  static getById = async (id: string) => {
    return await prisma.post.findUnique({
      where: {
        id,
      },
    })
  }

  static create = async ({ text, userId }: CreatePostParams) => {
    return await prisma.post.create({
      data: {
        text,
        userId,
      },
    })
  }

  static update = async ({ id, text }: EditPostParams) => {
    return await prisma.post.update({
      where: {
        id,
      },
      data: {
        text,
        edited: true,
      },
    })
  }
}
