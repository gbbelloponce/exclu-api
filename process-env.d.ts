declare module 'bun' {
  interface Env {
    [key: string]: string | undefined
    // Env variables
    NODE_ENV: string
    SERVER_PORT: number
    CLIENT_URL: string
    JWT_SECRET: string
  }
}
