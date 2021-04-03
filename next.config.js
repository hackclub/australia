module.exports = {
  async redirects() {
    return [
      {
        source: '/:slug/:slug2',
        destination: '/api/hello?path=:slug/:slug2',
        permanent: true,
      },
    ]
  },
}