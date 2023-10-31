import { Hono } from 'hono'

import { CreatePostParams, EditPostParams } from '../types'
import { PostsController } from '../controller/posts.controller'

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
