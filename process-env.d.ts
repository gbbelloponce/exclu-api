declare module 'bun' {
  interface Env {
    [key: string]: string | undefined
    // Add enviroment variables
    NODE_ENV: string
    SERVER_PORT: number
  }
}
