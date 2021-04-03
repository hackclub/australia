module.exports = {
  async redirects() {
    return [
      
    ]
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/api/hello',
        permanent: true,
      },
      {
        source: '/:slug*',
        destination: '/?path=:slug*',
        permanent: true,
      },
    ]
  },
}