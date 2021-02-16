const NextWorkboxPlugin = require('next-workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const path = require('path')

const development = process.env.NODE_ENV === 'development'
console.log('ENVIRONMENT USAGE = ', process.env.NODE_ENV)

require('dotenv')
  .config({
    path: development ? '.env' : `.env.${(process.env.NODE_ENV || '').toLocaleLowerCase()}`
  })

module.exports = {
  poweredByHeader: false,
  distDir: '../dist',
  env: {
    PORT_HTTPS: process.env.PORT_HTTPS || '7001',
    PORT_HTTP: process.env.PORT_HTTP || '7000',
    API_PROTOCOL: process.env.API_PROTOCOL || 'http',
    API_HOST: process.env.API_HOST || 'localhost',
    API_PORT: process.env.API_PORT || '7000',
    API_VERSION: process.env.API_VERSION || 'v1/',
    ID_GOOGLE: process.env.ID_GOOGLE || '',
    ID_FACEBOOK: process.env.ID_FACEBOOK || '',

    API_IMAGE_PROTOCOL: process.env.API_IMAGE_PROTOCOL || 'http',
    API_IMAGE: process.env.API_IMAGE || 'localhost',
    API_IMAGE_PORT: process.env.API_IMAGE_PORT || '4000',
    API_IMAGE_VERSION: process.env.API_IMAGE_VERSION || '',

    MAP_TOKEN: process.env.MAP_TOKEN || ''
  },
  webpack (config, {
    isServer, buildId, dev
  }) {
    const workboxOptions = {
      clientsClaim: true,
      skipWaiting: true,
      globPatterns: ['.next/static/*', '.next/static/commons/*'],
      modifyUrlPrefix: {
        '.next': '/_next'
      },
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst',
          options: {
            cacheName: 'html-cache'
          }
        },
        {
          urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'image-cache',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }

    config.node = {
      fs: 'empty'
    }

    if (!isServer && !dev) {
      config.plugins.push(
        new NextWorkboxPlugin({
          buildId,
          ...workboxOptions
        }),
        new WebpackPwaManifest({
          filename: '/static/manifest.json',
          name: 'FCM',
          short_name: 'FCM',
          lang: 'id-ID',
          description: 'FCM - platform public food court management',
          display: 'standalone',
          orientation: 'portrait',
          fingerprints: false,
          start_url: '/',
          background_color: '#fafafa',
          theme_color: '#FB770D',
          inject: true,
          icons: [
            {
              // src: path.resolve('static/favicon/ms-icon-310x310.png'),
              src: path.resolve('src/static/logo512.png'),
              sizes: [72, 96, 120, 128, 144, 152, 167, 180, 192, 384, 512]
            },
            {
              // src: path.resolve('static/favicon/ms-icon-310x310.png'),
              src: path.resolve('src/static/logo192.png'),
              sizes: [120, 152, 167, 180],
              ios: true
            }
          ],
          ios: {
            'apple-mobile-web-app-title': 'FCM',
            'apple-mobile-web-app-status-bar-style': '#FB770D'
          },
          includeDirectory: true,
          publicPath: '..'
        })
      )
    }

    return config
  }
}
