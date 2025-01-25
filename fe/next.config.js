const { withNextVideo } = require('next-video/process')

module.exports = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com'
        },
        {
          protocol: 'https',
          hostname: 'mvp-bkt.bj.bcebos.com'
        }
      ]
    },
  };
