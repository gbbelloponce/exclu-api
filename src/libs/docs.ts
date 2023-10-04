import swagger from '@elysiajs/swagger'

export const docs = swagger({
  path: '/docs',
  documentation: {
    info: {
      title: 'Exclu API Documentation',
      version: '1.0.0',
    },
    tags: [{ name: 'Auth', description: 'Authentication endpoints' }],
  },
  exclude: ['/', '/docs', '/docs/json'],
})
