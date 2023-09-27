import { Elysia } from 'elysia'

const app = new Elysia()

app.get('/', () => 'Hello from Elysia!')

app.listen(Bun.env.SERVER_PORT || 3000, () => {
  console.log(
    `Server is running at http://${app.server?.hostname}:${app.server?.port}`
  )
})
