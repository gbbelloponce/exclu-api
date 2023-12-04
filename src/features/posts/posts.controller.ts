import {
  EditPostParams,
  DeletePostParams,
  CreatePostParams,
} from '@common/types'
import { PostModel } from '@features/posts/post.model'
import { BaseController } from '@common/controllers/base.controller'

export class PostsController extends BaseController {
  public getAll = async () => {
    return this.responseOK({ data: await PostModel.getAll() })
  }

  public create = async (body: CreatePostParams) => {
    const { text, userId } = body

    // Validate body
    if (!userId) {
      return this.responseError({
        data: null,
        message: 'The post must have a user related!',
      })
    }
    if (!text.trim()) {
      return this.responseError({
        data: null,
        message: 'The post must have a text!',
      })
    }

    // Create
    const post = await PostModel.create({ text, userId })

    return this.responseOK({
      data: post,
      message: 'Post created successfully!',
    })
  }

  public update = async (body: EditPostParams) => {
    const { id, text } = body

    // Validate body
    if (!id) {
      return this.responseError({
        data: null,
        message: 'The post must have an identifier!',
      })
    }
    if (!text || !text.trim()) {
      return this.responseError({
        data: null,
        message: 'The post must have a text!',
      })
    }

    // Update
    const post = await PostModel.update({ id, text })

    return this.responseOK({
      data: post,
      message: 'Post updated successfully!',
    })
  }

  public delete = async (body: DeletePostParams) => {
    const { id } = body

    // Validate body
    if (!id) {
      return this.responseError({
        data: null,
        message: 'The post must have an identifier!',
      })
    }

    // Update
    await PostModel.delete({ id })

    return this.responseOK({
      data: true,
      message: 'Post deleted successfully',
    })
  }
}
