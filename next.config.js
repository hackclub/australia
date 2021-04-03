module.exports = {
  async redirects() {
    return [
      {
        source: '/:slug',
        destination: '/api/hello?path=:slug',
        permanent: true,
      },
    ]
  },
}