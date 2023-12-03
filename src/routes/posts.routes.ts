import { Hono } from 'hono'

import { PostsController } from '../controller/posts.controller'
import { CreatePostParams, EditPostParams, DeletePostParams } from '../types'

// Create router and its controller
export const posts = new Hono()
const postsController = new PostsController()

// Set routes
posts
  .get('/', async ({ json }) => {
    const { object, status, headers } = await postsController.getAll()
    return json(object, status, headers)
  })
  .post('/', async ({ req, json }) => {
    const body = await req.json<CreatePostParams>()
    const { object, status, headers } = await postsController.create(body)
    return json(object, status, headers)
  })
  .patch('/', async ({ req, json }) => {
    const body = await req.json<EditPostParams>()
    const { object, status, headers } = await postsController.update(body)
    return json(object, status, headers)
  })
  .delete('/', async ({ req, json }) => {
    const body = await req.json<DeletePostParams>()
    const { object, status, headers } = await postsController.delete(body)
    return json(object, status, headers)
  })
