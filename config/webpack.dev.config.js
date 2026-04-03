const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

const devConfig = {
  mode: 'development',
  entry: path.join(__dirname, '../examples/index.tsx'),
  output: {
    path: path.join(__dirname, '../examples'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, '../examples'),
    compress: true, // 启用gzip压缩
    port: 8080,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }

      devServer.app.use((req, res, next) => {
        if (req.url === '/') {
          req.url = '/dev.html'
        }
        return next()
      })

      return middlewares
    },
  },
}

module.exports = merge(devConfig, baseConfig)
