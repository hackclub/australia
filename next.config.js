module.exports = {
  async redirects() {
    return [
      
    ]
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/api/hello'
      },
      {
        source: '/:slug*',
        destination: '/api/hello?path=:slug*'
      },
    ]
  },
}